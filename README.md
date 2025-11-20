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
┌──────────────┬───────────────────┬────────────────────┬─────────┐
│ Name         │ Average (ops/s)   │ Median (ops/s)     │ Samples │
├──────────────┼───────────────────┼────────────────────┼─────────┤
│ CrtCrc64Nvme │ 1,089,096 ± 0.08% │ 1,264,201 ± 69,123 │ 830,565 │
├──────────────┼───────────────────┼────────────────────┼─────────┤
│ Crc64Nvme    │    37,182 ± 0.04% │       37,442 ± 234 │  36,891 │
├──────────────┼───────────────────┼────────────────────┼─────────┤
│ Crc64Nvme2   │   129,250 ± 0.02% │       130,429 ± 17 │ 128,880 │
└──────────────┴───────────────────┴────────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
