import { SVG_NS } from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

		document.addEventListener('keydown', event => {
      switch(event.key) {
				case up:
					this.up();
					break;
				case down:
					this.down();
					break;
			}
    });
  }
  
	up() {
		if (this.y <= Math.min(this.y, 0)) {
			this.y = 0;
		} else {
			this.y = this.y - this.speed;			
		}
	}

	down() {
		let boardEnd = this.boardHeight - this.height;

		if (this.y >= Math.max(this.y, boardEnd)) {
			this.y = boardEnd;
		} else {
			this.y = this.y + this.speed;
		}
	}

  render(svg) {
		let paddle = document.createElementNS(SVG_NS, 'rect');
		paddle.setAttributeNS(null, 'width', this.width);
		paddle.setAttributeNS(null, 'height', this.height);
		paddle.setAttributeNS(null, 'x', this.x);
		paddle.setAttributeNS(null, 'y', this.y);
		paddle.setAttributeNS(null, 'fill', '#FFF');

		svg.appendChild(paddle);				
  }
}