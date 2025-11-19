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
│ CrtCrc64Nvme │ 1,190,621 ± 0.07% │ 1,333,376 ± 79084 │ 911,737 │
├──────────────┼───────────────────┼───────────────────┼─────────┤
│ Crc64Nvme    │    37,083 ± 0.06% │      37,440 ± 177 │  36,143 │
├──────────────┼───────────────────┼───────────────────┼─────────┤
│ Crc64Nvme2   │   124,549 ± 0.03% │    123,076 ± 2464 │ 123,350 │
└──────────────┴───────────────────┴───────────────────┴─────────┘
Fastest is CrtCrc64Nvme
```
