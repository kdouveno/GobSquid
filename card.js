class Card {
	constructor(type, colors){
		/**
		 * TYPES
		 * 1 : point
		 * 2 : triangle
		 * 3 : rectangle
		 * 0 : star
		*/
		this.type = type;
		/**
		 * COLORS
		 * 1
		 * 2
		 * 3
		 */
		this.colors = colors;
	}
	/**
	 * RETURNS
	 * [0]:
	 * 	0 : die
	 *  1 : eat
	 * 	2 : neutral
	 * [1]:
	 * 	bool wins
	 * 
	 *
	 */
	meets(card){
		var out = [2, false];
		var dif = Math.abs(this.card.type - card.type);

		if (!dif) {
			if (this.card.color == card.color)
				out[1] = true;
			return out;
		}
		if (this.card.type == 0 || card.type == 0) {
			out[0] = 0;
			out[1] = this.card.type > card.type;
			return out;
		}
		if (dif != 1)
			return out;
		out[0] = 1;
		out[1] = this.card.type > card.type;
		return out;
	}
}