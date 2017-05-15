import { SVG_NS } from '../settings';

export default class Ball {
	constructor(radius, boardWidth, boardHeight, colour) {
		this.radius = radius;
		this.boardWidth = boardWidth;
		this.boardHeight = boardHeight;
		this.direction = 1;
		this.colour = colour;
		this.ping = new Audio('public/sounds/pong-03.wav');
		
		// center ball in board initially
		this.reset();
	}
		// this.ballLeftEdge = this.x - this.radius;
		// this.ballRightEdge = this.x + this.radius;
		
	reset() {
		this.x = this.boardWidth/2;
		this.y = this.boardHeight/2;

		// Generate a random number between -5 and 5 that's not 0
		this.vy = 0;

		while (this.vy === 0) {
			this.vy = Math.floor(Math.random() * 10 - 5);
		}

		// A number between -5 and 5, based on the vy
		this.vx = this.direction * (6 - Math.abs(this.vy));
	}

	wallCollision() {
		const hitLeft = this.x - this.radius <= 0;
		const hitRight = this.x + this.radius >= this.boardWidth;
		const hitTop = this.y - this.radius <= 0;
		const hitBottom = this.y + this.radius >= this.boardHeight;

		if (hitLeft || hitRight) {
			this.vx = -this.vx;
		} else if (hitTop || hitBottom) {
			this.vy = -this.vy;
		}
	}

	paddleCollision(player1, player2) {
		// If moving to the right
		if (this.vx > 0) {
			// check collision on player2
			let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
			let [leftX, rightX, topY, bottomY] = paddle;
			let ballRightEdge = this.x + this.radius;

			if (
				ballRightEdge >= leftX
				&& ballRightEdge <= rightX
				&& this.y >= topY
				&& this.y <= bottomY
			) {
				this.vx = -this.vx;
				this.ping.play();
			}
		} else {
			// check collision on player1
			let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
			let [leftX, rightX, topY, bottomY] = paddle;
			let ballLeftEdge = this.x - this.radius;

			if (
				ballLeftEdge <= rightX
				&& ballLeftEdge >= leftX
				&& this.y >= topY
				&& this.y <= bottomY
			) {
				this.vx = -this.vx;
				this.ping.play();
			}
		}
	}

	goal(player) {
		player.score++;
		this.reset();
	}

	render(svg, player1, player2) {
		this.x += this.vx;
		this.y += this.vy;

		this.wallCollision();
		this.paddleCollision(player1, player2);

		let ball = document.createElementNS(SVG_NS, 'circle');
		ball.setAttributeNS(null, 'cx', this.x);
		ball.setAttributeNS(null, 'cy', this.y);
		ball.setAttributeNS(null, 'r', this.radius);
		ball.setAttributeNS(null, 'fill', this.colour);
		svg.appendChild(ball);

		// detect goal
		const rightGoal = this.x + this.radius >= this.boardWidth;
		const leftGoal = this.x - this.radius <= 0;

		if (rightGoal) {
			this.goal(player1);
			this.direction = 1;
		} else if (leftGoal) {
			this.goal(player2);
			this.direction = -1;
		}
	}
}