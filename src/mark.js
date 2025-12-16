import { CrtCrc64Nvme } from "@aws-sdk/crc64-nvme-crt";

import { Crc64Nvme } from "./crc64nvme.js";
import { Crc64Nvme2 } from "./crc64nvme-2.js";

const generateBuffer = (size) => {
  const buf = new Uint8Array(size);
  for (let i = 0; i < size; ++i) {
    buf[i] = (Math.random() * 256) | 0;
  }
  return buf;
};

const crtCrc64NvmeObj = () => new CrtCrc64Nvme();
const crc64NvmeObj = () => new Crc64Nvme();
const crc64Nvme2Obj = () => new Crc64Nvme2();

const impls = [crtCrc64NvmeObj, crc64NvmeObj, crc64Nvme2Obj];

let choice = 0;

/**
 * Variable controls
 */
const ctrl = {
  // number of items.
  workload: 2500,
  // size of each item.
  unitSize: 32 * 1024,
  impl: impls[choice],
};

setInterval(async () => {
  const buffers = Array.from({ length: ctrl.workload }).map(() => generateBuffer(ctrl.unitSize));

  // checkpoint A: after buffers generated but before checksums.
  const A = performance.now();
  const promises = [];
  for (let i = 0; i < ctrl.workload; ++i) {
    promises.push(
      Promise.resolve().then(() => {
        const hash = ctrl.impl();
        hash.update(buffers[i]);
        return hash.digest();
      })
    );
  }

  await Promise.all(promises);

  // checkpoint B: checksums completed for all buffers.
  const B = performance.now();

  const size = ((ctrl.workload * ctrl.unitSize) / 1024) | 0;
  const kb_ms = (size / (B - A)).toFixed(2);

  /*

  Example output:

  Time       Total    Checksum Rate Impl Name
  1843.604ms 80,000kb 00043.39kb/ms Crc64Nvme
  0187.762ms 80,000kb 00426.07kb/ms Crc64Nvme2
  0004.788ms 80,000kb 16709.46kb/ms CrtCrc64Nvme

   */
  console.log(
    `${(B - A).toFixed(3)}ms`.padStart(10, "0"),
    size.toLocaleString() + "kb",
    kb_ms.padStart(8, "0") + "kb/ms",
    ctrl.impl().constructor.name
  );

  choice += 1;
  choice %= 3;
  ctrl.impl = impls[choice];
}, 3000);
