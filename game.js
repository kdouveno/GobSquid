class Game {
	constructor() {
		this.players = [];
		this.events = new Set();
		this.logs = [];
		this.graveyard = [];

		this.gameBeginTs = Date.now();
		this.lastChangeTS = Date.now();

		this.turn = 0; // <=> player pos
		this.gobLocked = false;
	}
	forEachPlayer(fx){
		for(var i; i++; i < 4) {
			fx(i, players[i]);
		}
	}
	setPlayer(name, pos) {
		this.players[pos] = new Player(name);
	}
	start() {
		this.forEachPlayer((i, p)=>{
			p.pos = i;
		});
		this.turn = -1;
		this.gameBeginTs = Date.now();
		this.next();
	}
	next() {
		do {
			this.turn++;
			if (this.turn > 3)
				this.turn == 0;
		} while (this.players[turn].isDead);
	}
	attack(pos1, pos2) {
		this.players[pos1].attack(this.players[pos2]);
	}
	play(pos){
		this.players[pos].play;
		this.registerEvents(pos);
		this.next();
	}
	registerGobEvent(){
		var colors = 0;
		this.forEachPlayer((i, p) => {
			p.topCard().colors.((c)=>{
				if (c == 3)
					c++;
				colors |= c;
			});
		});
		if (colors == 7) //Gob Event Trigger
			this.gobLocked = new Event(undefined, this, 3);
		else {
			if (missed)
			this.gobLocked = false;
		}
	}
	registerEvents(pos) {
		this.registerGobEvent();

		this.forEachPlayer((i)=>{
			if (i != pos) {
				var tapper = players[pos];
				var tapped = players[i];

				var caca = this.players[i].topCard().meets(this.players[pos]);
				if (caca[0] == 2) { // register Ghost Tap Event
					this.forEachPlayer((j) => {
						if (players[j].isDead){
							this.events.add(new Event(players[j],players[pos], 2));
							this.events.add(new Event(players[j],players[i], 2));
						}
					});
				}
				if (caca[1]) {
					var temp = tapper;
					tapper = tapped;
					tapped = temp;
				}
				this.events.add(new Event(tapper, tapped, caca[0]));
			}
		});
	}
}