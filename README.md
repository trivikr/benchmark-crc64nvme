# benchmark-crc64nvme

Benchmark various CRC64NVME implementations on Node.js

## Pre-requisites

- Install **Node.js** by following these steps:
  1. Install [nvm](https://github.com/nvm-sh/nvm#installation-and-update).
  1. Use node v24.x.x by running `nvm use` or `nvm use 24` in a terminal window.
  1. Verify that node is installed by running `node -v` in a terminal window and confirm that it shows Node.js >=24, such as `v24.11.0`).
  1. Enable corepack by running `corepack enable` in a terminal window.
- Install dependencies by running `pnpm i`.
- Run benchmark with `pnpm benchmark:crc64nvme`.

## Setup

```console
$ node -v
v24.11.1

$ pnpm benchmark:crc64nvme

...

Benchmark:
CrtCrc64Nvme x 958,100 ops/sec ±17.76% (64 runs sampled)
Crc64Nvme x 29,409 ops/sec ±1.82% (85 runs sampled)
Crc64Nvme2 x 244,432 ops/sec ±21.46% (70 runs sampled)
Crc64NvmeWasm x 226,472 ops/sec ±54.37% (27 runs sampled)
Fastest is CrtCrc64Nvme
```
