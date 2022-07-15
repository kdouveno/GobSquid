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
		console.log(this.pos + " eats "+ player.draw.length + " cards from " + player.pos);
		this.assimilate(player.draw);
		player.draw = [];
		I.updateDraw(player);
	}
	save(){
		console.log(this.pos + " saves " + this.draw.length);
		this.assimilate(this.draw);
		this.draw = [];
		I.updateDraw(this);
	}
	kill(){
		console.log(this.pos + " kills "+ this.draw.length + " cards from its draw pile");

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
	}
	confirmError(){
		this.fail = undefined;
		this.kill();
	}
	itsTurn(){
		return this.game.turn == this.pos;
	}
}