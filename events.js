
class Event{
	/**
	 * type:
	 * 0 : kill
	 * 1 : eat
	 * 2 : ghost kill
	 * 
	 * 3 : Gobbit
	 */
	constructor (taper, tapped, type, beginTs = Date.now()){
		this.taper = taper;
		this.tapped = tapped;
		this.type = type;
		this.beginTs = beginTs;
		this.taps = false;
	}

	update(player){
		var wins = !this.taps;
		if (wins)
			this.taps = {};
		if (this.taps[player])
			return false;
		this.taps[player] = Date.now();
	}

	end(game){
		this.endTs = Date.now();
		game.logs.push(this);
		game.events.delete(this);
	}
}