const game = {
  score: 0,
  lastRoll: 0,
  totalRolls: 0,
};

function roll(): number {
  const value = Math.floor(Math.random() * 6) + 1;
  game.lastRoll = value;
  game.totalRolls++;
  return value;
}

function bet(amount: number) {
  const value = roll();
  const win = value >= 4;
  game.score += win ? amount : -amount;
  return {
    roll: value,
    win,
    result: win ? "win" : "lose",
    score: game.score,
    totalRolls: game.totalRolls,
  };
}

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/roll" && req.method === "POST") {
      const value = roll();
      return Response.json({ roll: value, totalRolls: game.totalRolls });
    }

    if (url.pathname === "/api/bet" && req.method === "POST") {
      const body = (await req.json()) as { amount: number };
      return Response.json(bet(body.amount));
    }

    if (url.pathname === "/api/state") {
      return Response.json({ ...game });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Dice game running at http://localhost:${server.port}`);
