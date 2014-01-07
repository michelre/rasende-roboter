function createSVGNode(tag, attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var i in attrs) {
        element.setAttribute(i, attrs[i]);
    }
    return element;
}

function getCoordBoards(xRect, yRect, widthRect, heightRect, board) {
    var x1, x2, y1, y2;
    var arrayLines = [];

    if (board.h) {
        x1 = xRect;
        y1 = yRect;
        x2 = xRect + widthRect;
        y2 = yRect;
        var coord = {"x1": x1, "y1": y1, "x2": x2, "y2": y2};
        arrayLines.push(coord);
    }
    if (board.b) {
        x1 = xRect;
        y1 = yRect + heightRect;
        x2 = xRect + widthRect;
        y2 = yRect + heightRect;
        var coord = {"x1": x1, "y1": y1, "x2": x2, "y2": y2};
        arrayLines.push(coord);
    }
    if (board.g) {
        x1 = xRect;
        y1 = yRect;
        x2 = xRect;
        y2 = yRect + heightRect;
        var coord = {"x1": x1, "y1": y1, "x2": x2, "y2": y2};
        arrayLines.push(coord);
    }
    if (board.d) {
        x1 = xRect + widthRect;
        y1 = yRect;
        x2 = xRect + widthRect;
        y2 = yRect + heightRect;
        var coord = {"x1": x1, "y1": y1, "x2": x2, "y2": y2};
        arrayLines.push(coord);
    }
    return arrayLines;
}

function getPolygonePoints(rect) {
    var a1 = {x: parseInt(rect.attr("x")), y: parseInt(rect.attr("y"))};
    var a2 = {x: parseInt(rect.attr("x")) + parseInt(rect.attr("width")), y: parseInt(rect.attr("y"))};
    var a3 = {x: a2.x, y: a2.y + parseInt(rect.attr("height"))};
    var a4 = {x: a1.x, y: a3.y};
    var widthPolygon = parseInt(rect.attr("width")) / 2;
    var heightPolygon = parseInt(rect.attr("height"));

    var p1 = {x: (a1.x + a2.x) / 2, y: a1.y};
    var p2 = {x: (p1.x + (widthPolygon / 2)), y: p1.y + (heightPolygon / 3)};
    var p3 = {x: p2.x, y: p2.y + (heightPolygon / 3)};
    var p4 = {x: p1.x, y: a3.y};
    var p5 = {x: p3.x - widthPolygon, y: p3.y};
    var p6 = {x: p5.x, y: p2.y};
    return {"p1": p1, "p2": p2, "p3": p3, "p4": p4, "p5": p5, "p6": p6}
}

function moveRobot(robot, target, callback) {
		var newG = target.parentNode;
	    var coordX = target.getAttribute("x");
	    var coordY = target.getAttribute("y");
	    var targetWidth = target.getAttribute("width");
	    var targetHeight = target.getAttribute("height");
	    var oldG = robot.parentNode;
	    var newRobot = getRobot(parseInt(coordX)+(parseInt(targetWidth)/2), parseInt(coordY)+(parseInt(targetHeight)/2), targetWidth, targetHeight, robot.getAttribute("data-fill"))
	    oldG.removeChild(robot);
	    newG.appendChild(newRobot);
	    if (callback){
	        callback();
	    }
	    return newRobot;
	
   /* animateRobot(robot, target, function() {
        var newG = target.parentNode;
        var coordX = target.getAttribute("x");
        var coordY = target.getAttribute("y");
        var targetWidth = target.getAttribute("width");
        var targetHeight = target.getAttribute("height");
        var xCircle = parseInt(coordX) + (targetWidth / 2);
        var yCircle = parseInt(coordY) + (targetHeight / 2);
        var oldG = robot.parentNode;
        robot.setAttribute("cx", xCircle);
        robot.setAttribute("cy", yCircle);
        console.log(oldGn newG, robot)
        oldG.removeChild(robot);
        newG.appendChild(robot);
        if (callback){
            callback();
        }
    });*/
}

function animateRobot(robot, to, callback) {
    var from = robot.parentNode.childNodes[0];
    var animateXNode = robot.querySelector("animate[attributeName='cx']");
    var animateYNode = robot.querySelector("animate[attributeName='cy']");
    animateXNode.setAttribute("from", parseInt(from.getAttribute("x")) + (parseInt(from.getAttribute("width")) / 2));
    animateXNode.setAttribute("to", parseInt(to.getAttribute("x")) + (parseInt(from.getAttribute("width")) / 2));
    animateYNode.setAttribute("from", parseInt(from.getAttribute("y")) + (parseInt(from.getAttribute("height")) / 2));
    animateYNode.setAttribute("to", parseInt(to.getAttribute("y")) + (parseInt(from.getAttribute("height")) / 2));
    robot.dispatchEvent(new Event("moveRobot"));
    setTimeout(callback, 500);
}

function animateRobotCool(robot, to){
	var from = robot.parentNode.childNodes[0];
	var animateMotionNode = robot.querySelector(".animateMotionMoveRobot");
	var moveX = parseInt(to.getAttribute("x")) - parseInt(from.getAttribute("x"));
	var moveY = parseInt(to.getAttribute("y")) - parseInt(from.getAttribute("y"));
	animateMotionNode.setAttribute("path", 'M 0 0 L '+moveX+' '+moveY);
	robot.dispatchEvent(new Event("moveRobot"));
}

function animateRobotDestroy(robot){
	robot.dispatchEvent(new Event("destroyMove1"));

	var collEnfants = robot.childNodes;
	for (var i = 0; i < collEnfants.length; i++) {
		collEnfants[i].dispatchEvent(new Event("destroyMove1"));
		setTimeout(function(){animateRobotDestroy2(robot)},1500);
	}

}

function animateRobotDestroy2(robot){
	robot.dispatchEvent(new Event("destroyMove2"));

	var collEnfants = robot.childNodes;
	for (var i = 0; i < collEnfants.length; i++) {
		collEnfants[i].dispatchEvent(new Event('destroyMove2'));
	}

}

function unbindRectEvent(positions) {
    for (var i = 0; i < positions.length; i++) {
        $("svg").off("click", "rect[data-coord=" + positions[i].c + "-" + positions[i].l + "]");
    }
}