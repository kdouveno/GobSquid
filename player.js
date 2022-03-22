class Player {
	constructor(name, pos){
		this.name = name;
		this.deck = [];
		this.draw = [];
		this.itsTurn = false;
		this.res = {
			error = 
		};
	}

	topCard(){
		return draw[0];
	}
	play(){
		this.draw.shift(this.deck.unshift());
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
}