import benchmark from "benchmark";
import { toBase64 } from "@smithy/util-base64";
import { CrtCrc64Nvme } from "@aws-sdk/crc64-nvme-crt";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

const suite = new benchmark.Suite();
const testBuffer = generateBuffer(1024);

const awsCrtCrc64NvmeObj = new CrtCrc64Nvme();
awsCrtCrc64NvmeObj.update(testBuffer);

console.log(`CRC32NVME values returned for random buffer:`);
console.log(
  `* @aws-sdk/crc64-nvme-crt: ${toBase64(await awsCrtCrc64NvmeObj.digest())}`
);
awsCrtCrc64NvmeObj.reset();

console.log(`\nBenchmark:`);
suite
  .add("CrtCrc64Nvme", async () => {
    awsCrtCrc64NvmeObj.update(testBuffer);
    await awsCrtCrc64NvmeObj.digest();
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", () => {
    console.log("Fastest is " + suite.filter("fastest").map("name"));
    awsCrtCrc64NvmeObj.reset();
  })
  // run sync
  .run({ async: false });
