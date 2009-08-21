var Battery = function(canvas, options) {

	function Feather(by, w, h, alpha, scaleX, scaleY) {

		if (alpha > 0.95) alpha = 0.95;
		if (isNaN(scaleX)) scaleX = 1;
		if (isNaN(scaleY)) scaleY = 1;

		var layerAlpha = 1 - Math.pow(1 - alpha, 1 / by);

		// Firefox 3.0 fails with globalAlpha and gradient/pattern
		// fills, which is why this helper is needed.
		this.rgba = function(r, g, b, a) {
			return 'rgba(' +
				r + ',' +
				g + ',' +
				b + ',' +
				(a * layerAlpha) + ')';
		};

		this.draw = function(g, fn) {
			for (var i = 0; i < by; ++i) {
				g.save();
				g.translate(scaleX * i, scaleY * i);
				g.scale((w - (i * 2)) / w, (h - (i * 2)) / h);
				fn(g);
				g.restore();
			}
		};

	}

	function drawCapShape(g) {
		var x, y, cp1x, cp2x, fill;
		g.save();
		g.beginPath();
		g.moveTo(x = 0, y = 0);
		g.lineTo(x -= 10, y);
		cp1x = x - 12;
		g.bezierCurveTo(cp1x, y, cp1x, y + 74, cp1x, y += 84);
		g.bezierCurveTo(cp1x, y + 10, cp1x, y + 84, x, y += 84);
		g.lineTo(x += 10, y);
		cp1x = x - 5;
		cp2x = x - 6;
		g.bezierCurveTo(cp1x, y - 10, cp2x, y - 78, cp2x, y -= 84);
		g.bezierCurveTo(cp2x, y - 10, cp1x, y - 74, x, y -= 84);
		g.fill();
		g.restore();
	}

	function drawCapBase(g) {
		var x, y, cp1x, cp2x, fill;
		g.save();
		g.translate(-0.5, 0);
		fill = g.createLinearGradient(0, 0, 0, 168);
		fill.addColorStop(0, 'rgba(66, 66, 66, 0.675)');
		fill.addColorStop(0.15, 'rgba(255, 255, 255, 0.75)');
		fill.addColorStop(1, 'rgba(0, 0, 0, 0.75)');
		g.fillStyle = fill;
		drawCapShape(g);
		g.restore();
	}

	function drawCapBody(g) {
		var x, y, cp1x, cp2x, fill;
		g.save();
		g.translate(1, 0);
		fill = g.createLinearGradient(0, 0, 0, 168);
		fill.addColorStop(0, 'rgba(66, 66, 66, 0.8)');
		fill.addColorStop(0.4, 'rgba(0, 0, 0, 1)');
		fill.addColorStop(0.82, 'rgba(0, 0, 0, 1)');
		fill.addColorStop(1, 'rgba(66, 66, 66, 0.8)');
		g.fillStyle = fill;
		drawCapShape(g);
		g.restore();
	}

	function drawCapHilite(g, alpha) {
		var x, y, i, l;
		g.save();
		g.translate(1, 1);
		g.fillStyle = '#fff';
		// fake blur by creating multiple shapes with different opacities
		// looks better than feather
		for (i = 0, l = 6; i < l; ++i) {
			g.globalAlpha = alpha * i / l;
			g.beginPath();
			g.moveTo(x = -0.5, y = 2);
			g.lineTo(x -= 11, y += 1);
			g.quadraticCurveTo(x - 7, y, x -= 8, y += 24);
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
		var fill, feather = new Feather(1, 15, 52, 0.9, -1, 1);
		g.save();
		g.translate(-4, 18.5);
		fill = g.createLinearGradient(0, 0, 0, 52);
		fill.addColorStop(0, feather.rgba(255, 255, 255, 1));
		fill.addColorStop(1, feather.rgba(255, 255, 255, 0.2));
		g.fillStyle = fill;
		feather.draw(g, function() {
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
		fill = g.createLinearGradient(0, 0, 0, -30);
		fill.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
		fill.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
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

	function drawCapEnd(g, color) {
		var feather = new Feather(3, 6, 168, color[3], 0, 1);
		g.save();
		g.translate(0, 0.5);
		g.fillStyle = feather.rgba.apply(feather, color);
		feather.draw(g, function() {
			var x, y, cp1x, cp2x;
			g.beginPath();
			g.moveTo(x = 0, y = 0);
			cp1x = x + 5;
			cp2x = x + 6;
			g.bezierCurveTo(cp1x, y + 6, cp2x, y + 78, cp2x, y += 84);
			g.bezierCurveTo(cp2x, y + 6, cp1x, y + 78, x, y += 84);
			cp1x = x - 1;
			cp2x = x - 2;
			g.bezierCurveTo(cp1x, y - 6, cp2x, y - 78, cp2x, y -= 84);
			g.bezierCurveTo(cp2x, y - 6, cp1x, y - 78, x, y -= 84);
			g.fill();
		});
		g.restore();
	}

	function drawCapEnds(g) {
		g.save();
		g.translate(-2, 18);
		g.scale(-2, 0.80);
		drawCapEnd(g, [ 0, 0, 0, 0.4 ]);
		g.restore();
		g.save();
		g.translate(306, 18);
		g.scale(1.6, 0.80);
		drawCapEnd(g, [ 255, 255, 255, 0.35 ]);
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
		var x, y, cp1x, cp2x, fill;
		g.save();
		g.beginPath();
		g.moveTo(x = 0, y = 0);
		g.lineTo(x += 304, y);
		cp1x = x + 5;
		cp2x = x + 6;
		g.bezierCurveTo(cp1x, y + 10, cp2x, y + 78, cp2x, y += 84);
		g.bezierCurveTo(cp2x, y + 6, cp1x, y + 78, x, y += 84);
		g.lineTo(x -= 304, y);
		cp1x = x - 5;
		cp2x = x - 6;
		g.bezierCurveTo(cp1x, y - 6, cp2x, y - 78, cp2x, y -= 84);
		g.bezierCurveTo(cp2x, y - 6, cp1x, y - 78, x, y -= 84);
		fill = g.createLinearGradient(x, y, x, y + 168);
		fill.addColorStop(0, 'rgba(0, 0, 0, 0)');
		fill.addColorStop(0.2, 'rgba(0, 0, 0, 0)');
		fill.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
		g.fillStyle = fill;
		g.fill();
		g.restore();
	}

	function drawBodyHilite(g, alpha) {
		var fill, feather = new Feather(2, 306, 12, alpha);
		g.save();
		fill = g.createLinearGradient(0, 0, 0, 9);
		fill.addColorStop(0, feather.rgba(255, 255, 255, 1));
		fill.addColorStop(1, feather.rgba(255, 255, 255, 0.3));
		g.fillStyle = fill;
		feather.draw(g, function() {
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
		var fill, feather = new Feather(2, 312, 48, 0.5);
		g.save();
		g.translate(-3, 18.5);
		fill = g.createLinearGradient(0, 0, 0, 54);
		fill.addColorStop(0, feather.rgba(255, 255, 255, 1));
		fill.addColorStop(1, feather.rgba(255, 255, 255, 0.2));
		g.fillStyle = fill;
		feather.draw(g, function() {
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
		var fill, feather = new Feather(2, 312, 22, 0.4);
		g.save();
		g.translate(-2, 137);
		fill = g.createLinearGradient(0, 0, 0, 22);
		fill.addColorStop(0, feather.rgba(255, 255, 255, 0.2));
		fill.addColorStop(1, feather.rgba(255, 255, 255, 1));
		g.fillStyle = fill;
		feather.draw(g, function() {
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
		var fill, feather = new Feather(2, 304, 60, 0.2);
		g.save();
		g.translate(10, 97);
		fill = g.createLinearGradient(0, 0, 0, 60);
		fill.addColorStop(0, feather.rgba(255, 255, 255, 0.1));
		fill.addColorStop(1, feather.rgba(255, 255, 255, 1));
		g.fillStyle = fill;
		feather.draw(g, function() {
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
		drawInnerShellHilite(g);
	}

	function drawBodyForegroundHilites(g) {
		g.save();
		drawBodyHilite(g, 0.25);
		g.translate(0, 168);
		g.scale(1, -0.6);
		drawBodyHilite(g, 0.3);
		g.restore();
		g.save();
		drawUpperShellHilite(g);
		drawLowerShellHilite(g);
		g.restore();
	}

	function drawLiquidCap(g, pos) {
		var x, y, cp1x, cp2x;
		pos -= 0.5;
		g.save();
		g.translate(0, 2.5);
		g.beginPath();
		g.moveTo(x = 0, y = 0);
		cp1x = x + 10 * pos;
		cp2x = x + 12 * pos;
		g.bezierCurveTo(cp1x, y + 6, cp2x, y + 76, cp2x, y += 82);
		g.bezierCurveTo(cp2x, y + 6, cp1x, y + 76, x, y += 82);
		cp1x = x - 4 * pos;
		cp2x = x - 6 * pos;
		g.bezierCurveTo(cp1x, y - 6, cp2x, y - 76, cp2x, y -= 82);
		g.bezierCurveTo(cp2x, y - 6, cp1x, y - 76, x, y -= 82);
		g.fill();
		g.restore();
	}

	function drawLiquidGlow(g, pos, color) {
		var x, y, fill, width = pos * 304,
			split = pos > options.critical ? 1 : (options.blend ? pos / options.critical : 0),
			offset = options.glow,
			factor = Math.abs(pos - 0.5) * 2,
			feather = new Feather(offset, width + offset * 2, 168 + offset, 0.3);
		g.save();
		g.translate(-offset, 0);
		g.fillStyle = feather.rgba.apply(feather, color);
		feather.draw(g, function() {
			g.beginPath();
			g.moveTo(x = 0, y = 0);
			g.bezierCurveTo(x + 0.12 * offset, y - 0.5 * offset, x + 0.5 * offset, y - offset, x += offset + 6, y -= offset);
			g.lineTo(x += width - 12, y);
			x += 6;
			g.bezierCurveTo(x + 0.5 * offset, y, x + 0.88 * offset, y + 0.5 * offset, x += offset, y += offset);
			g.bezierCurveTo(x + 5 * factor, y + 6, x + 6 * factor, y + 76, x + 6 * factor, y += 82);
			g.bezierCurveTo(x + 6 * factor, y + 6, x + 5 * factor, y + 76, x, y += 82 + 5);
			g.lineTo(x -= width + offset * 2, y);
			g.bezierCurveTo(x - 5, y - 6, x - 6, y - 76, x - 6, y -= 82 + 5);
			g.bezierCurveTo(x - 6, y - 6, x - 5, y - 76, x, y -= 82);
			g.fill();
		});
		g.restore();
	}

	function drawLiquid(g, pos) {
		var x, y, cp1x, cp2x,
			fill,
			width = pos * 304,
			split = pos > 0.2 ? 1 : (options.blend ? pos / 0.2 : 0);
		g.save();
		drawLiquidGlow(g, pos, mix(0xff0000, 1, 0x19ff00, 1, split, true));
		g.globalCompositeOperation = 'lighter';
		g.beginPath();
		g.moveTo(x = 0, y = 2.5);
		g.lineTo(x += width, y);
		cp1x = x + 10 * (pos - 0.5);
		cp2x = x + 12 * (pos - 0.5);
		g.bezierCurveTo(cp1x, y + 6, cp2x, y + 76, cp2x, y += 82);
		g.bezierCurveTo(cp2x, y + 6, cp1x, y + 76, x, y += 82);
		g.lineTo(x -= width, y);
		cp1x = x - 5;
		cp2x = x - 6;
		g.bezierCurveTo(cp1x, y - 6, cp2x, y - 76, cp2x, y -= 82);
		g.bezierCurveTo(cp2x, y - 6, cp1x, y - 76, x, y -= 82);
		fill = g.createLinearGradient(x, y, x, y + 164);
		fill.addColorStop(0, mix(0xfe5939, 0.9, 0x79bf3a, 0.9, split));
		fill.addColorStop(0.5, mix(0xcd0000, 0.6, 0x009b01, 0.6, split));
		fill.addColorStop(1, mix(0xf16f5c, 0.6, 0x71ca3c, 0.6, split));
		g.fillStyle = fill;
		g.fill();
		g.restore();
		g.save();
		g.translate(width, 0);
		fill = g.createLinearGradient(x, y, x, y + 164);
		fill.addColorStop(0, mix(0xfe5939, 0.6, 0x79bf3a, 0, split));
		fill.addColorStop(0.5, mix(0xcd0000, 0.4, 0x009b01, 0.3, split));
		fill.addColorStop(1, mix(0xf16f5c, 0.6, 0x71ca3c, 0, split));
		g.fillStyle = fill;
		g.globalCompositeOperation = 'lighter';
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
		drawShine(g, 0.55);
		g.restore();
		g.save();
		g.translate(-12, 5);
		g.rotate(0.3);
		g.scale(1.8, 2.3);
		drawShine(g, 0.25);
		g.restore();
		g.save();
		g.translate(324, 22);
		g.rotate(-0.3);
		g.scale(1.4, 1.8);
		drawShine(g, 0.35);
		g.restore();
		g.save();
		g.translate(337.5, 55);
		g.scale(1, 1.4);
		drawShine(g, 0.35);
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
			drawBodyForegroundHilites(h);
			drawCapEnds(h);
			drawCaps(h);
			drawShines(h);
		}
		g.drawImage(cachedForeground, -50, -30);
	}

	function drawReflection(g) {
		var x = 100, y = 0,
			w = 400, h = 198,
			mask;
		g.save();
		g.scale(1, -1);
		g.translate(0, -h);
		g.drawImage(canvas, x, y, w, h, x, -h, w, h);
		mask = g.createLinearGradient(0, 0, 0, h - canvas.height);
		mask.addColorStop(0, 'rgba(255, 255, 255, 1)')
		mask.addColorStop(0.001, 'rgba(255, 255, 255, 0.5)');
		mask.addColorStop(0.05,'rgba(255, 255, 255, 0.2)');
		mask.addColorStop(1, 'rgba(255, 255, 255, 0)');
		g.fillStyle = mask;
		g.globalCompositeOperation = 'destination-in';
		g.fillRect(x, h, w, -canvas.height);
		g.restore();
	}

	function mix(color1, a1, color2, a2, pos, asArray) {
		var r1 = color1 >> 16,
			g1 = color1 >> 8 & 0xff,
			b1 = color1 & 0xff,
			r2 = color2 >> 16,
			g2 = color2 >> 8 & 0xff,
			b2 = color2 & 0xff,
			r = ~~(r1 + (r2 - r1) * pos),
			g = ~~(g1 + (g2 - g1) * pos),
			b = ~~(b1 + (b2 - b1) * pos),
			a = (a1 + (a2 - a1) * pos);
		return asArray
			? [ r, g, b, a ]
			: 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
	}

	options = (function() {
		var k, defaultOptions = {
			glow: 12,
			blend: false,
			critical: 0.2,
			fps: 40,
			// stolen from MooTools
			transition: (function() {
				function expo(p) {
					return Math.pow(2, 8 * (p - 1));
				}
				return function(p) {
					return p <= 0.5 ? expo(2 * p) / 2 : (2 - expo(2 * (1 - p))) / 2;
				};
			})()
		};
		if (options) for (k in options) {
			if (options.hasOwnProperty(k)) {
				defaultOptions[k] = options[k];
			}
		}
		return defaultOptions;
	})();

	var at = 0, interval,
		cachedBackground, cachedForeground,
		api = this, supported = !!(canvas && canvas.getContext);

	api.animate = function(to, time) {
		if (!supported) return api;
		var fps = options.fps, transition = options.transition,
			from = at, step = 0, steps = time / 1000 * fps;
		clearInterval(interval);
		interval = setInterval(function() {
			canvas.width = canvas.width;
			api.set(from + (to - from) * transition(step / steps));
			if (++step > steps) clearInterval(interval);
		}, 1000 / fps);
		return api;
	};

	api.set = function(to) {
		if (!supported) return api;
		var g = canvas.getContext('2d');
		at = to;
		g.save();
		g.translate(138, 30);
		drawBackground(g);
		drawLiquid(g, 0.05 + to * 0.95);
		drawForeground(g);
		g.restore();
		drawReflection(g);
		return api;
	};

};