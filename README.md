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
│ CrtCrc64Nvme │  59,888 ± 0.25% │ 56,870 ± 4,356 │  48,399 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │     291 ± 0.26% │        291 ± 3 │     291 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │   5,257 ± 0.12% │     5,297 ± 45 │   5,220 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 1 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │   8,427 ± 0.63% │    8,015 ± 575 │   7,174 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │      35 ± 0.61% │         35 ± 1 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │     618 ± 0.45% │        623 ± 9 │     616 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 10 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │     863 ± 2.60% │       793 ± 63 │     774 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │       4 ± 0.45% │          4 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │      64 ± 0.53% │         64 ± 1 │      65 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
