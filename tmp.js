function(a, c, b) {
    if (c) {
        b = x(b);
        a.save();
        var d = a.canvas, e = 0; c = q(c);
        for (var f = c.next(); !f.done; f = c.next())if (f = f.value, void 0 !== f && (void 0 === f.visibility || f.visibility > b.visibilityMin)) { a.fillStyle = y(b.fillColor, { index: e, from: f }); a.strokeStyle = y(b.color, { index: e, from: f }); a.lineWidth = y(b.lineWidth, { index: e, from: f }); var g = new Path2D; g.arc(f.x * d.width, f.y * d.height, y(b.radius, { index: e, from: f }), 0, 2 * Math.PI); a.fill(g); a.stroke(g); ++e } a.restore()
    }
});
v("drawConnectors", function (a, c, b, d) { if (c && b) { d = x(d); a.save(); var e = a.canvas, f = 0; b = q(b); for (var g = b.next(); !g.done; g = b.next()) { var k = g.value; a.beginPath(); g = c[k[0]]; k = c[k[1]]; g && k && (void 0 === g.visibility || g.visibility > d.visibilityMin) && (void 0 === k.visibility || k.visibility > d.visibilityMin) && (a.strokeStyle = y(d.color, { index: f, from: g, to: k }), a.lineWidth = y(d.lineWidth, { index: f, from: g, to: k }), a.moveTo(g.x * e.width, g.y * e.height), a.lineTo(k.x * e.width, k.y * e.height)); ++f; a.stroke() } a.restore() } });
v("drawRectangle", function (a, c, b) { b = x(b); a.save(); var d = a.canvas; a.beginPath(); a.lineWidth = y(b.lineWidth, {}); a.strokeStyle = y(b.color, {}); a.fillStyle = y(b.fillColor, {}); a.translate(c.xCenter * d.width, c.yCenter * d.height); a.rotate(c.rotation * Math.PI / 180); a.rect(-c.width / 2 * d.width, -c.height / 2 * d.height, c.width * d.width, c.height * d.height); a.translate(-c.xCenter * d.width, -c.yCenter * d.height); a.stroke(); a.fill(); a.restore() }); v("lerp", function (a, c, b, d, e) { return z(d * (1 - (a - c) / (b - c)) + e * (1 - (b - a) / (b - c)), d, e) });}).call(this);