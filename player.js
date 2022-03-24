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
	}

	topCard(){
		return this.draw[0];
	}
	play(){
		if (!this.itsTurn())
			return false;
		this.game.closeEvents(true);
		this.draw.unshift(this.deck.shift());
		this.game.next();
		return true;
	}
	assimilate(draw){
		draw.reverse();
		this.deck.push(...draw);
	}
	eat(player){
		this.assimilate(player.draw);
		player.draw = [];
	}
	save(){
		this.assimilate(this.draw);
		this.draw = [];
	}
	kill(){
		this.draw.reverse();
		this.game.graveyard.push(...this.draw);
		this.draw = [];
	}
	error(){
		this.fail = new Event(game, this, 4);
		this.game.events.add(this.fail);
		this.fail.update(this);
	}
	confirmError(){
		this.fail.end(this.game);
		this.fail = undefined;
		this.kill();
	}
	itsTurn(){
		return this.game.turn == this.pos;
	}
}