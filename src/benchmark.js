import { CrtCrc64Nvme } from "@aws-sdk/crc64-nvme-crt";
import { Bench, hrtimeNow } from "tinybench";
import Table from "cli-table3";

import { Crc64Nvme } from "./crc64nvme.js";
import { Crc64Nvme2 } from "./crc64nvme-2.js";
import { Crc64NvmeWasm } from "./crc64nvme-wasm.js";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

const crtCrc64NvmeObj = new CrtCrc64Nvme();
const crc64NvmeObj = new Crc64Nvme();
const crc64Nvme2Obj = new Crc64Nvme2();
const crc64NvmeWasmObj = new Crc64NvmeWasm();

const FILE_SIZES = [
  128, // 128 KB
  1024, // 1 MB
  10 * 1024, // 10 MB
];

const splitBufferIntoChunksAndUpdate = (data, checksum) => {
  // Define chunk sizes: 8KB, 16KB, 32KB, 64KB, 128KB with 1KB in between
  const chunkSizes = [
    8 * 1024, // 8KB
    1 * 1024, // 1KB
    16 * 1024, // 16KB
    1 * 1024, // 1KB
    32 * 1024, // 32KB
    1 * 1024, // 1KB
    64 * 1024, // 64KB
    1 * 1024, // 1KB
    128 * 1024, // 128KB
  ];

  // Use Uint8Array view to avoid ArrayBuffer copying
  const view = new Uint8Array(data);
  const totalLength = view.length;
  const patternLength = chunkSizes.length;

  let offset = 0;
  let patternIndex = 0;

  while (offset < totalLength) {
    const chunkSize = chunkSizes[patternIndex];
    const actualChunkSize = Math.min(chunkSize, totalLength - offset);

    // subarray() creates a view (no copy), slice() would copy data
    const chunk = view.subarray(offset, offset + actualChunkSize);

    checksum.update(chunk);

    offset += actualChunkSize;

    // Increment pattern index with wraparound
    if (++patternIndex === patternLength) {
      patternIndex = 0;
    }
  }
};

for (const fileSize of FILE_SIZES) {
  const testBuffer = generateBuffer(fileSize * 1024);

  const fileSizeText =
    fileSize < 1024 ? `${fileSize} KB` : `${fileSize / 1024} MB`;
  const bench = new Bench({
    name: `Benchmark for ${fileSizeText}:`,
    now: hrtimeNow,
  });

  bench
    .add("CrtCrc64Nvme", async () => {
      splitBufferIntoChunksAndUpdate(testBuffer, crtCrc64NvmeObj);
      await crtCrc64NvmeObj.digest();
      crtCrc64NvmeObj.reset();
    })
    .add("Crc64Nvme", async () => {
      splitBufferIntoChunksAndUpdate(testBuffer, crc64NvmeObj);
      await crc64NvmeObj.digest();
      crc64NvmeObj.reset();
    })
    .add("Crc64Nvme2", async () => {
      splitBufferIntoChunksAndUpdate(testBuffer, crc64Nvme2Obj);
      await crc64Nvme2Obj.digest();
      crc64Nvme2Obj.reset();
    })
    .add("Crc64NvmeWasm", async () => {
      crc64NvmeWasmObj.update(testBuffer);
      await crc64NvmeWasmObj.digest();
      crc64NvmeWasmObj.reset();
    });

  try {
    await bench.run();

    const table = new Table({
      head: ["Name", "Average (ops/s)", "Median (ops/s)", "Samples"],
      style: { head: ["bold"] },
    });

    const formatNumber = (num) => Intl.NumberFormat().format(Math.round(num));

    bench.tasks.forEach((task) => {
      if (!task.result) return;
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
          content: `${formatNumber(
            task.result.throughput.p50
          )} \xb1 ${formatNumber(Math.round(task.result.throughput.mad))}`,
        },
        {
          hAlign: "right",
          content: formatNumber(task.result.latency.samplesCount),
        },
      ]);
    });

    console.log(bench.name);
    console.log(table.toString());

    const fastest = [...bench.tasks]
      .filter((task) => task.result?.throughput?.mean)
      .sort((a, b) => b.result.throughput.mean - a.result.throughput.mean)[0];

    if (fastest) {
      console.log(`Fastest is ${fastest.name}\n`);
    }
  } catch (error) {
    console.error(`Benchmark failed for ${fileSizeText}:`, error);
    process.exit(1);
  }
}
