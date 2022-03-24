class Game {
	constructor() {
		this.players = [];
		this.events = new Set();
		this.logs = [];
		this.graveyard = [];
		this.deck = [];

		this.gameBeginTs = Date.now();
		this.lastChangeTS = Date.now();

		this.turn = 0; // <=> player pos
		this.gobLocked = false;
		Controls.game = this;
	}
	initDeck(){
		for (var color = 0; color < 3; color++) {
			this.deck.push(new Card(0, [color]));
			for (let i = 0; i < 5; i++) {
				this.deck.push(new Card(1, [color]));
			}
			for (let i = 0; i < 6; i++) {
				this.deck.push(new Card(2, [color]));
			}
			for (let i = 0; i < 4; i++) {
				this.deck.push(new Card(3, [color]));
			}
		}
	}
	distribute(){
		utils.shuffle(this.deck);
		var cardsPerPlayer = this.deck.length / 4;
		this.forEachPlayer((i, p) => {
			p.deck = this.deck.slice(cardsPerPlayer * i, cardsPerPlayer * i + cardsPerPlayer);
		});
	}
	forEachPlayer(fx){

		for(var i = 0; i < 4; i++) {
			fx(i, this.players[i]);
		}
	}
	setPlayer(name, pos) {
		this.players[pos] = new Player(name, pos, this);
	}
	start() {
		this.forEachPlayer(function(i, p){
			p.pos = i;
			Controls.triggers["p" + i + "p"] = p.play;
		});
		this.initDeck();
		this.distribute();
		this.turn = -1;
		this.gameBeginTs = Date.now();
		this.next();
	}
	next() {
		this.registerEvents(this.turn);
		do {
			this.turn++;
			if (this.turn > 3)
				this.turn = 0;
				
		} while (this.players[this.turn].isDead);
	}
	attack(pos1, pos2) {
		this.players[pos1].attack(this.players[pos2]);
	}
	registerGobEvent(){
		var colors = 0;
		this.forEachPlayer((i, p) => {
			var card = p.topCard();
			if (!card) return;
			card.colors.forEach((c)=>{
				if (c == 3)
					c++;
				colors |= c;
			});
		});
		if (colors == 7) //Gob Event Trigger
			this.gobLocked = new Event(undefined, this, 3);
		else {
			this.gobLocked = false;
		}
	}
	registerEvents(pos) {
		this.closeEvents(false);
		this.registerGobEvent();

		this.forEachPlayer((i)=>{
			if (i != pos) {
				var tapper = this.players[pos];
				var tapped = this.players[i];

				var card = this.players[i].topCard();
				if (!card) return ;
				var caca = card.meets(this.players[pos].topCard());
				if (caca[0] == 2) { // register Ghost Tap Event
					this.forEachPlayer((j) => {
						if (this.players[j].isDead){
							this.events.add(new Event(players[j],players[pos], 2));
							this.events.add(new Event(players[j],players[i], 2));
						}
					});
					return ;
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
	closeEvents(won){
		var player = this.players[this.turn];
		var events = [...this.events];
		events = events.filter((e)=>{
			if (e.type == 4)
			{
				e.tapped.confirmError();
				return false;
			}
			if (!e.winner)
			{
				if (!Object.is(e.taper, player) && !Object.is(e.tapped, player))
					return true;
				if(won)
					return true;
			}
			e.end(this);
			return false;
		});
		this.events = new Set(events);
	}
	printGame(){
		var out = [this.players[0].topCard(), this.players[1].topCard(), this.players[2].topCard(), this.players[3].topCard()];
		out = out.map((o)=>{
			return (o ? [o.type, o.color] : "nope");
		});
		console.log(out[0], out[1], out[2], out[3]);

	}
}