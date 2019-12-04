function Game(parentElement, index) {
    var self = this;
    var bird = null;
    var pipeTop = null;
    var pipeBottom = null;
    var pipes = [];
    var game_loop = null;
    var birdJump = false;
    var counter = 0;
    var accelaration = 0;
    var accelarationValue = 9.8;
    var bird_position = null;
    var pipeSpeed = 3;
    var topHeight = null;
    var score = 0;
    this.startGame = function() {
        bird = new Bird(parentElement).createBird();
        bird_position = bird.y;
        document.addEventListener("keydown", self.keyDownHandler);
        game_loop = setInterval(self.gameLoop, 17);
    };
    this.keyDownHandler = function(event) {
        if (index == 0 && event.keyCode == 87) {
            birdJump = true;
        }
        if (event.keyCode == 38 && index == 1) {
            birdJump = true;
        }
    };
    this.movePipe = function() {
        for (var i = 0; i < pipes.length; i++) {
            pipes[i].setPipePosition(pipeSpeed);
        }
    };
    this.setPipeHeight = function(pipe) {
        if (pipe.type == "top") {
            topHeight = Math.floor(Math.random() * 320) + 100;
            pipe.setPipeHeight(topHeight);
        } else if ((pipe.type = "bottom")) {
            pipe.setPipeHeight(660 - topHeight - 180);
        }
    };
    this.detectCollision = function() {
        for (var i = 0; i < pipes.length; i++) {
            if (
                (bird.x + bird.width < pipes[i].x ||
                    bird.x > pipes[i].x + pipes[i].width ||
                    bird.y + bird.height < pipes[i].y ||
                    bird.y > pipes[i].y + pipes[i].height) &&
                (bird.y + bird.height < bird.lowBound - 10)
            ) {} else {
                clearInterval(game_loop);
                if (window.localStorage.getItem("flappy_bird_high_score") * 1 < score) {
                    window.localStorage.setItem("flappy_bird_high_score", score + "");
                }
                var highScore = window.localStorage.getItem("flappy_bird_high_score");
                var restart = document.createElement("div");
                restart.classList.add('dynamic');
                restart.setAttribute(
                    "style",
                    "position: relative; height: 100%; width: 100%"
                );
                var scoreBoard = document.createElement("div");
                var restartButton = document.createElement("div");
                scoreBoard.setAttribute(
                    "style",
                    "position: absolute;left: 226px; top: 154px; height: 230px; width: 172px; background-image: url(./images/score.png); line-height:87px; color: red; font-size: 30px; font-weight: bold;"
                );
                scoreBoard.innerHTML =
                    '<p style="position: absolute; left: 76px; top: 10px">' +
                    score +
                    "<br/>" +
                    highScore +
                    "</p>";
                restartButton.setAttribute(
                    "style",
                    "position: absolute;left: 204px; top: 400px; height: 72px; width: 214px; background-image: url(./images/restart.png); cursor: pointer;"
                );
                parentElement.appendChild(restart);
                restart.appendChild(scoreBoard);
                restart.appendChild(restartButton);
                restartButton.addEventListener("click", self.clearDom);
            }
        }
    };
    this.computeScore = function() {
        for (var i = 0; i < pipes.length; i++) {
            if (pipes[i].x < -100) {
                self.removePipe(pipes[i], i);
            }
            if (pipes[i].x < 170 && pipes[i].x > 170 - pipeSpeed) {
                score = score + 0.5;
            }
        }
    };
    this.removePipe = function(pipe, index) {
        parentElement.removeChild(pipe.element);
        pipes.splice(index, 1);
    };
    this.clearDom = function() {
        var toRemove = Array.from(document.getElementsByClassName("dynamic"));
        for (var i = 0; i < toRemove.length; i++) {
            if (toRemove[i].parentNode == parentElement) {
                parentElement.removeChild(toRemove[i]);
            }
        }
        pipes = [];
        birdJump = false;
        counter = 0;
        accelaration = 0;
        accelarationValue = 9.8;
        bird_position = null;
        topHeight = null;
        score = 0;
        bird = null;
        self.startGame();
    };
    this.gameLoop = function() {
        counter++;
        if (counter % 180 == 0) {
            pipeTop = new Pipe_Top(parentElement).createPipe();
            self.setPipeHeight(pipeTop);
            pipeBottom = new Pipe_Bottom(parentElement).createPipe();
            self.setPipeHeight(pipeBottom);
            pipes.push(pipeTop);
            pipes.push(pipeBottom);
        }
        self.movePipe();

        if (counter % 4 == 0) {
            accelaration += 1;
            if (bird_position <= bird.lowBound - bird.height) {
                accelarationValue = Math.floor(accelaration);
            }
        }
        if (birdJump == true) {
            accelaration = 0;
            accelarationValue = 1;
            bird_position -= 80;
            bird.setBirdPosition(bird_position);
            birdJump = false;
        }
        if (bird_position <= bird.lowBound - bird.height) {
            bird_position = bird_position + accelarationValue;
            bird.setBirdPosition(bird_position);
        }
        self.detectCollision();
        self.computeScore();
    };
}

if (window.localStorage.getItem("flappy_bird_high_score") == null) {
    window.localStorage.setItem("flappy_bird_high_score", "0");
}
var container = Array.from(document.getElementsByClassName("container"));
container.forEach(function(item, index) {
    item.style.display = 'none';
});


var body = document.getElementsByTagName('body')[0];
var loadingScreen = document.createElement('div');
loadingScreen.setAttribute('style', 'width: 650px; height: 700px; background: red; position: relative');
body.appendChild(loadingScreen);
var start = document.createElement('div');
start.setAttribute('style', 'cursor:pointer;height:45px; width: 115px; color: blue; position: absolute; top: 226px; left: 230px; font-size: 35px; font-weight: bold; background: yellow');
start.innerHTML = 'START';
var userGuide = document.createElement('div');
userGuide.setAttribute('style', 'height: 100px; width: 300px; position: absolute; font-size: 30px; color: green; background: orange; font-weight: bold; line-height: 34px; text-align: center; top: 411px; left: 134px');
userGuide.innerHTML = 'use "w" or "up" arrow key to jump bird and cross the poles.';
var gameName = document.createElement('div');
gameName.setAttribute('style', 'position: absolute; width: 178px; height: 98px; font-size: 45px; color: purple; background: orange; top: 40px; left: 200px; font-weight: bold; text-align: center');
gameName.innerHTML = 'FLAPPY BIRD';
loadingScreen.appendChild(gameName)
loadingScreen.appendChild(start);
loadingScreen.appendChild(userGuide);
start.addEventListener('click', function(item, index) {
    body.removeChild(loadingScreen);
    container.forEach(function(item, index) {
        item.style.display = "block";
        item.style.backgroundImage = "url(./images/background.png)";
        if (index == 0) {
            item.style.marginLeft = "100px";
            new Game(item, index).startGame();
        }
        if (index == 1) {
            item.style.marginLeft = "900px";
            new Game(item, index).startGame();
        }
    });
})