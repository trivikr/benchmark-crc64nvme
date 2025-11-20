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
┌──────────────┬───────────────────┬───────────────────┬─────────┐
│ Name         │ Average (ops/s)   │ Median (ops/s)    │ Samples │
├──────────────┼───────────────────┼───────────────────┼─────────┤
│ CrtCrc64Nvme │ 1,113,547 ± 0.07% │ 1,333,324 ± 77119 │ 850,053 │
├──────────────┼───────────────────┼───────────────────┼─────────┤
│ Crc64Nvme    │    37,238 ± 0.04% │      37,499 ± 236 │  36,536 │
├──────────────┼───────────────────┼───────────────────┼─────────┤
│ Crc64Nvme2   │   129,670 ± 0.01% │      130,429 ± 17 │ 129,407 │
└──────────────┴───────────────────┴───────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
