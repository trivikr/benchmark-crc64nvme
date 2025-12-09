import { crc64NvmeHasher } from "@aws/aws-wasm-checksums";

export class Crc64NvmeWasm {
  hasher = new crc64NvmeHasher.Hasher();

  constructor() {
    this.reset();
  }

  update(data) {
    this.hasher.update(data);
  }

  async digest() {
    return this.hasher.finalize();
  }

  reset() {
    this.hasher.reset();
  }
}
