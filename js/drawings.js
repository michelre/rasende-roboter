function getTarget(x, y, width, height, color) {
	var targetWidth = width / 11;
	var targetHeight = height / 11;
	var scale = 0;
	
	if (targetWidth < targetHeight)
		scale = targetWidth;
	else
		scale = targetHeight;
	
	var cible = createSVGNode("g", {'class': 'cible', 'transform': 'translate(' + x + ',' + y + ') scale(' + scale + ',' + scale + ')'});
		var circle1 = createSVGNode("circle", {'cx': '0', 'cy': '0', 'r': '5', 'fill': color});
		cible.appendChild(circle1);
		var polyline1 = createSVGNode("polyline", {'fill': '#f0f4f4', 'points': '5.2,-1 5.2,1 -5.2,1 -5.2,-1'});
			var animateTransform1 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 360 0 0', 'repeatCount': 'indefinite', 'dur': '8s'});
			polyline1.appendChild(animateTransform1);
		cible.appendChild(polyline1);
		var circle2 = createSVGNode("circle", {'cx': '0', 'cy': '0', 'r': '3', 'fill': '#f0f4f4'});
		cible.appendChild(circle2);
		var circle3 = createSVGNode("circle", {'cx': '0', 'cy': '0', 'r': '1', 'fill': color});
		cible.appendChild(circle3);
		
	return cible;
}

