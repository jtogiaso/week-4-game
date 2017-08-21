//Declaration of the game object
var game = {
	isFighterChosen: false,
	isOpponentChosen: false,
	fighterID: "",
	opponentID: "",
	fighterBaseAtk: 0,
	opponentIsDefeated: false,
	opponentsDefeated: 0,

	statsInitializer: function(charId, atk, catk, hp) {
		$(charId).data("attack", atk)
		.data("counterAttack", catk)
		.data("health", hp);
		$(charId + "HP").text($(charId).data("health"));
	},

	decrementHPandUpAtk: function() {
		//Decrementing Opponent Health and braodcasting
		$("#" + this.opponentID).data("health",$("#" + this.opponentID).data("health") - $("#" + this.fighterID).data("attack"));
		$("#" + this.opponentID + "HP").text($("#" + this.opponentID).data("health"));
		if ($("#" + this.opponentID).data("health") <= 0) {
			this.opponentIsDefeated = true;
		}
		//Decrementing Fighter Health and broadcasting
		$("#" + this.fighterID).data("health",$("#" + this.fighterID).data("health") - $("#" + this.opponentID).data("counterAttack"));
		$("#" + this.fighterID + "HP").text($("#" + this.fighterID).data("health"));
		
		// console.log($("#" + this.opponentID).attr("id") + "'s' health: "+ $("#" + this.opponentID).data("health"));
		// console.log($("#" + this.fighterID).attr("id") + "'s' health: "+ $("#" + this.fighterID).data("health"));
		
		//Increasing Fighter Attack
		$("#" + this.fighterID).data("attack" , $("#" + this.fighterID).data("attack") + this.fighterBaseAtk);
		
		console.log($("#" + this.fighterID).data("attack"));
	}

}

//Procedural Code
$(document).ready(function() {

	// game.stats();
	//Aang Stats
		game.statsInitializer("#Aang", 13, 20 , 120);
	//Kata Stats
		game.statsInitializer("#Katara", 7, 15 , 175);
	//Toph Stats
		game.statsInitializer("#Toph", 10, 35 , 100);
	//Zuko Stats
		game.statsInitializer("#Zuko", 20, 12 , 105);		

	//Choosing player's fighter
	$("div.initialFighter").on("click", function(){
		if (!game.isFighterChosen){
			$(this).attr("class", "chosenFighter fighterCard");
			$("div.initialFighter").clone(true, true).attr("class", "cloneD fighterCard").appendTo($("#slateOfOpponents"));
			game.isFighterChosen = true;
			$("div.initialFighter").remove();
			game.fighterID = $(this).attr("id");
			game.fighterBaseAtk = $(this).data("attack");
			game.opponentIsDefeated = false;
		}
	});


	//Choosing player's opponent
	$("div").on("click", ".cloneD" ,function(){
		if (!game.isOpponentChosen){
			$(this).attr("class", "movingUp fighterCard");
			$("div.movingUp").clone(true,true).attr("class", "chosenOpponent fighterCard").appendTo($("#mainOpponent"));
			game.isOpponentChosen = true;
			$("div.movingUp").remove();
			game.opponentID = $(this).attr("id");
		}
	});

	//Attack Button
	$("button").on("click" ,function(){
		if (game.isOpponentChosen) {
			if (!game.opponentIsDefeated){
				game.decrementHPandUpAtk();
			}
		}
	});

});