import { describe, test } from "node:test";
import assert from "node:assert";

import { CrtCrc64Nvme } from "@aws-sdk/crc64-nvme-crt";
import { Crc64Nvme } from "./crc64nvme.js";
import { Crc64Nvme2 } from "./crc64nvme-2.js";

import { toBase64 } from "@smithy/util-base64";

/**
 * Known test vectors for CRC64-NVME
 * These can be verified against reference implementations
 */
const TEST_VECTORS = [
  {
    input: "",
    expected: "AAAAAAAAAAA=",
    description: "empty string",
  },
  {
    input: "123456789",
    expected: "rosUhgp5mIg=",
    description: 'ASCII "123456789"',
  },
  {
    input: "a",
    expected: "jC+ERbTL/Dw=",
    description: 'single character "a"',
  },
  {
    input: "abc",
    expected: "BeXKuz/B+us=",
    description: 'ASCII "abc"',
  },
  {
    input: "The quick brown fox jumps over the lazy dog",
    expected: "12xUBUlUwUM=",
    description: "pangram",
  },
  {
    input: "\x00",
    expected: "1dpQR+/shyg=",
    description: "single null byte",
  },
  {
    input: "\x00\x00\x00\x00",
    expected: "bbgR5aHaUCQ=",
    description: "four null bytes",
  },
  {
    input: "\xFF\xFF\xFF\xFF",
    expected: "dqAywHboEF0=",
    description: "four 0xFF bytes",
  },
];

for (const Crc64Ctr of [CrtCrc64Nvme, Crc64Nvme, Crc64Nvme2]) {
  describe(Crc64Ctr.name, () => {
    test("known test vectors", async (t) => {
      for (const vector of TEST_VECTORS) {
        await t.test(vector.description, async () => {
          const crc = new Crc64Ctr();
          crc.update(new TextEncoder().encode(vector.input));
          const digest = await crc.digest();
          const hex = toBase64(digest);

          assert.strictEqual(
            hex,
            vector.expected,
            `CRC64 of "${vector.description}" should be ${vector.expected}, got ${hex}`
          );
        });
      }
    });

    test("empty input", async () => {
      const crc = new Crc64Ctr();
      const digest = await crc.digest();

      assert.ok(digest instanceof Uint8Array);
      assert.strictEqual(digest.length, 8);
      assert.strictEqual(toBase64(digest), "AAAAAAAAAAA=");
    });

    test("single byte values", async (t) => {
      const testCases = [
        { byte: 0x00, expected: "1dpQR+/shyg=" },
        { byte: 0x01, expected: "qrSgj9/ZDlE=" },
        { byte: 0xff, expected: "/wAAAAAAAAA=" },
        { byte: 0x41, expected: "fe56MqW3Iz4=" }, // 'A'
        { byte: 0x61, expected: "jC+ERbTL/Dw=" }, // 'a'
      ];

      for (const tc of testCases) {
        await t.test(
          `byte 0x${tc.byte.toString(16).padStart(2, "0")}`,
          async () => {
            const crc = new Crc64Ctr();
            crc.update(new Uint8Array([tc.byte]));
            const digest = await crc.digest();
            const hex = toBase64(digest);

            assert.strictEqual(
              hex,
              tc.expected,
              `CRC64 of byte 0x${tc.byte.toString(16)} should be ${
                tc.expected
              }, got ${hex}`
            );
          }
        );
      }
    });

    test("reset functionality", async () => {
      const crc = new Crc64Ctr();
      const input = new TextEncoder().encode("test data");

      // First calculation
      crc.update(input);
      const digest1 = toBase64(await crc.digest());

      // Reset and calculate again
      crc.reset();
      crc.update(input);
      const digest2 = toBase64(await crc.digest());

      assert.strictEqual(digest1, digest2, "Reset should produce same result");
    });

    test("multiple updates equivalent to single update", async () => {
      const input = new TextEncoder().encode("The quick brown fox");

      // Single update
      const crc1 = new Crc64Ctr();
      crc1.update(input);
      const digest1 = toBase64(await crc1.digest());

      // Multiple updates
      const crc2 = new Crc64Ctr();
      crc2.update(input.slice(0, 5));
      crc2.update(input.slice(5, 10));
      crc2.update(input.slice(10));
      const digest2 = toBase64(await crc2.digest());

      assert.strictEqual(
        digest1,
        digest2,
        "Multiple updates should match single update"
      );
    });

    test("incremental updates", async () => {
      const crc = new Crc64Ctr();
      const textEncoder = new TextEncoder();

      // Build up "123456789" byte by byte
      for (let i = 1; i <= 9; i++) {
        crc.update(textEncoder.encode(i.toString()));
      }

      const digest = toBase64(await crc.digest());
      assert.strictEqual(
        digest,
        "rosUhgp5mIg=",
        "Incremental updates should work"
      );
    });

    test("digest returns Uint8Array of length 8", async () => {
      const crc = new Crc64Ctr();
      const digest = await crc.digest();

      assert.ok(digest instanceof Uint8Array);
      assert.strictEqual(digest.length, 8);
    });

    test("digest does not mutate state", async () => {
      const crc = new Crc64Ctr();
      crc.update(new TextEncoder().encode("test"));

      const digest1 = toBase64(await crc.digest());
      const digest2 = toBase64(await crc.digest());

      assert.strictEqual(
        digest1,
        digest2,
        "Multiple digest calls should return same value"
      );
    });

    test("consistent across multiple instances", async () => {
      const input = new TextEncoder().encode("consistency test");

      const crc1 = new Crc64Ctr();
      crc1.update(input);
      const digest1 = toBase64(await crc1.digest());

      const crc2 = new Crc64Ctr();
      crc2.update(input);
      const digest2 = toBase64(await crc2.digest());

      assert.strictEqual(
        digest1,
        digest2,
        "Different instances should produce same result"
      );
    });

    test("empty updates between data", async () => {
      const crc1 = new Crc64Ctr();
      crc1.update(new TextEncoder().encode("hello"));
      crc1.update(new Uint8Array(0)); // Empty update
      crc1.update(new TextEncoder().encode("world"));
      const digest1 = toBase64(await crc1.digest());

      const crc2 = new Crc64Ctr();
      crc2.update(new TextEncoder().encode("helloworld"));
      const digest2 = toBase64(await crc2.digest());

      assert.strictEqual(
        digest1,
        digest2,
        "Empty updates should not affect result"
      );
    });
  });
}
