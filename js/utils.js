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

function moveRobot(robot, target, callback) {
    var newG = target.parentNode;
    var coordX = target.getAttribute("x");
    var coordY = target.getAttribute("y");
    var targetWidth = target.getAttribute("width");
    var targetHeight = target.getAttribute("height");
    var oldG = robot.parentNode;
    var newRobot = getRobot(parseInt(coordX) + (parseInt(targetWidth) / 2), parseInt(coordY) + (parseInt(targetHeight) / 2), targetWidth, targetHeight, robot.getAttribute("data-fill"))
    oldG.removeChild(robot);
    newG.appendChild(newRobot);
    if (callback) {
        callback();
    }
    return newRobot;
}

function animateRobot(robot, to) {
    var from = robot.parentNode.childNodes[0];
    var animateMotionNode = robot.querySelector(".animateMotionMoveRobot");
    var moveX = parseInt(to.getAttribute("x")) - parseInt(from.getAttribute("x"));
    var moveY = parseInt(to.getAttribute("y")) - parseInt(from.getAttribute("y"));
    animateMotionNode.setAttribute("path", 'M 0 0 L ' + moveX + ' ' + moveY);
    robot.dispatchEvent(new Event("moveRobot"));
}

function animateRobotDestroy(robot) {
    robot.dispatchEvent(new Event("destroyMove1"));

    var collEnfants = robot.childNodes;
    for (var i = 0; i < collEnfants.length; i++) {
        collEnfants[i].dispatchEvent(new Event("destroyMove1"));
        setTimeout(function() {
            animateRobotDestroy2(robot)
        }, 1500);
    }

}

function animateRobotDestroy2(robot) {
    robot.dispatchEvent(new Event("destroyMove2"));

    var collEnfants = robot.childNodes;
    for (var i = 0; i < collEnfants.length; i++) {
        collEnfants[i].dispatchEvent(new Event('destroyMove2'));
    }

}

function unbindRectEvent(positions) {
    for (var i = 0; i < positions.length; i++) {
        $("svg").off("click", "rect[data-coord=" + positions[i].c + "-" + positions[i].l + "]");
        $(document).off("keydown")
    }
}

function getRectsByPosition(rects, coordRobot) {
    var coordRobotSplit = coordRobot.split("-");
    var xRobot = coordRobotSplit[0];
    var yRobot = coordRobotSplit[1];
    var rectsByPosition = {
        top: getTopRect(rects, parseInt(xRobot), parseInt(yRobot)),
        bottom: getBottomRect(rects, parseInt(xRobot), parseInt(yRobot)),
        right: getRightRect(rects, parseInt(xRobot), parseInt(yRobot)),
        left: getLeftRect(rects, parseInt(xRobot), parseInt(yRobot))
    };
    return rectsByPosition;
}

function getTopRect(rects, xRobot, yRobot) {
    var topRect = null;
    for (var i = 0; i < rects.length; i++) {
        var rectSplit = rects[i].getAttribute("data-coord").split("-")
        var x = parseInt(rectSplit[0]);
        var y = parseInt(rectSplit[1]);
        if (y < yRobot && xRobot === x) {
            topRect = rects[i];
        }
    }
    return topRect;
}

function getBottomRect(rects, xRobot, yRobot) {
    var bottomRect = null;
    for (var i = 0; i < rects.length; i++) {
        var rectSplit = rects[i].getAttribute("data-coord").split("-")
        var x = parseInt(rectSplit[0]);
        var y = parseInt(rectSplit[1]);
        if (y > yRobot && xRobot === x) {
            bottomRect = rects[i];
        }
    }
    return bottomRect;
}

function getRightRect(rects, xRobot, yRobot) {
    var rightRect = null;
    for (var i = 0; i < rects.length; i++) {
        var rectSplit = rects[i].getAttribute("data-coord").split("-")
        var x = parseInt(rectSplit[0]);
        var y = parseInt(rectSplit[1]);
        if (x > xRobot && y === yRobot) {
            rightRect = rects[i];
        }
    }
    return rightRect;
}

function getLeftRect(rects, xRobot, yRobot) {
    var leftRect = null;
    for (var i = 0; i < rects.length; i++) {
        var rectSplit = rects[i].getAttribute("data-coord").split("-")
        var x = parseInt(rectSplit[0]);
        var y = parseInt(rectSplit[1]);
        if (x < xRobot && y === yRobot) {
            leftRect = rects[i];
        }
    }
    return leftRect;
}