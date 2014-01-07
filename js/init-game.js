(function initEvents() {
    var partieURL = "http://"+SA.endpoint+"/" + $('#idGame').val();
    getData(partieURL, initGame);
})();

function initGame(data) {
    drawGrid(data["board"]);
    drawTarget(data["target"]);
    drawRobots(data["robots"]);
    initDeplacementEvent();
}

function drawGrid(boards) {
    for (var i = 0; i < boards.length; i++) {
        for (var j = 0; j < boards[i].length; j++) {
            drawCase(boards[i][j], j, i);
        }
    }
}

function drawCase(board, x, y) 
{
	/*Tarik: 	Responsive au chargement [C'est déjà un grand pas]*/
	
	//Pour iPhone et autres "petiteries"
	var width_petiteMargin = 30; 
	var height_petiteMargin = 50; 
	
	//Pour les vrais Devices de bonhomme	
	var largeMargin  = 100; 
	if ($(window).width() < 500)
	{
		var width 	= ($(window).width()-width_petiteMargin) / 16;
		var height 	= ($(window).height()-height_petiteMargin) / 16;
		
	} else
	{
		var width 	= ($(window).width()-largeMargin) / 16;
		var height 	= ($(window).height()-largeMargin) / 16;
	}
    

    var g = $(createSVGNode("g"));
    var caseOfGrid = createSVGNode("rect", {opacity: "0.2", 'data-coord': x + '-' + y, 'width': width, 'height': height, 'x': x * width, 'y': y * height, 'stroke-width': 2, 'stroke': 'black', "stroke-opacity": "0.8", 'fill': 'white'});
    g.append(caseOfGrid);
    $("#mainDiv svg").append(g);
    if (board.h || board.d || board.g || board.b) {
        drawWall($(caseOfGrid), board);
    }
}

function drawWall(caseOfGrid, board) {
    var g = caseOfGrid.parent();
    var arrayLines = getCoordBoards(parseInt(caseOfGrid.attr("x")), parseInt(caseOfGrid.attr("y")), parseInt(caseOfGrid.attr("width")), parseInt(caseOfGrid.attr("height")), board);
    for (var line in arrayLines) {
        var x1 = arrayLines[line].x1;
        var y1 = arrayLines[line].y1;
        var x2 = arrayLines[line].x2;
        var y2 = arrayLines[line].y2;
        var svgLine = createSVGNode("line", {'x1': x1, 'y1': y1, 'x2': x2, "y2": y2, 'stroke-width': 3, 'stroke': 'black', "stroke-opacity": 1, "opacity": "10"});
        g.append(svgLine);
    }
}

function drawRobots(robots) {
    for (var i = 0; i < robots.length; i++) {
        var dataCoord = robots[i].column + "-" + robots[i].line;
        var caseOfGrid = $("rect[data-coord='" + dataCoord + "']");
        var g = caseOfGrid.parent();
        var xCircle = parseInt(caseOfGrid.attr("x")) + (parseInt(caseOfGrid.attr("width")) / 2);
        var yCircle = parseInt(caseOfGrid.attr("y")) + (parseInt(caseOfGrid.attr("height")) / 2);
        var rCircle = (parseInt(caseOfGrid.attr("width")) + parseInt(caseOfGrid.attr("height"))) / 8;
        var circle = createSVGNode("circle", {"opacity": "1", cx: xCircle, cy: yCircle, 'r': rCircle, 'data-fill': robots[i].color, 'fill': robots[i].color, 'stroke-width': '2', stroke: 'black'})
        var animateXNode = createSVGNode("animate", {"attributeName": "cx", "begin": "moveRobot", "dur": "0.5s"});
        var animateYNode = createSVGNode("animate", {"attributeName": "cy", "begin": "moveRobot", "dur": "0.5s"});
        circle.appendChild(animateXNode);
        circle.appendChild(animateYNode);
        g.append(circle);
    }
}

function drawTarget(target) {
    var caseOfGrid = $("rect[data-coord='" + target.c + "-" + target.l + "']");
    var g = caseOfGrid.parent();
    var points = getPolygonePoints(caseOfGrid);
    var stringPoints = points.p1.x + "," + points.p1.y + " " + points.p2.x + "," + points.p2.y + " " + points.p3.x + "," + points.p3.y + " " + points.p4.x + "," + points.p4.y + " " + points.p5.x + "," + points.p5.y + " " + points.p6.x + "," + points.p6.y;
    var svgTarget = createSVGNode("polygon", {points: stringPoints, fill: target.t});
    g.append(svgTarget);
}
