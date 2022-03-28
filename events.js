
class Event{
	/**
	 * type:
	 * 0 : kill
	 * 1 : eat
	 * 2 : ghost kill
	 * 
	 * 3 : Gobbit
	 */
	constructor (taper, tapped, type){
		this.taper = taper;
		this.tapped = tapped;
		this.type = type;
		this.beginTs = Date.now();
		this.taps = false;
		this.winner = undefined;
		this.protect = this.protect.bind(this);
		this.tap = this.tap.bind(this);
		this.gob = this.gob.bind(this);
		this.conclusion = ()=>{};
		this.addEvents();
	}

	addEvents(){
		if(this.type == 3){

			this.tapped.forEachPlayer(function(i, j){
				Controls.triggers["p" + i + "g"] = this.gob(j);
			});
			
		} else if (this.type != 4) {
			Controls.triggers["p" + this.tapped.pos + "d"].add(this.protect);
			
			Controls.triggers["p" + this.taper.pos + "a"
			+ this.tapped.pos].add(this.tap);
		}
	}
	clearEvents(){
		if(this.type == 3){
			this.tapped.forEachPlayer(function(i, j){
				Controls.triggers["p" + i + "g"] = undefined;
			});
		} else if (this.type != 4){
			Controls.triggers["p" + this.tapped.pos + "d"].delete(this.protect);
			Controls.triggers["p" + this.taper.pos + "a" + this.tapped.pos].delete(this.tap);
		}
	}
	protect(){
		if(this.tapped.game.gobLocked)
			return false;
		if(this.update(this.tapped)){
			this.conclusion = ()=>this.tapped.save();
		}
		return true;
	}
	tap(){
		if(this.tapped.game.gobLocked)
			return false;
		if(this.update(this.taper)){
			if(this.tapped.isTapped)
				return true;
			if (this.type == 1)
				this.conclusion = ()=>{
					this.taper.eat(this.tapped);
					this.tapped.isTapped = false;
				}
			else this.conclusion = ()=>{
				console.log("tape type = " + this.type);
				this.tapped.kill();
				this.tapped.isTapped = false;
			}
		}
		return true;
	}
	gob(player){
		if (this.update(player) && Object.keys(this.taps).length >= 3){
			this.winner.eat(player);
			this.conclusion = ()=>this.player.game.forEachPlayer(function(i, j){
				j.save();
			});
			this.end(player.game);
		}
		return true;
	}
	update(player){
		var wins = !this.taps;
		if (wins){
			this.winner = player;
			this.taps = {};
		}
		if (this.taps[player.pos])
			return false;
		this.taps[player.pos] = Date.now();
		I.updateEvent(this);
		return true;
	}

	end(game){
		this.endTs = Date.now();

		this.conclusion();
		game.logs.push(this);
		game.events.delete(this);
		this.clearEvents();
	}

	isWon(){
		if (this.winner){
			return Object.is(this.winner, this.taper);
		}
		return false;
	}
	looser(){
		if (this.winner){
			return Object.is(this.winner, this.taper) ? this.tapped : this.taper;
		}
	}
}