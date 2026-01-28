import { definePrd } from "gateproof/prd";

export const prd = definePrd({
  stories: [
    {
      id: "server-responds",
      title: "Server responds on port 3000",
      gateFile: "./gates/server-responds.gate.ts",
    },
    {
      id: "can-roll",
      title: "Roll endpoint returns valid dice value (1-6)",
      gateFile: "./gates/can-roll.gate.ts",
      dependsOn: ["server-responds"],
    },
    {
      id: "can-bet",
      title: "Bet endpoint accepts wager and returns result with score",
      gateFile: "./gates/can-bet.gate.ts",
      dependsOn: ["can-roll"],
    },
    {
      id: "state-persists",
      title: "Game state persists across multiple bets",
      gateFile: "./gates/state-persists.gate.ts",
      dependsOn: ["can-bet"],
    },
  ] as const,
});

if (import.meta.main) {
  const { runPrd } = await import("gateproof/prd");
  const result = await runPrd(prd);
  if (!result.success) {
    console.error(`Failed at: ${result.failedStory?.id}`);
    process.exit(1);
  }
  console.log("All gates passed.");
  process.exit(0);
}
