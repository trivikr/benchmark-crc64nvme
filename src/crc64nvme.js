/**
 * Reference: https://github.com/torvalds/linux/blob/master/lib/crc/gen_crc64table.c
 */
const generateCRC64NVMETable = () => {
  const table = new Array(256);

  for (let i = 0; i < 256; i++) {
    let crc = BigInt(i);

    // Process 8 bits
    for (let j = 0; j < 8; j++) {
      if (crc & 1n) {
        crc = (crc >> 1n) ^ 0x9a6c9329ac4bc9b5n;
      } else {
        crc = crc >> 1n;
      }
    }

    table[i] = crc;
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
