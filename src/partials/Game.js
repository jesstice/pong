import { SVG_NS, KEYS, PADDLE, BALL, SCORE } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import FinalScore from './FinalScore';

export default class Game {
	constructor(element, width, height) {
		this.width = width;
		this.height = height;
		this.ping = new Audio('public/sounds/pong-04.wav');

		this.gameElement = document.getElementById(element);		

		this.board = new Board(this.width, this.height);

		this.player1Score = new Score(this.width/2 - SCORE.distance, SCORE.topDistance, SCORE.size);
		this.player2Score = new Score(this.width/2 + (SCORE.distance - SCORE.size/2), SCORE.topDistance, SCORE.size);
		
		this.ball = new Ball(
			BALL.radius,
			this.width,
			this.height,
			BALL.color1
		);

		this.ball2 = new Ball(
			BALL.radius2,
			this.width,
			this.height,
			BALL.colour2
		);

		this.player1 = new Paddle(
			this.height,
			PADDLE.width,
			PADDLE.height,
			PADDLE.gap,
			(this.height - PADDLE.height)/2,
			KEYS.a,
			KEYS.z
		);

		this.player2 = new Paddle(
			this.height,
			PADDLE.width,
			PADDLE.height,
			(this.width - PADDLE.width - PADDLE.gap),
			(this.height - PADDLE.height)/2,
			KEYS.up,
			KEYS.down
		);

		this.finalScore = new FinalScore(
			this.width,
			this.height,
			SCORE.size
		);

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		})

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.enter) {
				this.gameReset();
			}
		})

}

	gameReset() {
		this.pause = false;
		this.ball.reset();
		this.player1.score = 0;
		this.player2.score = 0;
	}

	declareWinner(svg, player) {
		this.ping.play();
		this.finalScore.render(svg, `${player} wins!`);
		this.pause = true;
	}

	addBall (svg) {
		this.ball2.render(svg, this.player1, this.player2);		
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);		
	
		this.board.render(svg);
		this.player1Score.render(svg, this.player1.score);
		this.player2Score.render(svg, this.player2.score);

		this.player1.render(svg);
		this.player2.render(svg);

		this.ball.render(svg, this.player1, this.player2);

		if (this.player1.score > 5 || this.player2.score > 5) {
			this.ball2.render(svg, this.player1, this.player2);
		}

		if (this.player1.score === 10) {
			this.declareWinner(svg, 'Player 1');
		} else if (this.player2.score === 10) {
			this.declareWinner(svg, 'Player 2');
		}

	}
}