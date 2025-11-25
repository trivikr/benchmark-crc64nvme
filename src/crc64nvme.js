const reverseBits64 = (n) => {
  let result = 0n;
  for (let i = 0; i < 64; i++) {
    result = (result << 1n) | (n & 1n);
    n >>= 1n;
  }
  return result;
};

/**
 * Reference: https://github.com/torvalds/linux/blob/master/lib/crc/gen_crc64table.c
 */
const generateCRC64NVMETable = () => {
  const poly = 0xad93d23594c93659n;
  const reflectedPoly = reverseBits64(poly);

  const table = [];

  for (let i = 0; i < 256; i++) {
    let crc = BigInt(i);

    // Process 8 bits
    for (let j = 0; j < 8; j++) {
      if (crc & 1n) {
        crc = (crc >> 1n) ^ reflectedPoly;
      } else {
        crc = crc >> 1n;
      }
    }

    table.push(crc);
  }

  return table;
};

export const CRC64_NVME_REVERSED_TABLE = generateCRC64NVMETable();

/**
 * Code reference: https://github.com/torvalds/linux/blob/master/lib/crc64.c#L73
 */
export class Crc64Nvme {
  checksum = 0xffffffffffffffffn;

  update(data) {
    let crc = this.checksum;

    for (let i = 0; i < data.length; i++) {
      const tableIndex = Number(crc & 0xffn) ^ data[i];
      crc = (crc >> 8n) ^ CRC64_NVME_REVERSED_TABLE[tableIndex];
    }

    this.checksum = crc;
  }

  async digest() {
    const result = new Uint8Array(8);
    new DataView(result.buffer).setBigUint64(
      0,
      this.checksum ^ 0xffffffffffffffffn
    );
    return result;
  }

  reset() {
    this.checksum = 0xffffffffffffffffn;
  }
}
