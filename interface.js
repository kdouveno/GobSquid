I = {
	types: ["star", "dots", "triangle", "square"],
	updateDraw: function(player){
		var topCard = player.draw[0];
		var e = $("#p" + player.pos + "_draw .card");
		e.removeClass("star dots triangle square");
		if(player.fail)
			e.addClass("error");
		else
			e.removeClass("error");
		if (topCard){
			var type = this.types[topCard.type];
			e.addClass(type);
		}
	},
	updateDraws: function(game){
		game.forEachPlayer((undefined,p)=>{
			this.updateDraw(p);
		});
	}
}