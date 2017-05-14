import { SVG_NS } from '../settings';

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  render(svg) {
    let rectLeft = document.createElementNS(SVG_NS, 'rect');
		rectLeft.setAttributeNS(null, 'width', this.width/2);
		rectLeft.setAttributeNS(null, 'height', this.height);
		rectLeft.setAttributeNS(null, 'x', '0');
		rectLeft.setAttributeNS(null, 'y', '0');
		rectLeft.setAttributeNS(null, 'fill', '#353535');

		let rectRight = document.createElementNS(SVG_NS, 'rect');
		rectRight.setAttributeNS(null, 'width', this.width/2);
		rectRight.setAttributeNS(null, 'height', this.height);
		rectRight.setAttributeNS(null, 'x', this.width/2);
		rectRight.setAttributeNS(null, 'y', '0');
		rectRight.setAttributeNS(null, 'fill', '#40E0D0');
  
		let line = document.createElementNS(SVG_NS, 'line');
		line.setAttributeNS(null, 'x1', this.width/2);
		line.setAttributeNS(null, 'x2', this.width/2);
		line.setAttributeNS(null, 'y1', '0');
		line.setAttributeNS(null, 'y2', this.height);
		line.setAttributeNS(null, 'stroke', '#FFF');
		line.setAttributeNS(null, 'stroke-width', '4');
		line.setAttributeNS(null, 'stroke-dasharray', '20, 14');

		svg.appendChild(rectLeft);
		svg.appendChild(rectRight);
		svg.appendChild(line);

	}
}