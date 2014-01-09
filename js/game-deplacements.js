var login = "";
var idGame = "";
var movesHistory = [];
var currentBindPositions = null;
var currentRobotSelected = null;
var robotAlreadySelected = {
    "red": false,
    "green": false,
    "blue": false,
    "yellow": false
}
var colorFillCase = {
    "green": "#90f257",
    "yellow": "#f9e970",
    "red": "#e58080",
    "blue": "#77b6f4"
};

var colorAlreadySelected = {
    "red": "#cea5a5",
    "green": "#7f9b68",
    "yellow": "#bfba59",
    "blue": "#c4ddef"
}

function initDeplacementEvent() {
    $("svg").on("click", '.robot', function(e) {
        if ($(e.target).parents('.robot').attr("data-fill") !== currentRobotSelected && !robotAlreadySelected[$(e.target).parents('.robot').attr("data-fill")]) {
            if (currentRobotSelected != null) {
                animateRobotDestroy(currentRobotSelected);
            }
            clickRobotSelectAction(e.currentTarget);
        }
    });
}
;

function clickRobotSelectAction(selectedRobot) {
    if (currentBindPositions) {
        unbindRectEvent(currentBindPositions);
    }
    $(currentRobotSelected).attr("fill", colorAlreadySelected[$(currentRobotSelected).attr("data-fill")]);
    currentRobotSelected = selectedRobot;
    robotAlreadySelected[$(selectedRobot).attr("data-fill")] = true;
    login = $("#login").val();
    idGame = $("#idGame").val();
    movesHistory.push({command: "select", robot: currentRobotSelected.getAttribute("data-fill")});
    postPropostion("/proposition", login, idGame, movesHistory, function(response) {
        dealResponseSelect(response);
    });
	playSound("/sons/switch.wav","","");
}
var nbcoups = 0;
function clickRobotMoveAction(aimedPositions) {
    currentBindPositions = aimedPositions;
    var rects = [];
    $("rect[data-coord]").attr("fill", 'white');
    $("rect[data-coord]").attr("opacity", '0.2');
    $("rect[data-coord]").attr("stroke-opacity", '0.8');
    var newCoordRobot = currentRobotSelected.parentNode.querySelector("rect[data-coord]").getAttribute("data-coord");
    for (var i = 0; i < aimedPositions.length; i++) {
        var x = aimedPositions[i].c;
        var y = aimedPositions[i].l;
        var rect = document.querySelectorAll("rect[data-coord='" + x + "-" + y + "']")[0];
        rects.push(rect);
        rect.setAttribute("fill", colorFillCase[currentRobotSelected.getAttribute("fill")]);
        rect.setAttribute("opacity", "1");
        rect.setAttribute("stroke-opacity", "0.2");
		$("svg").on("click", "rect[data-coord=" + x + "-" + y + "]", function(e) {
            moveRobotAction(e.target);
			
			//Tarik: Gestion NBCoups + Son déplacement;
			var inputNBcoups = $("#nbCoups").val();
			nbcoups = nbcoups + 1;
			if (nbcoups == 1)
				$("#nbCoups").append("NB Coups: " +nbcoups);
			else
			{
				$( "#nbCoups" ).replaceWith( "<li class='WithoutZePuce' id='nbCoups'>NB Coups: " +nbcoups+ "</li>" );
			}	
			playSound("/sons/move.wav","","");
        });
    }
    //bindKeyEvent(rects);
}

function moveRobotAction(target) {
    var x = parseInt(target.getAttribute("data-coord").split("-")[0]);
    var y = parseInt(target.getAttribute("data-coord").split("-")[1]);
    var moveProposition = {
        command: "move",
        line: y,
        column: x
    };
    movesHistory.push({command: "select", robot: currentRobotSelected.getAttribute("data-fill")}, moveProposition);
    postPropostion("/proposition", login, idGame, movesHistory, function(response) {
        dealResponseMove(response, target);
    });
}

function incompleteResponseMove(aimedPositions, target) {
    unbindRectEvent(currentBindPositions);
    clickRobotMoveAction(aimedPositions);
    animateRobot(currentRobotSelected, target)
    setTimeout(function() {
        currentRobotSelected = moveRobot(currentRobotSelected, target);
        bindKeyEvent();
    }, 500);
}

function incompleteResponseSelect(aimedPositions){
    var rects = [];
    for(var i = 0; i < aimedPositions.length; i++){
        var rect = $("rect[data-coord='"+aimedPositions[i].c+"-"+aimedPositions[i].l+"']")[0]
        rects.push(rect);
    }
    bindKeyEvent(rects);
    clickRobotMoveAction(aimedPositions);
}

function successResponse(aimedPositions, target) {
    moveRobot(currentRobotSelected, target, function() {
        $("#gameInfos_block").show();
    });
}

function invalidMoveResponse() {
    alert("Deplacement interdit");
}

function invalidSelectResponse() {
    console.log("Invalid select");
}

function dealResponseMove(response, target) {
    var functions = {
        "INCOMPLETE": this.incompleteResponseMove,
        "SUCCESS": this.successResponse,
        "INVALID_MOVE": this.invalidMoveResponse
    };
    functions[response.state].call(this, response.nextPositions, target);
}

function dealResponseSelect(response) {
    var functions = {
        "INCOMPLETE": this.incompleteResponseSelect,
        "INVALID_SELECT": this.invalidSelectResponse
    };
    functions[response.state].call(this, response.nextPositions);
}

function bindKeyEvent(_rects) {
    var colorRobot = currentRobotSelected.getAttribute("data-fill")
    var coordRobot = $(".robot[data-fill='" + colorRobot + "']").parents("g").find("rect[data-coord]").attr("data-coord")
    var rects = (_rects) ? (_rects) : $("rect[fill^='#']");
    var rectsByPosition = getRectsByPosition(rects, coordRobot)
    $(document).on("keydown", function(e) {
        //key 't' for 'top'
        if (e.keyCode == 38) {
            if(rectsByPosition["top"])
                $(rectsByPosition["top"]).click();
				playSound("/sons/move.wav","","");
        }
        //key 'b' for 'bottom'
        else if (e.keyCode == 40) {
            if(rectsByPosition["bottom"])
                $(rectsByPosition["bottom"]).click();
				playSound("/sons/move.wav","","");
        }
        //key 'r' for 'right'
        else if (e.keyCode == 39) {
            if(rectsByPosition["right"])
                $(rectsByPosition["right"]).click();
				playSound("/sons/move.wav","","");
        }
        //key 'l' for 'left'
        else if (e.keyCode == 37) {
            if(rectsByPosition["left"])
                $(rectsByPosition["left"]).click();
				playSound("/sons/move.wav","","");
        }
    });
}

//By Tarik
function playSound(soundfile_ogg, soundfile_mp, soundfile_ma) {
    if ("Audio" in window) {
        var a = new Audio();
        if (!!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"')
                .replace(/no/, '')))
            a.src = soundfile_ogg;
        else if (!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/,
                '')))
            a.src = soundfile_mp;
        else if (!!(a.canPlayType && a.canPlayType(
                'audio/mp4; codecs="mp4a.40.2"').replace(/no/, '')))
            a.src = soundfile_ma;
        else
            a.src = soundfile_mp;

        a.autoplay = true;
        return;
    } else {
        alert("Time almost up");
    }

}