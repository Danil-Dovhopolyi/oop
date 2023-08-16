"use strict";
var _a;
class TennisMatch {
    constructor(playerA, playerB) {
        this.score = new Score();
        this._winner = null;
        this.playerA = playerA;
        this.playerB = playerB;
        this.currentServingPlayer = playerA;
    }
    get winner() {
        return this._winner;
    }
    determineWinner() {
        this._winner = this.score.getScoreA() === 11 ? this.playerA : this.playerB;
    }
    start() {
        console.log('Start the game');
        while (this.score.getScoreA() < 11 && this.score.getScoreB() < 11) {
            let result = this.currentServingPlayer.serve();
            this.updateScore(result);
            this.updateServingPlayer();
        }
        this.determineWinner();
    }
    updateScore(result) {
        console.log('Update score');
        if (this.currentServingPlayer === this.playerA && result) {
            this.score.incrementScoreA();
        }
        else if (this.currentServingPlayer === this.playerB && result) {
            this.score.incrementScoreB();
        }
        else if (this.currentServingPlayer === this.playerA && !result) {
            this.score.incrementScoreB();
        }
        else if (this.currentServingPlayer === this.playerB && !result) {
            this.score.incrementScoreA();
        }
        console.log(this.score);
    }
    updateServingPlayer() {
        if (this.currentServingPlayer === this.playerA) {
            this.currentServingPlayer = this.playerB;
        }
        else {
            this.currentServingPlayer = this.playerA;
        }
    }
}
class Score {
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
class SmallTennisMatch extends TennisMatch {
}
class BigTennisMatch extends TennisMatch {
}
class Player {
    constructor(_name) {
        this._name = _name;
    }
    getName() {
        return this._name;
    }
    goal() {
        return Math.random() > 0.5;
    }
    serve() {
        const result = this.goal();
        console.log(`${this._name} player start serve and it's ${result ? 'goal' : 'not goal'}!`);
        return result;
    }
}
const playerA = new Player('A');
const playerB = new Player('B');
const match = new TennisMatch(playerA, playerB);
match.start();
console.log(`Player winner it;s :${(_a = match.winner) === null || _a === void 0 ? void 0 : _a.getName()}`);
//# sourceMappingURL=Tennis.js.map