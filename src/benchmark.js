import { CrtCrc64Nvme } from "@aws-sdk/crc64-nvme-crt";
import benchmark from "benchmark";

import { Crc64Nvme } from "./crc64nvme.js";
import { Crc64Nvme2 } from "./crc64nvme-2.js";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

const suite = new benchmark.Suite();
const testBuffer = generateBuffer(1024);

const crtCrc64NvmeObj = new CrtCrc64Nvme();
const crc64NvmeObj = new Crc64Nvme();
const crc64Nvme2Obj = new Crc64Nvme2();

console.log(`Benchmark:`);
suite
  .add("CrtCrc64Nvme", async () => {
    crtCrc64NvmeObj.update(testBuffer);
    await crtCrc64NvmeObj.digest();
    crtCrc64NvmeObj.reset();
  })
  .add("Crc64Nvme", async () => {
    crc64NvmeObj.update(testBuffer);
    await crc64NvmeObj.digest();
    crc64NvmeObj.reset();
  })
  .add("Crc64Nvme2", async () => {
    crc64Nvme2Obj.update(testBuffer);
    await crc64Nvme2Obj.digest();
    crc64Nvme2Obj.reset();
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", () => {
    console.log("Fastest is " + suite.filter("fastest").map("name"));
  })
  // run sync
  .run({ async: false });
