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
┌──────────────┬─────────────────┬─────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s)  │ Samples │
├──────────────┼─────────────────┼─────────────────┼─────────┤
│ CrtCrc64Nvme │ 249,268 ± 0.03% │ 252,654 ± 5,410 │ 242,035 │
├──────────────┼─────────────────┼─────────────────┼─────────┤
│ Crc64Nvme    │     269 ± 0.64% │         267 ± 8 │     269 │
├──────────────┼─────────────────┼─────────────────┼─────────┤
│ Crc64Nvme2   │   2,764 ± 0.10% │      2,752 ± 33 │   2,763 │
└──────────────┴─────────────────┴─────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 1 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │  41,635 ± 0.03% │   41,811 ± 742 │  41,492 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │      35 ± 0.50% │         35 ± 1 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │     239 ± 6.96% │       131 ± 31 │     185 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 10 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │   4,070 ± 0.13% │     4,103 ± 81 │   4,063 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │       4 ± 1.07% │          4 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │      13 ± 0.36% │         13 ± 0 │      64 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
