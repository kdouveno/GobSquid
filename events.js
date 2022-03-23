
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
		this.winner = undefined;
		this.protect = this.protect.bind(this);
		this.tap = this.tap.bind(this);
		this.gob = this.gob.bind(this);
		this.addEvents();

	}

	addEvents(){
		if(this.type != 3){
			Controls.triggers["p" + this.tapped.pos + "d"].add(this.protect);
			
			Controls.triggers["p" + this.taper.pos + "a"
			+ this.tapped.pos].add(this.tap);
		} else {
			this.tapped.forEachPlayer(function(i, j){
				Controls.triggers["p" + i + "g"] = this.gob(j);
			});
		}
	}
	clearEvents(){
		if(this.type != 3){
			Controls.triggers["p" + this.tapped.pos + "d"].delete(this.protect);
			Controls.triggers["p" + this.taper.pos + "a" + this.tapped.pos].delete(this.tap);
		} else {
			this.tapped.forEachPlayer(function(i, j){
				Controls.triggers["p" + i + "g"] = undefined;
			});
		}
	}
	protect(){
		if(this.update(this.tapped)){
			this.tapped.save();
		}
		if (!Object.is(this.winner, this.tapped)){
			this.end(this.winner.game);
		}
		return true;
	}
	tap(){
		if(this.update(this.taper)){
			if (this.type == 1)
				this.taper.eat(this.tapped);
			else (this.tapped.kill());
		}
		if (!Object.is(this.winner, this.taper))
			this.end(this.winner.game);
	}
	gob(player){
		if (!this.update(player) && Object.keys(this.taps).length < 3){
			this.winner.eat(player);
			this.player.game.forEachPlayer(function(i, j){
				j.save();
			});
			this.end(player.game);
		}
	}
	update(player){
		var wins = !this.taps;
		if (wins){
			this.winner = player;
			this.taps = {};
		}
		if (this.taps[player])
			return false;
		this.taps[player.name] = Date.now();
		return true;
	}

	end(game){
		this.endTs = Date.now();
		game.logs.push(this);
		game.events.delete(this);
		this.clearEvents();
	}
}