function getRobot(x, y, width, height, color) {
	var targetWidth = width / 315;
	var targetHeight = height / 360;
	var scale = 0;
	
	if (targetWidth < targetHeight)
		scale = targetWidth;
	else
		scale = targetHeight;
	
	var robot = createSVGNode("g", {'class': 'robot', 'transform': 'translate(' + x + ',' + y + ') scale(' + scale + ',' + scale + ')', 'data-fill': color, 'fill': color});
		var g1 = createSVGNode("g", {'class': 'corps'});
		robot.appendChild(g1);
			var rect1 = createSVGNode("rect", {'x': '-80', 'y': '-160', 'rx': '70', 'width': '160', 'height': '230', 'fill': color});
			g1.appendChild(rect1);
			var rect2 = createSVGNode("rect", {'x': '-80', 'y': '-50', 'rx': '30', 'width': '160', 'height': '160', 'fill': color});
			g1.appendChild(rect2);
		var g2 = createSVGNode("g", {'class': 'cornes'});
		robot.appendChild(g2);
			var rect3 = createSVGNode("rect", {'x': '-120', 'y': '-105', 'rx': '5', 'width': '240', 'height': '25', 'fill': color});
			g2.appendChild(rect3);
			var polyline1 = createSVGNode("polyline", {'fill': color, 'points': '0,0 -5,20 5,20', 'transform': 'translate(-98,-150) scale(2.5,2.5)'});
			g2.appendChild(polyline1);
			var polyline2 = createSVGNode("polyline", {'fill': color, 'points': '0,0 -5,20 5,20', 'transform': 'translate(98,-150) scale(2.5,2.5)'});
			g2.appendChild(polyline2);
			var polyline3 = createSVGNode("polyline", {'fill': color, 'points': '0,0 -5,20 5,20', 'transform': 'translate(70,-185) scale(2.5,2.5) rotate(25)'});
			g2.appendChild(polyline3);
			var polyline4 = createSVGNode("polyline", {'fill': color, 'points': '0,0 -5,20 5,20', 'transform': 'translate(-70,-185) scale(2.5,2.5) rotate(-25)'});
			g2.appendChild(polyline4);
		var g3 = createSVGNode("g", {'class': 'bras'});
		robot.appendChild(g3);
			var rect4 = createSVGNode("rect", {'x': '-140', 'y': '-65', 'rx': '10', 'width': '280', 'height': '36', 'fill': color});
			g3.appendChild(rect4);
			var rect5 = createSVGNode("rect", {'x': '-18', 'y': '-50', 'rx': '10', 'width': '36', 'height': '100', 'fill': color, 'transform': 'translate(-122,-10)'});
			g3.appendChild(rect5);
			var rect6 = createSVGNode("rect", {'x': '-18', 'y': '-50', 'rx': '10', 'width': '36', 'height': '100', 'fill': color, 'transform': 'translate(122,-10)'});
			g3.appendChild(rect6);
			var g4 = createSVGNode("g", {'transform': 'translate(122,33)'});
			g3.appendChild(g4);
				var g5 = createSVGNode("g", {'transform': 'scale(4.8,4.8)'});
				g4.appendChild(g5);
					var polyline5 = createSVGNode("polyline", {'fill': color, 'points': '-2,0 0,-2 4,0 6,4 1,12 2,4 0,2'});
					g5.appendChild(polyline5);
						var animateTransform1 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; -15 0 0; 0 0 0', 'repeatCount': 'indefinite', 'dur': '1s'});
						polyline5.appendChild(animateTransform1);
				var g6 = createSVGNode("g", {'transform': 'scale(-4.8,4.8)'});
				g4.appendChild(g6);
					var polyline6 = createSVGNode("polyline", {'fill': color, 'points': '-2,0 0,-2 4,0 6,4 1,12 2,4 0,2'});
					g6.appendChild(polyline6);
						var animateTransform2 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; -15 0 0; 0 0 0', 'repeatCount': 'indefinite', 'dur': '1s'});
						polyline6.appendChild(animateTransform2);
			var g6 = createSVGNode("g", {'transform': 'translate(-122,33)'});
			g3.appendChild(g6);
				var g7 = createSVGNode("g", {'transform': 'scale(4.8,4.8)'});
				g6.appendChild(g7);
					var polyline7 = createSVGNode("polyline", {'fill': color, 'points': '-2,0 0,-2 4,0 6,4 1,12 2,4 0,2'});
					g7.appendChild(polyline7);
						var animateTransform3 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; -15 0 0; 0 0 0', 'repeatCount': 'indefinite', 'dur': '1s'});
						polyline7.appendChild(animateTransform3);
				var g8 = createSVGNode("g", {'transform': 'scale(-4.8,4.8)'});
				g6.appendChild(g8);
					var polyline8 = createSVGNode("polyline", {'fill': color, 'points': '-2,0 0,-2 4,0 6,4 1,12 2,4 0,2'});
					g8.appendChild(polyline8);
						var animateTransform4 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; -15 0 0; 0 0 0', 'repeatCount': 'indefinite', 'dur': '1s'});
						polyline8.appendChild(animateTransform4);
		var g9 = createSVGNode("g", {'class': 'yeux'});
		robot.appendChild(g9);
			var g10 = createSVGNode("g", {'transform': 'translate(35,-110)'});
			g9.appendChild(g10);
				var circle1 = createSVGNode("circle", {'cx': '0', 'cy': '0', 'r': '20', 'fill': 'white'});
				g10.appendChild(circle1);
				var circle2 = createSVGNode("circle", {'cx': '0', 'cy': '0', 'r': '8', 'fill': color});
				g10.appendChild(circle2);
				var polyline9 = createSVGNode("polyline", {'fill': color, 'points': '0,-5 0,5 15,0'});
				g10.appendChild(polyline9);
					var animateTransform5 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 180 0 0; 0 0 0', 'repeatCount': 'indefinite', 'dur': '8s'});
					polyline9.appendChild(animateTransform5);
				var g11 = createSVGNode("g", {'transform': 'translate(-35,-10) rotate(-25)'});
				g10.appendChild(g11);
					var rect7 = createSVGNode("rect", {'x': '0', 'y': '-10', 'rx': '0', 'width': '50', 'height': '20', 'fill': color});
					g11.appendChild(rect7);
						var animateTransform6 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 10 0 0; 0 0 0', 'repeatCount': 'indefinite', 'dur': '5s'});
						rect7.appendChild(animateTransform6);
			var g12 = createSVGNode("g", {'transform': 'translate(-35,-110) scale(-1,1)'});
			g9.appendChild(g12);
				var circle3 = createSVGNode("circle", {'cx': '0', 'cy': '0', 'r': '20', 'fill': 'white'});
				g12.appendChild(circle3);
				var circle4 = createSVGNode("circle", {'cx': '0', 'cy': '0', 'r': '8', 'fill': color});
				g12.appendChild(circle4);
				var polyline10 = createSVGNode("polyline", {'fill': color, 'points': '0,-5 0,5 15,0'});
				g12.appendChild(polyline10);
					var animateTransform7 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 180 0 0; 0 0 0', 'repeatCount': 'indefinite', 'dur': '8s'});
					polyline10.appendChild(animateTransform7);
				var g13 = createSVGNode("g", {'transform': 'translate(-35,-10) rotate(-25)'});
				g12.appendChild(g13);
					var rect8 = createSVGNode("rect", {'x': '0', 'y': '-10', 'rx': '0', 'width': '50', 'height': '20', 'fill': color});
					g13.appendChild(rect8);
						var animateTransform8 = createSVGNode("animateTransform", {'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 10 0 0; 0 0 0', 'repeatCount': 'indefinite', 'dur': '5s'});
						rect8.appendChild(animateTransform8);
		var g14 = createSVGNode("g", {'class': 'jambes'});
		robot.appendChild(g14);
			var polyline11 = createSVGNode("polyline", {'fill': color, 'points': '1,0 1,5 2,6 2,8 -2,8 -2,6 -1,5 -1,0', 'transform': 'scale(12,9) translate(3,10)'});
			g14.appendChild(polyline11);
				var animateMotion1 = createSVGNode("animateMotion", {'path': 'M 0 0 V 3 Z', 'dur': '1s', 'repeatCount': 'indefinite'});
				polyline11.appendChild(animateMotion1);
			var polyline12 = createSVGNode("polyline", {'fill': color, 'points': '1,0 1,5 2,6 2,8 -2,8 -2,6 -1,5 -1,0', 'transform': 'scale(12,9) translate(-3,10)'});
			g14.appendChild(polyline12);
				var animateMotion2 = createSVGNode("animateMotion", {'path': 'M 0 0 V 3 Z', 'dur': '1s', 'begin': '0.5s', 'repeatCount': 'indefinite'});
				polyline12.appendChild(animateMotion2);
		
		//Animation mouvement
		var animateNode = createSVGNode("animateMotion", {"begin": "moveRobot", "dur": "0.5s", "class": "animateMotionMoveRobot"});		
		robot.appendChild(animateNode);
		
		//Animation de destruction partie 1
		var animateTransform9 = createSVGNode("animate", {"begin": "destroyMove1", 'attributeName': 'opacity', 'attributeType': 'CSS', 'from': '1', 'to': '0.2', 'dur': '2s', 'repeatCount': '1', 'fill': 'freeze'});
		robot.appendChild(animateTransform9);
		var animateTransform10 = createSVGNode("animateTransform", {"begin": "destroyMove1", 'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 360 0 0; 180 0 0; 75 0 0', 'repeatCount': '1', 'dur': '2s', 'fill': 'freeze'});
		g1.appendChild(animateTransform10);
		var animateTransform11 = createSVGNode("animateTransform", {"begin": "destroyMove1", 'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 360 0 0; 180 0 0; 75 0 0', 'repeatCount': '1', 'dur': '2s', 'fill': 'freeze'});
		g2.appendChild(animateTransform11);
		var animateTransform12 = createSVGNode("animateTransform", {"begin": "destroyMove1", 'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 360 0 0; 180 0 0; 75 0 0', 'repeatCount': '1', 'dur': '2s', 'fill': 'freeze'});
		g3.appendChild(animateTransform12);
		var animateTransform13 = createSVGNode("animateTransform", {"begin": "destroyMove1", 'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 360 0 0; 180 0 0; 75 0 0', 'repeatCount': '1', 'dur': '2s', 'fill': 'freeze'});
		g9.appendChild(animateTransform13);
		var animateTransform14 = createSVGNode("animateTransform", {"begin": "destroyMove1", 'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 360 0 0; 180 0 0; 75 0 0', 'repeatCount': '1', 'dur': '2s', 'fill': 'freeze'});
		g14.appendChild(animateTransform14);

		//Animation de destruction partie 2
		var animateNode2 = createSVGNode("animateMotion", {"begin": "destroyMove2", "dur": "0.5s", "path": "M 0 0 L 50 50", 'fill': 'freeze'});		
		g1.appendChild(animateNode2);
		var animateNode3 = createSVGNode("animateMotion", {"begin": "destroyMove2", "dur": "0.5s", "path": "M 0 0 L 50 50", 'fill': 'freeze'});		
		g2.appendChild(animateNode3);
		var animateTransform15 = createSVGNode("animateTransform", {"begin": "destroyMove2", 'attributeName': 'transform', 'attributeType': 'XML', 'type': 'rotate', 'values': '0 0 0; 40 0 0', 'repeatCount': '1', 'dur': '0.5s', 'fill': 'freeze'});
		g3.appendChild(animateTransform15);
		var animateNode4 = createSVGNode("animateMotion", {"begin": "destroyMove2", "dur": "0.5s", "path": "M 0 0 L 50 50", 'fill': 'freeze'});		
		g9.appendChild(animateNode4);
		var animateNode4 = createSVGNode("animateMotion", {"begin": "destroyMove2", "dur": "0.5s", "path": "M 0 0 L 30 30", 'fill': 'freeze'});		
		g14.appendChild(animateNode4);
		        
	return robot;
}