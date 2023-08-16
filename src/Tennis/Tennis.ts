class TennisMatch {
  private playerA: Player;
  private playerB: Player;
  private currentServingPlayer: Player;
  private score: Score = new Score();
  private _winner: Player | null = null;

  constructor(playerA: Player, playerB: Player) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.currentServingPlayer = playerA;
  }

  public get winner(): Player | null {
    return this._winner;
  }

  private determineWinner(matchType: 'small' | 'big') {
    if (matchType === 'small') {
      this._winner =
        this.score.getScoreA() === 11 ? this.playerA : this.playerB;
    } else if (matchType === 'big') {
      this._winner =
        this.score.getScoreA() === 25 ? this.playerA : this.playerB;
    }
  }

  start(matchType: 'small'): void;
  start(matchType: 'big'): void;
  start(matchType: 'small' | 'big') {
    console.log(`Start the ${matchType} match`);
    const targetScore = matchType === 'small' ? 11 : 25;

    while (
      this.score.getScoreA() < targetScore &&
      this.score.getScoreB() < targetScore
    ) {
      let result = this.currentServingPlayer.serve();
      this.updateScore(result);
      this.updateServingPlayer();
    }
    this.determineWinner(matchType);
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
const match = new TennisMatch(playerA, playerB);
match.start('small');
console.log(`Player winner it;s :${match.winner?.getName()}`);
match.start('big');
console.log(`Player winner it;s :${match.winner?.getName()}`);
