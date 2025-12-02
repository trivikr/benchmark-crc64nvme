const generateCRC64NVMETable = () => {
  const sliceLength = 8;
  const tables = new Array(sliceLength);

  for (let slice = 0; slice < sliceLength; slice++) {
    const table = new Array(512);

    for (let i = 0; i < 256; i++) {
      let crc = BigInt(i);

      for (let j = 0; j < 8 * (slice + 1); j++) {
        if (crc & 1n) {
          crc = (crc >> 1n) ^ 0x9a6c9329ac4bc9b5n;
        } else {
          crc = crc >> 1n;
        }
      }

      // Split 64-bit value into two 32-bit values
      table[i * 2] = Number((crc >> 32n) & 0xffffffffn); // high 32 bits
      table[i * 2 + 1] = Number(crc & 0xffffffffn); // low 32 bits
    }

    tables[slice] = new Uint32Array(table);
  }

  return tables;
};

export const CRC64_NVME_REVERSED_TABLE = generateCRC64NVMETable();

/**
 * Alternate implementation in JS using int32 pairs.
 */
export class Crc64Nvme2 {
  constructor() {
    this.reset();
  }

  update(data) {
    const len = data.length;
    let i = 0;
    let crc1 = this.c1;
    let crc2 = this.c2;

    while (i + 8 <= len) {
      const idx0 = ((crc2 ^ data[i]) & 255) << 1;
      const idx1 = (((crc2 >>> 8) ^ data[i + 1]) & 255) << 1;
      const idx2 = (((crc2 >>> 16) ^ data[i + 2]) & 255) << 1;
      const idx3 = (((crc2 >>> 24) ^ data[i + 3]) & 255) << 1;
      const idx4 = ((crc1 ^ data[i + 4]) & 255) << 1;
      const idx5 = (((crc1 >>> 8) ^ data[i + 5]) & 255) << 1;
      const idx6 = (((crc1 >>> 16) ^ data[i + 6]) & 255) << 1;
      const idx7 = (((crc1 >>> 24) ^ data[i + 7]) & 255) << 1;

      crc1 =
        CRC64_NVME_REVERSED_TABLE[7][idx0] ^
        CRC64_NVME_REVERSED_TABLE[6][idx1] ^
        CRC64_NVME_REVERSED_TABLE[5][idx2] ^
        CRC64_NVME_REVERSED_TABLE[4][idx3] ^
        CRC64_NVME_REVERSED_TABLE[3][idx4] ^
        CRC64_NVME_REVERSED_TABLE[2][idx5] ^
        CRC64_NVME_REVERSED_TABLE[1][idx6] ^
        CRC64_NVME_REVERSED_TABLE[0][idx7];

      crc2 =
        CRC64_NVME_REVERSED_TABLE[7][idx0 + 1] ^
        CRC64_NVME_REVERSED_TABLE[6][idx1 + 1] ^
        CRC64_NVME_REVERSED_TABLE[5][idx2 + 1] ^
        CRC64_NVME_REVERSED_TABLE[4][idx3 + 1] ^
        CRC64_NVME_REVERSED_TABLE[3][idx4 + 1] ^
        CRC64_NVME_REVERSED_TABLE[2][idx5 + 1] ^
        CRC64_NVME_REVERSED_TABLE[1][idx6 + 1] ^
        CRC64_NVME_REVERSED_TABLE[0][idx7 + 1];

      i += 8;
    }

    while (i < len) {
      const idx = ((crc2 ^ data[i]) & 255) << 1;
      crc2 = ((crc2 >>> 8) | ((crc1 & 255) << 24)) >>> 0;
      crc1 >>>= 8;
      crc1 ^= CRC64_NVME_REVERSED_TABLE[0][idx];
      crc2 ^= CRC64_NVME_REVERSED_TABLE[0][idx + 1];
      i++;
    }

    this.c1 = crc1;
    this.c2 = crc2;
  }

  async digest() {
    const c1 = this.c1 ^ 4294967295;
    const c2 = this.c2 ^ 4294967295;

    return new Uint8Array([
      c1 >>> 24,
      (c1 >>> 16) & 255,
      (c1 >>> 8) & 255,
      c1 & 255,
      c2 >>> 24,
      (c2 >>> 16) & 255,
      (c2 >>> 8) & 255,
      c2 & 255,
    ]);
  }

  reset() {
    this.c1 = 4294967295; // int32 max
    this.c2 = 4294967295;
  }
}
