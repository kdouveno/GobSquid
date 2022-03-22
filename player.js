class Player {
	constructor(name, pos, game){
		this.game = game;
		this.name = name;
		this.pos = pos;
		this.deck = [];
		this.draw = [];
		this.itsTurn = false;
		this.isDead = false;
	}

	topCard(){
		return this.draw[0];
	}
	play(){
		this.draw.shift(this.deck.unshift());
		this.game.next();
	}
	assimilate(draw){
		draw.reverse();
		this.deck.push(...draw);
	}
	eat(player){
		this.assimilate(player.draw)
		player.draw = [];
	}
	save(){
		this.assimilate(this.draw)
		this.draw = [];
	}
	kill(){
		draw.reverse();
		this.game.graveyard.push(...draw);
	}
}