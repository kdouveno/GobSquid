
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
		this.addEvents();
	}

	addEvents(){
		if(this.type != 3){
			Controls["p" + tapped.pos + "d"].add(this.protect);
			Controls["p" + tapper.pos + "a" + this.tapped.pos].add(this.tap);
		} else {
			tapped.forEachPlayer(function(i, j){
				Controls["p" + i + "g"] = this.gob(j);
			});
		}
	}
	clearEvents(){
		if(this.type != 3){
			Controls["p" + tapped.pos + "d"].delete(this.protect);
			Controls["p" + tapper.pos + "a" + this.tapped.pos].delete(this.tap);
		} else {
			tapped.forEachPlayer(function(i, j){
				Controls["p"+i+"g"] = undefined;
			});
		}
	}
	protect(){
		if(this.update(tapper)){
			tapped.save();
		} else {
			this.end(tapper.game);
		}
	}
	tap(){
		if(this.update(tapper)){
			if (this.type == 1)
				tapper.eat(tapped);
			else (tapped.kill());
		} else {
			this.end(tapper.game);
		}
	}
	gob(player){
		if (!this.update(player) && Object.keys(this.taps).length < 3){
			this.taps[0].eat(player);
			this.player.game.forEachPlayer(function(i, j){
				j.save();
			});
			this.end(player.game);
		}
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
		this.clearEvents();
	}
}