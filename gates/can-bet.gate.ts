import { Gate, Act, Assert } from "gateproof";
import { createHttpObserveResource } from "gateproof";

export async function run() {
  const observe = createHttpObserveResource({
    url: "http://localhost:3000/api/state",
    pollInterval: 500,
  });

  return await Gate.run({
    name: "can-bet",
    observe,
    act: [
      Act.exec("bun run scripts/bet.ts"),
      Act.wait(1000),
    ],
    assert: [
      Assert.noErrors(),
      Assert.custom("has-score", (logs) => {
        return logs.some((log) => {
          const body = (log.data as any)?.body;
          if (!body) return false;
          return typeof body.score === "number" && body.totalRolls > 0;
        });
      }),
    ],
    stop: { idleMs: 2000, maxMs: 8000 },
  });
}
