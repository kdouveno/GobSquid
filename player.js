class Player {
	constructor(name, pos, game){
		this.game = game;
		this.name = name;
		this.pos = pos;
		this.deck = [];
		this.draw = [];
		this.isDead = false;
		this.play = this.play.bind(this);
		this.fail = false;
		this.isTapped = false;
	}

	topCard(){
		return this.draw[0];
	}
	play(){
		if (!this.itsTurn())
			return false;
		this.game.next();
		this.draw.unshift(this.deck.shift());
		this.game.registerEvents(this.pos);
		I.updateDraw(this);
		return true;
	}
	assimilate(draw){
		draw.reverse();
		this.deck.push(...draw);
	}
	eat(player){
		this.assimilate(player.draw);
		player.draw = [];
		I.updateDraw(player);
	}
	save(){
		this.assimilate(this.draw);
		this.draw = [];
		I.updateDraw(this);

	}
	kill(){
		this.draw.reverse();
		this.game.graveyard.push(...this.draw);
		this.draw = [];
		I.updateDraw(this);
	}
	error(){
		this.fail = new Event(game, this, 4);
		this.game.events.add(this.fail);
		this.fail.update(this);
		this.fail.conclusion = ()=>this.confirmError();
		console.log("player " + this.pos + " errored");
	}
	confirmError(){
		this.fail = undefined;
		this.kill();
	}
	itsTurn(){
		return this.game.turn == this.pos;
	}
}