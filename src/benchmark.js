import { CrtCrc64Nvme } from "@aws-sdk/crc64-nvme-crt";
import { Bench, hrtimeNow } from "tinybench";
import Table from "cli-table3";

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

const table = new Table({
  head: ["Name", "Average (ops/s)", "Median (ops/s)", "Samples"],
  style: { head: ["bold"] },
});

const formatNumber = (num) => Intl.NumberFormat().format(parseInt(num));

bench.tasks.forEach((task) => {
  table.push([
    task.name,
    {
      hAlign: "right",
      content: `${formatNumber(
        task.result.throughput.mean
      )} \xb1 ${task.result.throughput.rme.toFixed(2)}%`,
    },
    {
      hAlign: "right",
      content: `${formatNumber(task.result.throughput.p50)} \xb1 ${Math.round(
        task.result.throughput.mad
      ).toString()}`,
    },
    {
      hAlign: "right",
      content: formatNumber(task.result.latency.samples.length),
    },
  ]);
});

console.log(bench.name);
console.log(table.toString());

const fastest = bench.tasks.sort(
  (a, b) => b.result?.throughput.mean - a.result?.throughput.mean
)[0];
console.log(`Fastest is ${fastest.name}`);
