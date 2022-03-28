Controls = {
	game: undefined,
	triggers: {
		p0g: undefined,
		p0p: undefined,
		p0d: new Set(),
		p0a1: new Set(),
		p0a2: new Set(),
		p0a3: new Set(),

		p1g: undefined,
		p1p: undefined,
		p1d: new Set(),
		p1a0: new Set(),
		p1a2: new Set(),
		p1a3: new Set(),

		p2g: undefined,
		p2p: undefined,
		p2d: new Set(),
		p2a0: new Set(),
		p2a1: new Set(),
		p2a3: new Set(),

		p3g: undefined,
		p3p: undefined,
		p3d: new Set(),
		p3a0: new Set(),
		p3a1: new Set(),
		p3a2: new Set()
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
				trigs.forEach((fx)=>{
					out |= fx();
				});
			}
		}
		if (!out)
			player.error();
	},
	bindControls(){
		var controls = document.querySelectorAll(".control");
		controls.forEach((node)=>{
			node.addEventListener("click", ()=>{
				console.log("entry: " + node.id);
				Controls.trigger(node.id);
			});
		});
	}
	
}