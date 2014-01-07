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
        if ($(e.target).parents('.robot').attr("data-fill") !== currentRobotSelected && !robotAlreadySelected[$(e.target).parents('.robot').attr("data-fill")]){
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
}

function clickRobotMoveAction(aimedPositions) {
    currentBindPositions = aimedPositions;
    $("rect[data-coord]").attr("fill", 'white');
    $("rect[data-coord]").attr("opacity", '0.2');
    $("rect[data-coord]").attr("stroke-opacity", '0.8');
    for (var i = 0; i < aimedPositions.length; i++) {
        var x = aimedPositions[i].c;
        var y = aimedPositions[i].l;
        var rect = document.querySelectorAll("rect[data-coord='" + x + "-" + y + "']")[0];
        rect.setAttribute("fill", colorFillCase[currentRobotSelected.getAttribute("fill")]);
        rect.setAttribute("opacity", "1");
        rect.setAttribute("stroke-opacity", "0.2");
        $("svg").on("click", "rect[data-coord=" + x + "-" + y + "]", function(e) {
            moveRobotAction(e.target);
        });
    }
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
    animateRobotCool(currentRobotSelected, target)
    setTimeout(function(){
    	currentRobotSelected = moveRobot(currentRobotSelected, target);
    }, 500);
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
        "INCOMPLETE": this.clickRobotMoveAction,
        "INVALID_SELECT": this.invalidSelectResponse
    };
    functions[response.state].call(this, response.nextPositions);
}