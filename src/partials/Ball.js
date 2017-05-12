import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
  }

render(svg) {
		let ball = document.createElementNS(SVG_NS, 'circle');
		ball.setAttributeNS(null, 'cx', this.boardWidth/2);
		ball.setAttributeNS(null, 'cy', this.boardHeight/2);
		ball.setAttributeNS(null, 'r', '8');
		ball.setAttributeNS(null, 'fill', '#FFF');

		svg.appendChild(ball);				
  }
}

