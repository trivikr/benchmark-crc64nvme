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
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │  57,897 ± 0.22% │ 55,683 ± 3,734 │  48,235 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │     284 ± 0.37% │        284 ± 7 │     284 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │   5,160 ± 0.14% │     5,205 ± 81 │   5,126 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 1 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │   8,360 ± 0.67% │    7,861 ± 513 │   7,086 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │      35 ± 1.64% │         36 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │     637 ± 0.66% │       652 ± 15 │     630 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 10 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │     761 ± 1.57% │       785 ± 57 │     714 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │       4 ± 0.50% │          4 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │      64 ± 0.52% │         65 ± 1 │      65 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
