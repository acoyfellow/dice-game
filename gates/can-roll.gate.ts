import { Gate, Act, Assert } from "gateproof";
import { createHttpObserveResource } from "gateproof";

export async function run() {
  const observe = createHttpObserveResource({
    url: "http://localhost:3000/api/state",
    pollInterval: 500,
  });

  return await Gate.run({
    name: "can-roll",
    observe,
    act: [
      Act.exec("bun run scripts/roll.ts"),
      Act.wait(1000),
    ],
    assert: [
      Assert.noErrors(),
      Assert.custom("valid-dice-value", (logs) => {
        return logs.some((log) => {
          const body = (log.data as any)?.body;
          if (!body) return false;
          const roll = Number(body.lastRoll);
          return roll >= 1 && roll <= 6;
        });
      }),
    ],
    stop: { idleMs: 2000, maxMs: 8000 },
  });
}
