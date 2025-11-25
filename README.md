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
│ CrtCrc64Nvme │  91,746 ± 0.16% │ 103,895 ± 3,057 │  81,182 │
├──────────────┼─────────────────┼─────────────────┼─────────┤
│ Crc64Nvme    │     292 ± 0.32% │         290 ± 3 │     292 │
├──────────────┼─────────────────┼─────────────────┼─────────┤
│ Crc64Nvme2   │   2,737 ± 0.26% │      2,776 ± 68 │   2,695 │
└──────────────┴─────────────────┴─────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 1 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │   8,615 ± 0.84% │    7,557 ± 512 │   7,093 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │      35 ± 0.51% │         35 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │     264 ± 5.27% │        337 ± 8 │     212 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 10 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │     779 ± 0.65% │       790 ± 51 │     773 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │       4 ± 0.40% │          4 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │      13 ± 0.38% │         13 ± 0 │      64 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
