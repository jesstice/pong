import { SVG_NS, KEYS, PADDLE } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';

export default class Game {

	constructor(element, width, height) {
		this.width = width;
		this.height = height;
	
		this.gameElement = document.getElementById(element);		
	
		this.board = new Board(this.width, this.height);
		
		this.radius = 8;
		this.ball = new Ball(
			this.radius,
			this.width,
			this.height
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
	}

	render() {
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);		
	
		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg);
	}
}