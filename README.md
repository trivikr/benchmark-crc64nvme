# benchmark-crc64nvme

Benchmark various CRC64NVME implementations on Node.js

## Pre-requisites

- Install **Node.js** by following these steps:
  1. Install [nvm](https://github.com/nvm-sh/nvm#installation-and-update).
  1. Use node v24.x.x by running `nvm use` or `nvm use 24` in a terminal window.
  1. Verify that node is installed by running `node -v` in a terminal window and confirm that it shows Node.js >=24, such as `v24.11.0`).
  1. Enable corepack by running `corepack enable` in a terminal window.
- Install dependencies by running `pnpm i`.
- Run benchmark with `pnpm benchmark`.

## Setup

```console
$ node -v
v24.11.1

$ pnpm benchmark

...

Benchmark for 128 KB:
┌───────────────┬─────────────────┬────────────────┬─────────┐
│ Name          │ Average (ops/s) │ Median (ops/s) │ Samples │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme  │  57,872 ± 0.23% │ 55,944 ± 4,206 │  48,227 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme     │     276 ± 1.23% │        281 ± 6 │     268 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2    │   2,735 ± 0.21% │     2,786 ± 28 │   2,720 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64NvmeWasm │  18,040 ± 0.09% │    18,377 ± 42 │  17,918 │
└───────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 1 MB:
┌───────────────┬─────────────────┬────────────────┬─────────┐
│ Name          │ Average (ops/s) │ Median (ops/s) │ Samples │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme  │   7,850 ± 0.75% │    7,444 ± 554 │   6,559 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme     │      35 ± 0.40% │         35 ± 0 │      64 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2    │     342 ± 0.37% │        344 ± 6 │     342 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64NvmeWasm │   2,261 ± 0.22% │     2,304 ± 45 │   2,254 │
└───────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 10 MB:
┌───────────────┬─────────────────┬────────────────┬─────────┐
│ Name          │ Average (ops/s) │ Median (ops/s) │ Samples │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme  │     800 ± 2.80% │       745 ± 65 │     713 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme     │       3 ± 0.63% │          3 ± 0 │      64 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2    │      34 ± 1.57% │         34 ± 0 │      64 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64NvmeWasm │     227 ± 0.41% │        232 ± 1 │     228 │
└───────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
