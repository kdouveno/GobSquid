Controls = {
	game: undefined,
	triggers: {
		p1g: undefined,
		p1p: undefined,
		p1d: new Set(),
		p1a2: new Set(),
		p1a3: new Set(),
		p1a4: new Set(),

		p2g: undefined,
		p2p: undefined,
		p2d: new Set(),
		p2a1: new Set(),
		p2a3: new Set(),
		p2a4: new Set(),

		p3g: undefined,
		p3p: undefined,
		p3d: new Set(),
		p3a1: new Set(),
		p3a2: new Set(),
		p3a4: new Set(),

		p4g: undefined,
		p4p: undefined,
		p4d: new Set(),
		p4a1: new Set(),
		p4a2: new Set(),
		p4a3: new Set()
	},
	trigger: function(trigger){
		var player = game.players[trigger[1]];
		if (Object.is(this.triggers[trigger], undefined))
			return console.log("This action doesn't exist");
		var out = 0;
		var trigs = this.triggers[trigger];
		if (trigs) {
			if (typeof(trigs) == "function")
				out |= trigs();
			else
			{
				trigs.foreach((fx)=>{
					out |= fx.call(player);
				});
			}
		}
		if (!out)
			player.kill();
	}
	
}