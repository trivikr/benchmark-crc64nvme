const generateCRC64NVMETable = () => {
  const table = [];

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

    // Split 64-bit value into two 32-bit values
    table[i * 2] = Number((crc >> 32n) & 0xffffffffn); // high 32 bits
    table[i * 2 + 1] = Number(crc & 0xffffffffn); // low 32 bits
  }

  return new Uint32Array(table);
};

export const table = generateCRC64NVMETable();

/**
 * Alternate implementation in JS using int32 pairs.
 */
export class Crc64Nvme2 {
  constructor() {
    this.reset();
  }

  update(data) {
    let crc1 = this.c1;
    let crc2 = this.c2;
    const len = data.length;

    for (let i = 0; i < len; i++) {
      const idx = ((crc2 ^ data[i]) & 255) << 1;

      crc2 = ((crc2 >>> 8) | ((crc1 & 255) << 24)) >>> 0;
      crc1 >>>= 8;

      crc1 ^= table[idx];
      crc2 ^= table[idx + 1];
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
