import { PocketIc } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

/**
 * Backend behavior lane: installs the app's own compiled wasm into the
 * platform's PocketIC replica and calls the real public API. The frontend
 * suite mocks the actor, so this is the only place a stubbed or trapping
 * canister is visible.
 *
 * This is a fresh build (`isNewApp: true`), so there is no previous revision
 * to upgrade from and no `*.upgrade.test.ts` here.
 */

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: _SERVICE;

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor } = await pic.setupCanister<_SERVICE>({ idlFactory, wasm: BACKEND_WASM }));
});

afterAll(async () => {
  // `?.` because `beforeAll` may not have got that far. A failed
  // `PocketIc.create` otherwise stacks "Cannot read properties of undefined"
  // on top of the real error and buries the one line that explains the run.
  await pic?.tearDown();
});

it("initializes access control without trapping", async () => {
  // A Candid `-> ()` reply decodes to `null` under @dfinity/pic, not
  // `undefined`, even though the generated `_SERVICE` types it as undefined.
  await expect(actor._initialize_access_control()).resolves.toBeNull();
});

it("reports the caller's role and admin flag without trapping", async () => {
  await expect(actor.getCallerUserRole()).resolves.toEqual({ guest: null });
  await expect(actor.isCallerAdmin()).resolves.toBe(false);
});

it("exposes a schema string", async () => {
  await expect(actor.schema()).resolves.toEqual(expect.any(String));
});
