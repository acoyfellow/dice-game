import { Gate, Act, Assert } from "gateproof";
import { createHttpObserveResource } from "gateproof";

export async function run() {
  const observe = createHttpObserveResource({
    url: "http://localhost:3000/api/state",
    pollInterval: 500,
  });

  return await Gate.run({
    name: "server-responds",
    observe,
    act: [Act.exec("bun run scripts/state.ts")],
    assert: [Assert.noErrors()],
    stop: { idleMs: 2000, maxMs: 5000 },
  });
}
