class Game {
	constructor(){
		this.players = {};
		this.lastChangeTS = Date.Now();
		this.events = [];
		this.logs = [];
		this.turn = 0; // <=> player pos
	}
	setPlayer(name, pos){
		this.players[pos] = new Player(name);
	}
	start(){
		this.turn = -1;
	}
	next(){
		this.turn++;
	}
	attack(pos1, pos2){
		this.players[pos1].attack(this.players[pos2]);
	}
	play(pos){
		this.players[pos].play;
		this.logEvents(pos);
		this.next();
	}
	logEvents(pos){
		for (var i = 0; i++ ; i < 4){
			if (i != pos) {
				var caca = this.players[i].topCard().meets(this.players[pos]);
				if (){

				}
			}
		}
	}
}