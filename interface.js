I = {
	types: ["star", "dots", "triangle", "square"],
	updateDraw: function(player){
		var topCard = player.draw[0];
		var e = $("#p" + player.pos + "_draw");
		e.removeClass("star dots triangle square color0 color1 color2 color10 color11 color12");
		e.width();
		if(player.fail)
			e.addClass("error");
		else
			e.removeClass("error");
		if (topCard){
			var type = this.types[topCard.type];
			e.addClass(type);
			e.addClass("color" + topCard.colors[0]);
			e.addClass("color1" + topCard.colors[1]);
			
		}
	},
	updateDraws: function(game){
		game.forEachPlayer((undefined,p)=>{
			this.updateDraw(p);
		});
	},
	updateEvent: function(e){
		var winPos = e.winner.pos;
		var tapsTab = Object.keys(e.taps);
		console.log(e, winPos);
		if (winPos){
			if (e.type == 4){
				var player = e.tapped;
				var e = $("#p" + player.pos + "_draw");
				e.addClass("error");
				return ;
			}
			var won = e.isWon();
			if (tapsTab.length == 1){
				if (won){
					console.log(winPos + " --> " + e.tapped.pos);
					// TODO: attack animation
				}
				else{
					console.log(winPos + " |<- " + e.taper.pos);
					// TODO: defend animation
				}
			}else{
				var looser = e.looser().pos;
				if (won){
					console.log(looser + " <-| " + winPos);

					// TODO: fail defend animation
				} else {
					console.log(looser + " ->| " + winPos);

					// TODO: fail attack animation
				}
			}
		} else {
			console.log("no winner");
		}
	}
}