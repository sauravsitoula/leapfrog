var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var phase = 0;
var speed = 0.04;
var maxCircleRadius = 8;
var frameCount = 0;
var rows = 10;
var colums = 10;
var numStrands = 2;
var y;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var colOffset = 0;
    frameCount++;
    phase = frameCount * speed;

    for (var count = 0; count < numStrands; count++) {
        if (count === 0) {
            var strandPhase = phase;
        } else {
            var strandPhase = phase + count * Math.PI;
        }
        var x = 0;
        for (var col = 0; col < colums; col++) {
            x = x + 30;
            colOffset = (col * 2 * Math.PI) / 10;

            for (var row = 0; row < rows; row += 1) {
                var y = canvas.height / 2 + row * 10 + Math.sin(strandPhase + colOffset) * 50;
                var sizeOffset = (Math.cos(strandPhase - (row * 0.1) + colOffset) + 1) * 0.5;
                var circleRadius = sizeOffset * maxCircleRadius;

                ctx.beginPath();
                ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false);
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

setInterval(draw, 20);