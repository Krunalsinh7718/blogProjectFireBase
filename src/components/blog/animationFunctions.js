let angleTools = {
  getAngle: function (t, n) {
    const a = n.x - t.x,
      e = n.y - t.y;
    return Math.atan2(e, a) / Math.PI * 180
  },
  getDistance: function (t, n) {
    const a = t.x - n.x,
      e = t.y - n.y;
    return Math.sqrt(a * a + e * e)
  },
  getAnglePos: function (x, y, angle, distance, fromDistance) {
    const newx = distance * Math.cos(angle * Math.PI / 180);
    const newy = distance * Math.sin(angle * Math.PI / 180);
    const destx = fromDistance * Math.cos(angle * Math.PI / 180);
    const desty = fromDistance * Math.sin(angle * Math.PI / 180);
    return { x: x + newx, y: y + newy, dx: x + newx + destx, dy: y + newy + desty };
  },
  moveOnAngleLine: function (particle, distance, distanceEp) {
    const a = this.getOneFrameDistance(particle, distance);
    particle.sp.x += a.x;
    particle.sp.y += a.y;

    const b = this.getOneFrameDistance(particle, distanceEp);
    particle.sp.dx += b.x;
    particle.sp.dy += b.y;
  },
  moveOnAngle: function (t, n) {
    const a = this.getOneFrameDistance(t, n);
    t.x += a.x, t.y += a.y
  },
  getOneFrameDistance: function (t, n) {
    return { x: n * Math.cos(t.rotation * Math.PI / 180), y: n * Math.sin(t.rotation * Math.PI / 180) }
  }
};

function r(a, b, c) {
  return parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));
}
function drawHeart(ctx, fromx, fromy, tox, toy, lw, hlen, color) {

  var x = fromx;
  var y = fromy;
  var width = lw;
  var height = hlen;

  ctx.save();
  ctx.beginPath();
  var topCurveHeight = height * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  // top left curve
  ctx.bezierCurveTo(
    x, y,
    x - width / 2, y,
    x - width / 2, y + topCurveHeight
  );

  // bottom left curve
  ctx.bezierCurveTo(
    x - width / 2, y + (height + topCurveHeight) / 2,
    x, y + (height + topCurveHeight) / 2,
    x, y + height
  );

  // bottom right curve
  ctx.bezierCurveTo(
    x, y + (height + topCurveHeight) / 2,
    x + width / 2, y + (height + topCurveHeight) / 2,
    x + width / 2, y + topCurveHeight
  );

  // top right curve
  ctx.bezierCurveTo(
    x + width / 2, y,
    x, y,
    x, y + topCurveHeight
  );

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();

}

function explode1(e) {
  console.log("function called");
  //element required position
  const x = e.clientX;
  const y = e.clientY;

  //canvas element
  const canvasEl1 = document.createElement('canvas');
  const ctx1 = canvasEl1.getContext('2d');
  document.body.appendChild(canvasEl1);

  canvasEl1.style.position = 'fixed';
  canvasEl1.style.left = (x - 100) + 'px';
  canvasEl1.style.top = (y - 100) + 'px';
  canvasEl1.style.pointerEvents = "none";
  canvasEl1.height = 200;
  canvasEl1.width = 200;

  //particles
  let particles1 = [];
  function Particle1() {
    return {
      x: canvasEl1.width/2,
      y: canvasEl1.height/2,
      rotation: r(0, 360, true),
      speed: 4,
      color: ['#e84118', '#c23616', '#d63031', '#ff7675'][Math.floor(Math.random() * 3) + 1],
      opacity: r(0, 0.5, true),
      radius: 8,
      friction: Math.random() > 0.5 ? 0.95 : 0.9,
      yVel: 0,
      gravity: 0
    }
  }

  for (var i = 0; i < 15; i++) {
    particles1.push(Particle1());
  }
  //render animation
  function render1() {
    ctx1.clearRect(0, 0, 200, 200);
    particles1.forEach(function (e, i) {
      angleTools.moveOnAngle(e, e.speed);
      e.opacity -= 0.025;
      e.speed *= e.friction;
      e.radius *= e.friction;

      e.yVel += e.gravity;
      e.y += e.yVel;

      if (e.opacity < 0) return;
      if (e.radius < 0) return;
      ctx1.globalAlpha = e.opacity;
      drawHeart(ctx1, e.x, e.y, 0 , 0, 10, 10, e.color);
    });
  }
  let animationLoop;
  function renderLoop() {
    animationLoop = requestAnimationFrame(renderLoop);
    render1();
  }

  const animationTimeOut = setTimeout(function () {
    document.body.removeChild(canvasEl1);
    cancelAnimationFrame(animationLoop);
    clearTimeout(animationTimeOut);
  }, 500)

  renderLoop();

}

export { explode1 };