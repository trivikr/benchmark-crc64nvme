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
│ CrtCrc64Nvme │  64,209 ± 0.28% │ 58,534 ± 5,786 │  50,629 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │     276 ± 0.75% │        278 ± 7 │     274 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │   5,108 ± 0.17% │    5,156 ± 141 │   5,064 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 1 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │   8,232 ± 0.71% │    7,759 ± 533 │   6,869 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │      36 ± 0.49% │         36 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │     646 ± 0.41% │       654 ± 13 │     644 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme

Benchmark for 10 MB:
┌──────────────┬─────────────────┬────────────────┬─────────┐
│ Name         │ Average (ops/s) │ Median (ops/s) │ Samples │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ CrtCrc64Nvme │     847 ± 2.60% │       789 ± 49 │     762 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme    │       4 ± 0.29% │          4 ± 0 │      64 │
├──────────────┼─────────────────┼────────────────┼─────────┤
│ Crc64Nvme2   │      63 ± 0.62% │         63 ± 1 │      64 │
└──────────────┴─────────────────┴────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
