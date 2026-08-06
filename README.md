# katas

61 coding katas from [Coding Dojo](https://codingdojo.org/kata/), each as its own moon project. Bun + TypeScript. TDD, no exceptions.

## Getting started

```bash
bun install
```

Run a single kata's tests:

```bash
bunx moon run fizzbuzz:test
```

## Working a kata

Every kata starts as a stub: `src/<kata>.ts` throws `Not implemented`, and `src/<kata>.test.ts` has one placeholder test. That failing test is the RED step.

1. **RED** — replace the placeholder test with real cases for the kata. It fails against the stub.
2. **GREEN** — implement just enough in `src/<kata>.ts` to pass.
3. **REFACTOR** — clean up the implementation, keep the tests green, add more cases as needed.

Commands:

```bash
bunx moon run <kata>:test         # run one kata
bunx moon run :test               # run all katas (most are RED by design — unimplemented stubs)
bunx moon run <kata>:typecheck    # typecheck one kata
bun run test                      # same as `bunx moon run :test`, from root
bun run typecheck                 # same as `bunx moon run :typecheck`, from root
```

> **⚠️ Always use `bunx moon`, never bare `moon`.** A bare `moon` on `PATH` may resolve to a stale proto-managed shim (2.2.5) instead of the version this repo pins (2.4.6). `bunx moon` always resolves the pinned devDependency version. This bit us during setup — don't relearn it the hard way.
>
> Also: `moon run --dry-run` doesn't exist on 2.4.6, and `moon check --all` has a TTY quirk in some terminals. Neither is a bug in this repo.

## Adding a new kata

One command, generated from `templates/kata/`:

```bash
bunx moon generate kata --to packages/word-frequency -- \
  --name "word-frequency" \
  --title "Word Frequency" \
  --description "Count and rank word occurrences in a block of text" \
  --source "https://codingdojo.org/kata/WordFrequency/"
```

This scaffolds `moon.yml`, `package.json`, `tsconfig.json`, `README.md`, and a stub `src/word-frequency.ts` + `src/word-frequency.test.ts` — ready for the RED step.

## Kata index

Generated from `katas-manifest.json`. Where a kata's published name didn't survive the rename, its original name is noted.

### Beginner (28)

| Kata | Description | Source |
| --- | --- | --- |
| [anagram-generator](packages/anagram-generator) | Generate all two-word anagrams of the string "documenting" with maximally readable, self-documenting code | [source](https://codingdojo.org/kata/Anagram/) |
| [bowling-score](packages/bowling-score) | Calculate the total score for a valid sequence of rolls in one game of ten-pin bowling | [source](https://codingdojo.org/kata/Bowling/) |
| [substitution-cipher](packages/substitution-cipher) | Encrypt and decrypt messages using a fixed alphabet-to-symbol decryption key | [source](https://codingdojo.org/kata/CodeCracker/) |
| [cupcake-builder](packages/cupcake-builder) | Build cupcakes with a name and price composed from a base cake plus an ordered list of toppings | [source](https://codingdojo.org/kata/cupcake/) |
| [diamond-printer](packages/diamond-printer) | Print a diamond shape starting from 'A' with a given letter at its widest point | [source](https://codingdojo.org/kata/Diamond/) |
| [dictionary-replacer](packages/dictionary-replacer) | Replace $key$ placeholders in a string with corresponding values from a dictionary | [source](https://codingdojo.org/kata/DictionaryReplacer/) |
| [employee-sunday-report](packages/employee-sunday-report) | Report which employees are old enough (18+) to legally work a Sunday shift | [source](https://codingdojo.org/kata/Employee-Report/) |
| [fizzbuzz](packages/fizzbuzz) | Print numbers 1 to 100, substituting Fizz/Buzz/FizzBuzz for multiples of 3, 5, and both | [source](https://codingdojo.org/kata/FizzBuzz/) |
| [foobarqix](packages/foobarqix) | Replace numbers divisible by or containing 3, 5, or 7 with Foo, Bar, and Qix respectively | [source](https://codingdojo.org/kata/FooBarQix/) |
| [inventory-quality-updater](packages/inventory-quality-updater) (formerly Gilded Rose) | Update sell-in days and quality for a shop's inventory items under item-specific degradation rules | [source](https://codingdojo.org/kata/gilded-rose/) |
| [greed-dice-scorer](packages/greed-dice-scorer) | Score a roll of up to six dice according to the Greed dice game scoring rules | [source](https://codingdojo.org/kata/Greed/) |
| [hello-world](packages/hello-world) | Print "Hello, World!" to the screen | [source](https://codingdojo.org/kata/Hello/) |
| [leap-year-checker](packages/leap-year-checker) | Determine whether a given year is a leap year under the Gregorian calendar rules | [source](https://codingdojo.org/kata/LeapYears/) |
| [manhattan-distance](packages/manhattan-distance) | Compute the Manhattan (taxicab) distance between two grid points | [source](https://codingdojo.org/kata/manhattan-distance/) |
| [minesweeper-field](packages/minesweeper-field) | Given mine locations on an MxN field, print the count of adjacent mines for each cell | [source](https://codingdojo.org/kata/Minesweeper/) |
| [movie-rental-statement](packages/movie-rental-statement) | Generate a plain-text and HTML rental statement with amount owed and frequent renter points | [source](https://codingdojo.org/kata/movie-rental/) |
| [nearest-color](packages/nearest-color) | Find the nearest named color to a given RGB or hex color value | [source](https://codingdojo.org/kata/NearestColor/) |
| [number-to-lcd](packages/number-to-lcd) | Render an arbitrary-digit number as stylized 3-line-high LCD-style digits | [source](https://codingdojo.org/kata/NumberToLCD/) |
| [numbers-in-words](packages/numbers-in-words) | Convert a numeric monetary amount into its written-out word form | [source](https://codingdojo.org/kata/NumbersInWords/) |
| [pagination-display](packages/pagination-display) (formerly Pagination Seven) | Render pagination controls (current, previous/next, first/last) for a given page set | [source](https://codingdojo.org/kata/PaginationSeven/) |
| [book-set-discount-pricing](packages/book-set-discount-pricing) (formerly Potter) | Calculate the discounted price for combinations of books purchased from a series | [source](https://codingdojo.org/kata/Potter/) |
| [integer-range](packages/integer-range) | Implement an integer range type supporting contains, overlap, endpoints, and enumeration | [source](https://codingdojo.org/kata/Range/) |
| [roman-numeral-calculator](packages/roman-numeral-calculator) | Add two Roman numeral strings together without converting to integers | [source](https://codingdojo.org/kata/RomanCalculator/) |
| [roman-numerals](packages/roman-numerals) | Convert integers to their Roman numeral representation | [source](https://codingdojo.org/kata/RomanNumerals/) |
| [rpn-calculator](packages/rpn-calculator) | Evaluate arithmetic expressions written in Reverse Polish Notation | [source](https://codingdojo.org/kata/RPN/) |
| [string-calculator](packages/string-calculator) | Sum comma/newline-delimited numbers passed as one string | [source](https://codingdojo.org/kata/StringCalculator/) |
| [tennis-score](packages/tennis-score) | Track and report the score of a tennis game using love/15/30/40/deuce/advantage rules | [source](https://codingdojo.org/kata/Tennis/) |
| [word-wrap](packages/word-wrap) | Insert line breaks into a string so no line exceeds a given column width, breaking at word boundaries | [source](https://codingdojo.org/kata/WordWrap/) |

### Intermediate (18)

| Kata | Description | Source |
| --- | --- | --- |
| [args](packages/args) | Parse command-line flag arguments (booleans, strings, integers) into usable values | [source](https://codingdojo.org/kata/Args/) |
| [bank-ocr](packages/bank-ocr) | Parse OCR-scanned digit strings from bank documents into account numbers, flagging illegible or invalid ones | [source](https://codingdojo.org/kata/BankOCR/) |
| [tape-machine-interpreter](packages/tape-machine-interpreter) | Build an interpreter for a minimal, Turing-complete tape-and-pointer esoteric instruction set | [source](https://codingdojo.org/kata/) |
| [depth-first-search](packages/depth-first-search) | Implement depth-first traversal of a graph or maze using the call stack, discovered interactively | [source](https://codingdojo.org/kata/DepthFirstSearch/) |
| [eight-queens](packages/eight-queens) | Place eight queens on a chessboard so that none can capture another, finding all solutions | [source](https://codingdojo.org/kata/eight-queens/) |
| [game-of-life](packages/game-of-life) | Compute the next generation of a finite 2D grid under Conway's Game of Life rules | [source](https://codingdojo.org/kata/GameOfLife/) |
| [interval-scheduling-max-profit](packages/interval-scheduling-max-profit) (formerly Lags) | Select the combination of overlapping time-priced rental requests that maximizes total profit | [source](https://codingdojo.org/kata/Lags/) |
| [langton-ant](packages/langton-ant) | Simulate Langton's Ant, a cellular automaton that flips cell colors and turns based on simple rules | [source](https://codingdojo.org/kata/LangtonAnt/) |
| [markov-chain](packages/markov-chain) | Generate text of a given length from a learned Markov chain of word transition probabilities | [source](https://codingdojo.org/kata/MarkovChain/) |
| [mars-rover](packages/mars-rover) | Simulate a rover moving and turning on a bounded map, stopping when it meets an obstacle | [source](https://codingdojo.org/kata/mars-rover/) |
| [mastermind](packages/mastermind) | Score a codebreaker's guess against a secret peg combination with well-placed and misplaced counts | [source](https://codingdojo.org/kata/Mastermind/) |
| [mathematical-ast](packages/mathematical-ast) | Parse an RPN mathematical expression string into an abstract syntax tree | [source](https://codingdojo.org/kata/mathematical-ast/) |
| [nim-game](packages/nim-game) | Build a two-player Nim stick game with configurable starting stick count | [source](https://codingdojo.org/kata/Nim/) |
| [poker-hands](packages/poker-hands) | Compare pairs of five-card poker hands and determine which ranks higher | [source](https://codingdojo.org/kata/PokerHands/) |
| [reversi](packages/reversi) | Given a Reversi board and whose turn it is, return the list of legal flipping moves | [source](https://codingdojo.org/kata/Reversi/) |
| [rsa](packages/rsa) | Generate RSA public/private key pairs and use them to encrypt and decrypt a message | [source](https://codingdojo.org/kata/rsa/) |
| [tic-tac-toe](packages/tic-tac-toe) | Build a two-player tic-tac-toe game that detects wins, draws, and invalid moves | [source](https://codingdojo.org/kata/tic-tac-toe/) |
| [yahtzee](packages/yahtzee) | Score a five-dice roll against Yahtzee scoring categories, including rerolls | [source](https://codingdojo.org/kata/Yahtzee/) |

### Advanced (15)

| Kata | Description | Source |
| --- | --- | --- |
| [birthday-greetings](packages/birthday-greetings) | Send an automated birthday email to each friend in a flat file on their date of birth | [source](https://codingdojo.org/kata/birthday-greetings/) |
| [christmas-delivery](packages/christmas-delivery) | Coordinate multiple elves loading presents onto a sleigh concurrently instead of one at a time | [source](https://codingdojo.org/kata/christmas-delivery/) |
| [cqrs-booking](packages/cqrs-booking) | Implement a single-hotel booking system using the Command Query Responsibility Segregation pattern | [source](https://codingdojo.org/kata/CQRS_Booking/) |
| [pos-ticket-slicing](packages/pos-ticket-slicing) (formerly Elephant Carpaccio) | Build a point-of-sale cash register ticket system by shipping small, independently demoable user stories | [source](https://codingdojo.org/kata/elephant-carpaccio/) |
| [jee-web-authentication](packages/jee-web-authentication) | Authenticate web requests against LDAP via request parameters and record successful logins in an SSO registry | [source](https://codingdojo.org/kata/JEEWebAuthentication/) |
| [orm](packages/orm) | Build a minimal ORM reading and writing Person records between a business object and a SQLite database | [source](https://codingdojo.org/kata/orm/) |
| [pac-man](packages/pac-man) | Build a Pac-Man game loop with continuous turns, taking ghost behavior into account from the start | [source](https://codingdojo.org/kata/PacMan/) |
| [pizza-maker](packages/pizza-maker) | Build an interactive pizza ordering system with asynchronous cooking, queueing, and burn timers | [source](https://codingdojo.org/kata/pizza-maker/) |
| [quote-of-the-day](packages/quote-of-the-day) | Build a web app that serves a quote of the day, iterating via page reloads instead of tests | [source](https://codingdojo.org/kata/QotdCgi/) |
| [social-network](packages/social-network) | Build a light social network supporting posting, reading, following, mentions, links, and direct messages | [source](https://codingdojo.org/kata/social-network/) |
| [sudoku-concurrent-resolver](packages/sudoku-concurrent-resolver) | Solve Sudoku puzzles using concurrent, collaborating cells that narrow their own possible values | [source](https://codingdojo.org/kata/sudoku/) |
| [texas-hold-em](packages/texas-hold-em) | Rank and compare Texas Hold'Em poker hands for a televised championship show | [source](https://codingdojo.org/kata/TexasHoldEm/) |
| [trading-card-game](packages/trading-card-game) | Implement a rudimentary two-player mana-and-health trading card game loosely based on Hearthstone | [source](https://codingdojo.org/kata/TradingCardGame/) |
| [trip-service](packages/trip-service) | Test and refactor a legacy TripService class with hard-coded dependencies into well-crafted, testable code | [source](https://codingdojo.org/kata/TripService/) |
| [wallet](packages/wallet) | Compute the total value of a wallet's mixed-currency stock holdings in a target currency | [source](https://codingdojo.org/kata/Wallet/) |

## Naming note

Six katas were renamed from their Coding Dojo names for clarity: Potter → Book Set Discount Pricing, Gilded Rose → Inventory Quality Updater, Elephant Carpaccio → POS Ticket Slicing, Lags → Interval Scheduling Max Profit, and Pagination Seven → Pagination Display, because the published names didn't describe the problem. One further kata was renamed because its published name is inappropriate.

## Layout

```
packages/<kata>/
  src/
    <kata>.ts
    <kata>.test.ts
  moon.yml
  package.json
  tsconfig.json
  README.md
templates/kata/       # generator template for new katas
katas-manifest.json   # source of truth: dir, title, description, source, tier, originalName
.moon/                # moon workspace + task config
```
