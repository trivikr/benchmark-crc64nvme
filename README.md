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

Benchmark:
┌───────────────┬───────────────────┬────────────────────┬─────────┐
│ Name          │ Average (ops/s)   │ Median (ops/s)     │ Samples │
├───────────────┼───────────────────┼────────────────────┼─────────┤
│ CrtCrc64Nvme  │ 1,219,603 ± 0.05% │ 1,333,324 ± 77,119 │ 983,443 │
├───────────────┼───────────────────┼────────────────────┼─────────┤
│ Crc64Nvme     │    36,074 ± 0.09% │       36,980 ± 637 │  34,879 │
├───────────────┼───────────────────┼────────────────────┼─────────┤
│ Crc64Nvme2    │   127,871 ± 0.03% │      130,429 ± 718 │ 126,459 │
├───────────────┼───────────────────┼────────────────────┼─────────┤
│ Crc64NvmeWasm │   923,414 ± 0.02% │   959,685 ± 36,338 │ 885,577 │
└───────────────┴───────────────────┴────────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
