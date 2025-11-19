import { CrtCrc64Nvme } from "@aws-sdk/crc64-nvme-crt";
import { Bench, hrtimeNow } from "tinybench";

import { Crc64Nvme } from "./crc64nvme.js";
import { Crc64Nvme2 } from "./crc64nvme-2.js";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

const bench = new Bench({ name: "Benchmark:", now: hrtimeNow });
const testBuffer = generateBuffer(1024);

const crtCrc64NvmeObj = new CrtCrc64Nvme();
const crc64NvmeObj = new Crc64Nvme();
const crc64Nvme2Obj = new Crc64Nvme2();

bench
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
  });

await bench.run();

const results = bench.tasks.reduce((acc, task) => {
  acc[task.name] = {
    "ops/s average": task.result.throughput.mean.toFixed(2),
    "ops/s median": task.result.throughput.p50.toFixed(2),
  };
  return acc;
}, {});

console.log(bench.name);
console.table(results);
