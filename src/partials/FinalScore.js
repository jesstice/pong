import { SVG_NS } from '../settings';

export default class Board {
  constructor(width, height, size) {
    this.width = width;
    this.height = height;
		this.size = size;
  }

	render(svg, winner) {
		let rect = document.createElementNS(SVG_NS, 'rect');
		rect.setAttributeNS(null, 'width', this.width*0.75);
		rect.setAttributeNS(null, 'height', this.height/2);
		rect.setAttributeNS(null, 'x', this.width*0.125);
		rect.setAttributeNS(null, 'y', this.height*0.25);
		rect.setAttributeNS(null, 'fill', '#000');

		let text = document.createElementNS(SVG_NS, 'text');
		text.setAttributeNS(null, 'x', this.width*0.25);
		text.setAttributeNS(null, 'y', this.height*0.50);
		text.setAttributeNS(null, 'font-size', this.size);
		text.setAttributeNS(null, 'font-family', 'Silkscreen Web, monotype');
		text.setAttributeNS(null, 'fill', '#FFF');
		text.textContent = winner;

		let resettext = document.createElementNS(SVG_NS, 'text');
		resettext.setAttributeNS(null, 'x', this.width*0.27);
		resettext.setAttributeNS(null, 'y', this.height*0.65);
		resettext.setAttributeNS(null, 'font-size', this.size/2);
		resettext.setAttributeNS(null, 'font-family', 'Silkscreen Web, monotype');
		resettext.setAttributeNS(null, 'fill', '#FFF');
		resettext.textContent = 'Press enter to reset game';

		svg.appendChild(rect);
		svg.appendChild(text);
		svg.appendChild(resettext);
  }
}