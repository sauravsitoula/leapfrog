function Box(parentElement) {
    this.x = 10;
    this.y = 10;
    this.dx = 1;
    this.dy = 1;
    this.width = 20;
    this.height = 20;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;

    this.init = function() {
        var box = document.createElement('div');
        box.style.height = this.height + 'px';
        box.style.width = this.width + 'px';
        box.classList.add('box');
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = this.boxClicked.bind(this);

        return this;
    };

    this.uniqueCollisionDetector = function(box2) {
        var a = Math.abs(this.x - (box2.x + box2.width));
        var b = Math.abs(this.x + box2.width - box2.x);
        var c = Math.abs(this.y - (box2.y + box2.height));
        var d = Math.abs(this.y + this.height - box2.y);

        if (Math.ceil(Math.min(a, b)) < Math.ceil(Math.min(c, d))) {
            this.dx = -this.dx;
        } else {
            this.dy = -this.dy;
        }

    };

    this.overlap = function(box2) {
        if (
            this.x < box2.x + box2.width &&
            this.x + box2.width > box2.x &&
            this.y < box2.y + box2.height &&
            this.y + this.height > box2.y
        ) {
            return true;
        }
        return false;
    };

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    this.boxClicked = function() {
        this.element.style = 'display: none';
    };

    this.draw = function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    };

    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.detectCollision = function(boxes) {
        var boxIndex = boxes.indexOf(this);
        var currentBox = this;
        for (var i = 0; i < boxes.length; i++) {
            if (i === boxIndex) {
                continue;
            }
            var otherBox = boxes[i];

            var sideCollision =
                currentBox.x < 0 ||
                currentBox.x > currentBox.parentElement.clientWidth - currentBox.width;
            var topOrBottomCollision =
                currentBox.y < 0 ||
                currentBox.y >
                currentBox.parentElement.clientHeight - currentBox.height;
            var boxCollision = currentBox.overlap(boxes[i]);
            if (boxCollision) {
                currentBox.uniqueCollisionDetector(boxes[i]);
            }
            if (sideCollision) {
                this.dx = this.dx * -1;
            }
            if (topOrBottomCollision) {
                this.dy = this.dy * -1;
            }
        }
    };
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Game(parentElement, boxCount) {
    var boxes = [];
    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500;
    var self = this;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 20;

    this.checkOverlap = function(boxDiv) {
        var boxIndex = boxes.indexOf(boxDiv);
        for (var i = 0; i < boxes.length; i++) {
            if (i == boxIndex) {
                continue;
            }
            box2 = boxes[i];
            if (boxDiv.overlap(box2)) {
                return true;
            }
        }
        return false;
    };

    this.startGame = function() {
        for (var i = 0; i < this.boxCount; i++) {
            var boxDiv = new Box(this.parentElement).init();
            do {
                var xPos = getRandomArbitrary(0, MAX_WIDTH - boxDiv.width);
                var yPos = getRandomArbitrary(0, MAX_HEIGHT - boxDiv.height);
                boxDiv.setPosition(xPos, yPos);
            } while (this.checkOverlap(boxDiv));
            boxDiv.draw();
            boxes.push(boxDiv);
        }
        setInterval(this.moveBoxes.bind(this), 30);
    };
    this.moveBoxes = function() {
        var displayChecker = false;
        for (var i = 0; i < this.boxCount; i++) {
            boxes[i].move();
            boxes[i].detectCollision(boxes);
            if (getComputedStyle(boxes[i].element).display == 'block') {
                displayChecker = displayChecker || true;
            }

        }
        if (displayChecker == false) {
            congratulation.style.display = 'block';
            resetGame.style.display = 'block';
            console.log('show data')
        }
    }
};


var resetGame = document.getElementById('resetButton');
var congratulation = document.getElementById("gameOverMessage");
congratulation.style.display = 'none';
resetGame.style.display = 'none';

resetGame.addEventListener("click", function() {
    window.location.reload()
})

function testFunc() {
    console.log("the game is reset")
}

var parentElement = Array.from(document.getElementsByClassName('app'));
parentElement.forEach(function(item, index) {
    new Game(item, 10).startGame();
});