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
│ CrtCrc64Nvme  │  58,382 ± 0.25% │ 56,338 ± 4,424 │  47,457 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme     │     287 ± 0.31% │        288 ± 3 │     287 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2    │   4,959 ± 0.14% │    4,989 ± 112 │   4,924 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64NvmeWasm │  17,719 ± 0.05% │   17,804 ± 545 │  17,688 │
└───────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 1 MB:
┌───────────────┬─────────────────┬────────────────┬─────────┐
│ Name          │ Average (ops/s) │ Median (ops/s) │ Samples │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme  │   8,276 ± 0.57% │    8,043 ± 492 │   7,136 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme     │      36 ± 0.18% │         36 ± 0 │      64 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2    │     640 ± 0.32% │        644 ± 4 │     639 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64NvmeWasm │   2,328 ± 0.07% │      2,344 ± 6 │   2,328 │
└───────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 10 MB:
┌───────────────┬─────────────────┬────────────────┬─────────┐
│ Name          │ Average (ops/s) │ Median (ops/s) │ Samples │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme  │     823 ± 2.85% │       750 ± 63 │     727 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme     │       4 ± 0.58% │          4 ± 0 │      64 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2    │      64 ± 0.44% │         65 ± 0 │      65 │
├───────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64NvmeWasm │     232 ± 0.52% │        233 ± 0 │     231 │
└───────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
