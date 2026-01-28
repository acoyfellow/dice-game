import { Gate, Act, Assert } from "gateproof";
import { createHttpObserveResource } from "gateproof";

export async function run() {
  const observe = createHttpObserveResource({
    url: "http://localhost:3000/api/state",
    pollInterval: 500,
  });

  return await Gate.run({
    name: "state-persists",
    observe,
    act: [
      Act.exec("bun run scripts/bet.ts"),
      Act.wait(500),
      Act.exec("bun run scripts/bet.ts"),
      Act.wait(1500),
    ],
    assert: [
      Assert.noErrors(),
      Assert.custom("multiple-rolls-tracked", (logs) => {
        return logs.some((log) => {
          const body = (log.data as any)?.body;
          if (!body) return false;
          return Number(body.totalRolls) >= 2;
        });
      }),
    ],
    stop: { idleMs: 2000, maxMs: 15000 },
  });
}
