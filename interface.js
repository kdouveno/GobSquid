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
	},
	updateEvent: function(e){
		var winner = e.winner.pos;
		var tapsTab = Object.keys(e.taps);
		if (winner){
			var won = e.isWon();
			if (tapsTab.length == 1){
				if (won){
					console.log(winner + " --> " + e.tapped.pos);
					// TODO: attack animation
				}
				else{
					console.log(winner + " |<- " + e.taper.pos);
					// TODO: defend animation
				}
			}else{
				var looser = e.looser().pos;
				if (won){
					console.log(looser + " <-| " + winner);

					// TODO: fail defend animation
				} else {
					console.log(looser + " ->| " + winner);

					// TODO: fail attack animation
				}
			}
		} else {
			console.log("no winner");
		}
	}
}