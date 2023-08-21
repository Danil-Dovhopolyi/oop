abstract class TennisMatch {
  private playerA: Player;
  private playerB: Player;
  private currentServingPlayer: Player;
  private score: Score = new Score();
  protected strategy: GameStrategy;
  private _winner: Player | null = null;

  protected abstract gameOptions: GameOptions;

  constructor(playerA: Player, playerB: Player, strategy: GameStrategy) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.strategy = strategy;
    this.currentServingPlayer = strategy.getNextServer();
  }

  public get winner(): Player | null {
    return this._winner;
  }

  private determineWinner() {
    this._winner =
      this.score.getScoreA() === this.gameOptions.maxScore
        ? this.playerA
        : this.playerB;
  }

  start() {
    while (
      this.score.getScoreA() < this.gameOptions.maxScore &&
      this.score.getScoreB() < this.gameOptions.maxScore
    ) {
      let result = this.currentServingPlayer.serve();
      this.updateScore(result);
      this.currentServingPlayer = this.strategy.getNextServer();
    }
    this.determineWinner();
  }

  updateScore(result: boolean) {
    console.log('Update score');
    if (this.currentServingPlayer === this.playerA && result) {
      this.score.incrementScoreA();
    } else if (this.currentServingPlayer === this.playerB && result) {
      this.score.incrementScoreB();
    } else if (this.currentServingPlayer === this.playerA && !result) {
      this.score.incrementScoreB();
    } else if (this.currentServingPlayer === this.playerB && !result) {
      this.score.incrementScoreA();
    }
    console.log(this.score);
  }
  updateServingPlayer() {
    if (this.currentServingPlayer === this.playerA) {
      this.currentServingPlayer = this.playerB;
    } else {
      this.currentServingPlayer = this.playerA;
    }
  }
}

abstract class GameStrategy {
  protected serveOrder: Array<Player>;
  protected currentServerOrder: number = 0;
  abstract createServeOrder(playerA: Player, playerB: Player): Array<Player>;
  abstract getNextServer(): Player;

  protected constructor() {
    this.serveOrder = [];
  }
}
class DefaultStrategy extends GameStrategy {
  constructor(playerA: Player, playerB: Player) {
    super();
    this.serveOrder = this.createServeOrder(playerA, playerB);
  }
  getNextServer(): Player {
    const nextServer = this.serveOrder[this.currentServerOrder];
    this.currentServerOrder =
      (this.currentServerOrder + 1) % this.serveOrder.length;
    return nextServer;
  }
  createServeOrder(playerA: Player, playerB: Player): Array<Player> {
    return [playerA, playerA, playerB, playerB];
  }
}
abstract class GameOptions {
  protected _maxScore: number;

  constructor(maxScore: number) {
    this._maxScore = maxScore;
  }
  get maxScore(): number {
    return this._maxScore;
  }
}
class BigTennisMatchOptions extends GameOptions {
  static readonly BigMatchMaxScore: number = 25;

  constructor() {
    super(BigTennisMatchOptions.BigMatchMaxScore);
  }
}

class BigTennisMatch extends TennisMatch {
  protected gameOptions: GameOptions;
  constructor(playerA: Player, playerB: Player, strategy: GameStrategy) {
    super(playerA, playerB, strategy);
    this.gameOptions = new BigTennisMatchOptions();
  }
}

class Score {
  private _scoreA: number;
  private _scoreB: number;

  constructor() {
    this._scoreA = 0;
    this._scoreB = 0;
  }

  incrementScoreA() {
    this._scoreA++;
  }

  incrementScoreB() {
    this._scoreB++;
  }

  getScoreA() {
    return this._scoreA;
  }

  getScoreB() {
    return this._scoreB;
  }
  reset() {
    this._scoreA = 0;
    this._scoreB = 0;
  }
}

class Player {
  private _name: string;

  constructor(_name: string) {
    this._name = _name;
  }
  public getName(): string {
    return this._name;
  }

  private goal() {
    return Math.random() > 0.5;
  }

  serve() {
    const result = this.goal();
    console.log(
      `${this._name} player start serve and it's ${
        result ? 'goal' : 'not goal'
      }!`
    );
    return result;
  }
}

const playerA = new Player('A');
const playerB = new Player('B');
const matchBig = new BigTennisMatch(
  playerA,
  playerB,
  new DefaultStrategy(playerA, playerB)
);
matchBig.start();
console.log(`Player winner it's :${matchBig.winner?.getName()}`);
