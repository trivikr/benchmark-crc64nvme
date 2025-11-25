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
│ CrtCrc64Nvme │  60,482 ± 0.23% │ 57,830 ± 4,735 │  50,583 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │     295 ± 0.21% │        294 ± 3 │     295 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │   2,777 ± 0.13% │     2,793 ± 17 │   2,771 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 1 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │   8,018 ± 0.58% │    7,795 ± 417 │   6,871 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │      36 ± 0.55% │         37 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │     344 ± 0.64% │        352 ± 3 │     343 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 10 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │     769 ± 1.20% │       813 ± 26 │     744 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │       4 ± 0.52% │          4 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │      34 ± 0.25% │         34 ± 0 │      64 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
