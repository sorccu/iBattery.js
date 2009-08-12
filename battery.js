var Battery = function(canvas, options) {

	if (!options) options = {};

	function drawCapBase(g) {
		var x, y, fill;
		g.save();
		g.globalAlpha = 0.75;
		g.beginPath();
		g.moveTo(x = -0.5, y = 0); // intentionally cause blurry rendering
		g.lineTo(x -= 10, y);
		g.bezierCurveTo(x - 12, y, x - 12, y + 74, x -= 12, y += 84);
		g.bezierCurveTo(x, y + 10, x, y + 84, x += 12, y += 84);
		g.lineTo(x += 10, y);
		g.bezierCurveTo(x - 5, y - 10, x - 6, y - 78, x -= 6, y -= 84);
		g.bezierCurveTo(x, y - 10, x + 1, y - 74, x += 6, y -= 84);
		fill = g.createLinearGradient(x, y, x, y + 168);
		fill.addColorStop(0, 'rgba(66, 66, 66, 0.9)');
		fill.addColorStop(0.15, 'rgba(255, 255, 255, 1)');
		fill.addColorStop(1, 'rgba(0, 0, 0, 1)');
		g.fillStyle = fill;
		g.fill();
		g.restore();
	}

	function drawCapBody(g) {
		var x, y, fill;
		g.save();
		g.beginPath();
		g.moveTo(x = 1, y = 0);
		g.lineTo(x -= 10, y);
		g.bezierCurveTo(x - 12, y, x - 12, y + 74, x -= 12, y += 84);
		g.bezierCurveTo(x, y + 10, x, y + 84, x += 12, y += 84);
		g.lineTo(x += 10, y);
		g.bezierCurveTo(x - 5, y - 10, x - 6, y - 78, x -= 6, y -= 84);
		g.bezierCurveTo(x, y - 10, x + 1, y - 74, x += 6, y -= 84);
		fill = g.createLinearGradient(x, y, x, y + 168);
		fill.addColorStop(0, 'rgba(66, 66, 66, 0.8)');
		fill.addColorStop(0.4, 'rgba(0, 0, 0, 1)');
		fill.addColorStop(0.82, 'rgba(0, 0, 0, 1)');
		fill.addColorStop(1, 'rgba(66, 66, 66, 0.8)');
		g.fillStyle = fill;
		g.fill();
		g.restore();
	}

	function drawCapHilite(g, alpha) {
		var x, y, i, l;
		g.save();
		g.fillStyle = '#fff';
		g.translate(1, 0);
		// fake blur by creating multiple shapes with different opacities
		// looks better than feather
		for (i = 0, l = 6; i < l; ++i) {
			g.globalAlpha = alpha * i / l;
			g.beginPath();
			g.moveTo(x = -1.5, y = 2.4);
			g.lineTo(x -= 11, y += 1);
			g.quadraticCurveTo(x - 4, y + 6, x -= 8, y += 24);
			g.bezierCurveTo(x + 2, y - 10, x + 6, y - 18, x += 17, y -= 18);
			g.fill();
			g.scale(0.95, 0.8);
			g.translate(-0.2, -0.5);
		}
		g.restore();
	}

	function drawCapHilites(g) {
		g.save();
		drawCapHilite(g, 0.4);
		g.translate(0, 168);
		g.scale(1, -0.8);
		drawCapHilite(g, 0.2);
		g.restore();
	}

	function drawUpperCapReflection(g) {
		var fill;
		g.save();
		g.translate(-4, 18);
		g.globalAlpha = 0.9;
		fill = g.createLinearGradient(0, 0, 0, 52);
		fill.addColorStop(0, 'rgba(255, 255, 255, 1)');
		fill.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
		g.fillStyle = fill;
		feather(g, 1, 15, 52, 1, 1, function() {
			var x, y;
			g.beginPath();
			g.moveTo(x = 0, y = 0);
			g.lineTo(x -= 3, y);
			g.bezierCurveTo(x - 8, y, x - 10, y, x -= 12, y += 6);
			g.bezierCurveTo(x - 2, y + 10, x - 2, y + 10, x -= 3, y += 46);
			g.lineTo(x += 15.5, y);
			g.bezierCurveTo(x, y - 10, x, y - 20, x += 2.5, y -= 52);
			g.fill();
		});
		g.restore();
	}

	function drawLowerCapReflection(g) {
		var x, y, fill;
		g.save();
		g.translate(-2, 158.5);
		g.globalAlpha = 0.5;
		fill = g.createLinearGradient(0, 0, 0, -30);
		fill.addColorStop(0, '#fff');
		fill.addColorStop(1, '#000');
		g.fillStyle = fill;
		g.beginPath();
		g.moveTo(x = 0, y = 0);
		g.lineTo(x -= 1, y);
		g.quadraticCurveTo(x - 11, y, x -= 12, y -= 2);
		g.bezierCurveTo(x - 3, y - 6, x - 5, y - 20, x -= 5, y -= 26);
		g.quadraticCurveTo(x + 2, y + 7, x += 15, y += 7);
		g.bezierCurveTo(x + 1, y + 10, x + 2, y + 20, x += 3, y += 21);
		g.fill();
		g.restore();
	}

	function drawCapReflections(g) {
		drawUpperCapReflection(g);
		drawLowerCapReflection(g);
	}

	function drawCap(g) {
		drawCapBase(g);
		drawCapBody(g);
		drawCapHilites(g);
		drawCapReflections(g);
	}

	function drawCapEnd(g) {
		var x, y;
		g.save();
		feather(g, 5, 12, 168, 0.2, 0, function() {
			g.beginPath();
			g.moveTo(x = 0, y = 0.5);
			g.bezierCurveTo(x + 5, y + 6, x + 6, y + 78, x += 6, y += 84);
			g.bezierCurveTo(x, y + 6, x - 1, y + 78, x -= 6, y += 83.5);
			g.bezierCurveTo(x - 1, y - 6, x - 2, y - 78, x -= 2, y -= 83.5);
			g.bezierCurveTo(x, y - 6, x + 1, y - 78, x += 2, y -= 83.5);
			g.fill();
		});
		g.restore();
	}

	function drawCapEnds(g) {
		g.save();
		g.fillStyle = '#000';
		g.globalAlpha = 0.3;
		g.scale(-1.3, 1);
		drawCapEnd(g);
		g.restore();
		g.save();
		g.fillStyle = '#fff';
		g.globalAlpha = 0.2;
		g.translate(305, 18);
		g.scale(1.5, 0.80);
		drawCapEnd(g);
		g.restore();
	}

	function drawCaps(g) {
		g.save();
		g.translate(-3, 0);
		drawCap(g);
		g.save();
		g.translate(328, 46);
		g.scale(-0.7, 0.45);
		drawCap(g);
		g.restore();
		g.translate(310, 0);
		g.scale(-1, 1);
		drawCap(g);
		g.restore();
	}

	function drawBodyBase(g) {
		var x, y, fill;
		g.save();
		g.beginPath();
		g.moveTo(x = 0, y = 0);
		g.lineTo(x += 304, y);
		g.bezierCurveTo(x + 5, y + 10, x + 6, y + 78, x += 6, y += 84);
		g.bezierCurveTo(x, y + 6, x - 1, y + 78, x -= 6, y += 84);
		g.lineTo(x -= 304, y);
		g.bezierCurveTo(x - 5, y - 6, x - 6, y - 78, x -= 6, y -= 84);
		g.bezierCurveTo(x, y - 6, x + 1, y - 78, x += 6, y -= 84);
		fill = g.createLinearGradient(x, y, x, y + 168);
		fill.addColorStop(0, 'rgba(0, 0, 0, 0)');
		fill.addColorStop(0.2, 'rgba(0, 0, 0, 0)');
		fill.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
		g.fillStyle = fill;
		g.fill();
		g.restore();
	}

	function drawBodyHilite(g) {
		var fill;
		g.save();
		fill = g.createLinearGradient(0, 0, 0, 9);
		fill.addColorStop(0, 'rgba(255, 255, 255, 1)');
		fill.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
		g.fillStyle = fill;
		feather(g, 2, 306, 12, 1, 1, function() {
			var x, y;
			g.beginPath();
			g.moveTo(x = 0, y = 0);
			g.lineTo(x += 304, y);
			g.quadraticCurveTo(x + 1, y + 4, x += 1, y += 9);
			g.lineTo(x -= 306, y);
			g.quadraticCurveTo(x, y - 4, x += 1, y -= 9);
			g.fill();
		});
		g.restore();
	}

	function drawUpperShellHilite(g) {
		var fill;
		g.save();
		g.translate(-3, 18.5);
		fill = g.createLinearGradient(0, 0, 0, 54);
		fill.addColorStop(0, 'rgba(255, 255, 255, 1)');
		fill.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
		g.fillStyle = fill;
		feather(g, 2, 312, 48, 1, 1, function() {
			var x, y;
			g.beginPath();
			g.moveTo(x = 0, y = 0);
			g.lineTo(x += 310, y);
			g.quadraticCurveTo(x + 2, y + 26.25, x += 2, y += 52.5);
			g.lineTo(x -= 314, y);
			g.quadraticCurveTo(x, y - 26.25, x += 2, y -= 52.5);
			g.fill();
		});
		g.restore();
	}

	function drawLowerShellHilite(g) {
		var fill;
		g.save();
		g.translate(-2, 137);
		fill = g.createLinearGradient(0, 0, 0, 22);
		fill.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
		fill.addColorStop(1, 'rgba(255, 255, 255, 1)');
		g.fillStyle = fill;
		feather(g, 2, 312, 22, 1, 1, function() {
			var x, y;
			g.beginPath();
			g.moveTo(x = 0, y = 0);
			g.lineTo(x += 310, y);
			g.quadraticCurveTo(x + 1, y + 12, x -= 2, y += 22);
			g.lineTo(x -= 308, y);
			g.quadraticCurveTo(x - 1, y - 10, x -= 2, y -= 22);
			g.fill();
		});
		g.restore();
	}

	function drawInnerShellHilite(g) {
		var fill;
		g.save();
		g.translate(10, 97);
		g.globalAlpha = 0.2;
		fill = g.createLinearGradient(0, 0, 0, 60);
		fill.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
		fill.addColorStop(1, 'rgba(255, 255, 255, 1)');
		g.fillStyle = fill;
		feather(g, 2, 304, 60, 1, 1, function() {
			var x, y;
			g.beginPath();
			g.moveTo(x = 0, y = 0);
			g.lineTo(x += 284, y);
			g.bezierCurveTo(x, y, x, y + 40, x += 8, y += 57);
			g.lineTo(x -= 300, y);
			g.bezierCurveTo(x + 8, y - 17, x + 8, y - 57, x += 8, y -= 57);
			g.fill();
		});
		g.restore();
	}

	function drawBodyBackgroundHilites(g) {
		g.save();
		g.globalAlpha = 0.5;
		drawInnerShellHilite(g);
		g.restore();
	}

	function drawBodyForegroundHilites(g) {
		g.save();
		g.globalAlpha = 0.25;
		drawBodyHilite(g);
		g.save();
		g.translate(0, 168);
		g.scale(1, -0.6);
		g.globalAlpha = 0.3;
		drawBodyHilite(g);
		g.restore();
		g.globalAlpha = 0.5;
		drawUpperShellHilite(g);
		g.globalAlpha = 0.3;
		drawLowerShellHilite(g);
		g.restore();
	}

	function drawLiquidCap(g, pos) {
		var x, y;
		g.save();
		g.globalAlpha = 0.2;
		g.fillStyle = '#fff';
		g.beginPath();
		g.moveTo(x = 0, y = 0.5);
		g.bezierCurveTo(x + 5 - (8 * (1 - pos)), y + 10, x + 6 - (10 * (1 - pos)), y + 78, x += 6 - (10 * (1 - pos)), y += 84);
		g.bezierCurveTo(x, y + 6, x - 1 + (1.6 * (1 - pos)), y + 78, x -= 6 - (10 * (1 - pos)), y += 83.5);
		g.bezierCurveTo(x - 1, y - 6, x - 2, y - 78, x -= 2, y -= 83.5);
		g.bezierCurveTo(x, y - 6, x + 1, y - 78, x += 2, y -= 83.5);
		g.fill();
		g.restore();
	}

	function drawLiquid(g, pos) {
		var x, y, fill, width = pos * 304,
			split = pos > 0.3 ? 1 : (options.blend ? pos / 0.3 : 0);
		g.save();
		g.globalCompositeOperation = 'lighter';
		g.beginPath();
		g.moveTo(x = 0, y = 2.5);
		g.lineTo(x += width, y);
		g.bezierCurveTo(x + 5 - (8 * (1 - pos)), y + 6, x + 6 - (10 * (1 - pos)), y + 76, x += 6 - (10 * (1 - pos)), y += 82);
		g.bezierCurveTo(x, y + 6, x - 1 + (1.6 * (1 - pos)), y + 76, x -= 6 - (10 * (1 - pos)), y += 82);
		g.lineTo(x -= width, y);
		g.bezierCurveTo(x - 5, y - 6, x - 6, y - 76, x -= 6, y -= 82);
		g.bezierCurveTo(x, y - 6, x + 1, y - 76, x += 6, y -= 82);
		g.fillStyle = mix(0xff0000, 0.15, 0x19ff00, 0.15, split);
		g.fill();
		fill = g.createLinearGradient(x, y, x, y + 167.5);
		fill.addColorStop(0, mix(0xfe5939, 0.9, 0x79bf3a, 0.9, split));
		fill.addColorStop(0.5, mix(0xcd0000, 0.6, 0x009b01, 0.6, split));
		fill.addColorStop(1, mix(0xf16f5c, 0.6, 0x71ca3c, 0.6, split));
		g.fillStyle = fill;
		g.fill();
		g.restore();
		g.save();
		g.translate(width, 0);
		drawLiquidCap(g, pos);
		g.restore();
	}

	function drawShine(g, alpha) {
		var fill;
		g.save();
		fill = g.createRadialGradient(0, 0, 0, 0, 0, 10);
		fill.addColorStop(0, 'rgba(255, 255, 255, ' + alpha + ')');
		fill.addColorStop(1, 'rgba(255, 255, 255, 0)');
		g.fillStyle = fill;
		g.fillRect(-10, -10, 20, 20);
		g.restore();
	}

	function drawShines(g) {
		g.save();
		g.translate(-20, 23);
		g.scale(1.5, 2);
		drawShine(g, 0.6);
		g.restore();
		g.save();
		g.translate(-12, 5);
		g.scale(1.8, 2.3);
		drawShine(g, 0.3);
		g.restore();
		g.save();
		g.translate(324, 22);
		g.scale(1.4, 1.8);
		drawShine(g, 0.4);
		g.restore();
		g.save();
		g.translate(337.5, 55);
		g.scale(1, 1.4);
		drawShine(g, 0.4);
		g.restore();
	}

	function drawBackground(g) {
		var h;
		if (!cachedBackground) {
			cachedBackground = document.createElement('canvas');
			cachedBackground.width = 405;
			cachedBackground.height = 195;
			h = cachedBackground.getContext('2d');
			h.translate(30, 10);
			drawBodyBase(h);
			drawBodyBackgroundHilites(h);
		}
		g.drawImage(cachedBackground, -30, -10);
	}

	function drawForeground(g) {
		var h;
		if (!cachedForeground) {
			cachedForeground = document.createElement('canvas');
			cachedForeground.width = 445;
			cachedForeground.height = 235;
			h = cachedForeground.getContext('2d');
			h.translate(50, 30);
			h.save();
			drawBodyForegroundHilites(h);
			h.restore();
			drawCaps(h);
			drawCapEnds(h);
			drawShines(h);
		}
		g.drawImage(cachedForeground, -50, -30);
	}

	function feather(g, by, w, h, mx, my, fn) {
		var steps = by * 2, i, at,
			alphaStep = 1 - Math.pow(1 - g.globalAlpha, 1 / steps);
		for (i = 0; i < steps; ++i) {
			g.save();
			g.translate(mx * (at = i / steps * by), my * at);
			g.scale((w - (at *= 2)) / w, (h - at) / h);
			g.globalAlpha = alphaStep;
			fn(g);
			g.restore();
		}
	}

	function mix(color1, a1, color2, a2, pos) {
		var r1 = color1 >> 16,
			g1 = color1 >> 8 & 0xff,
			b1 = color1 & 0xff,
			r2 = color2 >> 16,
			g2 = color2 >> 8 & 0xff,
			b2 = color2 & 0xff;
		return 'rgba(' +
			~~(r1 + (r2 - r1) * pos) + ',' +
			~~(g1 + (g2 - g1) * pos) + ',' +
			~~(b1 + (b2 - b1) * pos) + ',' +
			(a1 + (a2 - a1) * pos) + ')';
	}

	// transitions stolen from MooTools

	function transition(p) {
		return Math.pow(2, 8 * (p - 1));
	}

	function easedTransition(p) {
		return (p <= 0.5) ? transition(2 * p) / 2 : (2 - transition(2 * (1 - p))) / 2;
	}

	var at = 0, interval,
		cachedBackground, cachedForeground,
		api = this, supported = !!(canvas && canvas.getContext);

	api.animate = function(to, time) {
		if (!supported) return api;
		var from = at, step = 0, steps = time / 1000 * 40;
		clearInterval(interval);
		interval = setInterval(function() {
			var pos = easedTransition(step / steps);
			canvas.width = canvas.width;
			api.set(from + (to - from) * pos);
			if (++step > steps) clearInterval(interval);
		}, 25);
		return api;
	};

	api.set = function(to) {
		if (!supported) return api;
		var g = canvas.getContext('2d'),
			top = 30, height = 168, bottom = top + height,
			mask;
		at = to;
		g.save();
		g.translate(138, top);
		drawBackground(g);
		drawLiquid(g, 0.05 + to * 0.95);
		drawForeground(g);
		g.restore();
		g.save();
		g.translate(0, bottom);
		g.scale(1, -1);
		g.drawImage(canvas, 0, -canvas.height + (canvas.height - bottom) - 1);
		g.scale(1, -1);
		g.restore();
		g.globalCompositeOperation = 'destination-in';
		mask = g.createLinearGradient(0, 0, 0, canvas.height);
		mask.addColorStop(0, 'rgba(255, 255, 255, 1)');
		mask.addColorStop(bottom / canvas.height, 'rgba(255, 255, 255, 1)');
		mask.addColorStop(bottom / canvas.height, 'rgba(255, 255, 255, 0.3)');
		mask.addColorStop(1, 'rgba(255, 255, 255, 0)');
		g.fillStyle = mask;
		g.fillRect(0, 0, canvas.width, canvas.height);
		g.restore();
		return api;
	};

};