# Dice Game

A simple dice game server built with Bun and TypeScript, featuring betting mechanics and comprehensive testing using Gateproof.

## Development Philosophy

This project was built using a **reverse TDD approach** where the `prd.ts` (Product Requirements Document) drove the entire development process. Rather than writing tests after implementation, the PRD defined the user stories first, and the implementation was written to satisfy those specifications. This demonstrates behavior-driven development in its purest form - requirements leading implementation, not the other way around.

## Overview

This project implements a web-based dice game where players can:
- Roll a standard six-sided die (values 1-6)
- Place bets on dice rolls
- Win if the roll is 4, 5, or 6
- Lose if the roll is 1, 2, or 3
- Track their score and roll history

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Testing**: Gateproof (behavior-driven testing framework)
- **HTTP Server**: Built-in Bun server

## Game Rules

- **Roll**: Generate a random number between 1-6
- **Bet**: Wager an amount on a dice roll
  - If roll ≥ 4: Win the wager amount
  - If roll < 4: Lose the wager amount
- **Score**: Tracks net winnings/losses across all bets

## API Endpoints

### POST /api/roll
Roll a single die.

**Response:**
```json
{
  "roll": 4,
  "totalRolls": 5
}
```

### POST /api/bet
Place a bet on a dice roll.

**Request Body:**
```json
{
  "amount": 10
}
```

**Response:**
```json
{
  "roll": 5,
  "win": true,
  "result": "win",
  "score": 10,
  "totalRolls": 6
}
```

### GET /api/state
Get current game state.

**Response:**
```json
{
  "score": 10,
  "lastRoll": 5,
  "totalRolls": 6
}
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd dice-game

# Install dependencies
bun install
```

## Running the Game

```bash
# Start the server
bun run server.ts
```

The server will start on `http://localhost:3000`.

## Testing

This project uses Gateproof for behavior-driven testing. Importantly, the `prd.ts` file contains the product definition that **drove the entire development process** - this is truly test-driven development in reverse, where requirements led implementation.

```bash
# Run all tests
bun run prd.ts
```

### Test Stories

1. **server-responds**: Verifies the server starts and responds on port 3000
2. **can-roll**: Tests the roll endpoint returns valid dice values (1-6)
3. **can-bet**: Validates the bet endpoint accepts wagers and returns results
4. **state-persists**: Ensures game state persists across multiple bets

### Individual Test Scripts

- `scripts/roll.ts` - Tests the roll endpoint
- `scripts/bet.ts` - Tests the bet endpoint
- `scripts/state.ts` - Tests the state endpoint

## Project Structure

```
dice-game/
├── server.ts          # Main game server
├── prd.ts            # Product definition and test configuration
├── gates/            # Gateproof test specifications
│   ├── server-responds.gate.ts
│   ├── can-roll.gate.ts
│   ├── can-bet.gate.ts
│   └── state-persists.gate.ts
├── scripts/          # Test client scripts
│   ├── roll.ts
│   ├── bet.ts
│   └── state.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Game Logic

The game maintains a single state object:
- `score`: Net winnings/losses (starts at 0)
- `lastRoll`: Most recent dice roll value
- `totalRolls`: Total number of rolls made

Each bet:
1. Generates a random dice roll (1-6)
2. Determines win condition (roll ≥ 4)
3. Updates score accordingly
4. Returns complete result information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass with `bun run prd.ts`
5. Submit a pull request

## License

This project is private and intended for educational/demonstration purposes.