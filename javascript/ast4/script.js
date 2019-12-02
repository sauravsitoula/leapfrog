var LANE = {
    lane_1: {
        lane_number: 1,
        beginning: 36,
        end: 186
    },
    lane_2: {
        lane_number: 2,
        beginning: 191,
        end: 341
    },
    lane_3: {
        lane_number: 3,
        beginning: 346,
        end: 496
    }
};
var restart = null;

var DISTANCE_FROM_LANE = 50;

function PlayerCar(parentElement) {
    this.x = 0;
    this.y = 585;
    this.lane = null;
    this.element = null;
    this.parentElement = parentElement;
    this.initCar = function() {
        var car = document.createElement("div");
        car.setAttribute("class", "player-car-container");
        car.setAttribute(
            "style",
            "height: 88px; width: 49px; position: absolute; top: 585px"
        );
        this.lane = LANE.lane_2;
        this.parentElement.appendChild(car);
        this.element = car;
        return this;
    };

    this.changePositionAnimate = function(nextPosition, x) {
        if (nextPosition == "left" && this.lane.lane_number == 1) {
            return "lane changed";
        }
        if (nextPosition == "left" && this.lane.lane_number == 2) {
            if (x >= LANE.lane_1.beginning + DISTANCE_FROM_LANE) {
                this.x = x;
                this.drawCar();
            } else {
                this.updateLane();
                return "lane changed";
            }
        }
        if (nextPosition == "left" && this.lane.lane_number == 3) {
            if (x >= LANE.lane_2.beginning + DISTANCE_FROM_LANE) {
                this.x = x;
                this.drawCar();
            } else {
                this.updateLane();
                return "lane changed";
            }
        }
        if (nextPosition == "right" && this.lane.lane_number == 3) {
            return "lane changed";
        }
        if (nextPosition == "right" && this.lane.lane_number == 2) {
            if (x <= LANE.lane_3.beginning + DISTANCE_FROM_LANE) {
                this.x = x;
                this.drawCar();
            } else {
                this.updateLane();
                return "lane changed";
            }
        }
        if (nextPosition == "right" && this.lane.lane_number == 1) {
            if (x <= LANE.lane_2.beginning + DISTANCE_FROM_LANE) {
                this.x = x;
                this.drawCar();
            } else {
                this.updateLane();
                return "lane changed";
            }
        }
    };

    this.updateLane = function() {
        if (this.x < LANE.lane_2.beginning) {
            this.lane = LANE.lane_1;
        }
        if (this.x > LANE.lane_2.beginning && this.x < LANE.lane_3.beginning) {
            this.lane = LANE.lane_2;
        }
        if (this.x > LANE.lane_3.beginning) {
            this.lane = LANE.lane_3;
        }
    };

    this.setPosition = function() {
        this.x = this.lane.beginning + DISTANCE_FROM_LANE;
        this.drawCar();
    };
    this.drawCar = function() {
        this.element.style.left = this.x + "px";
    };
    this.removeCar = function() {
        this.parentElement.removeChild(this.element);
    };
}

function GeneratedCar(parentElement) {
    this.x = 0;
    this.y = -88;
    this.lane = null;
    this.element = null;
    this.parentElement = parentElement;
    this.initCar = function() {
        var car = document.createElement("div");
        car.setAttribute("class", "generated-car-container");
        car.setAttribute("style", "height: 88px; width: 49px; position: absolute;");
        this.parentElement.appendChild(car);
        this.element = car;
        return this;
    };
    this.spawnCar = function() {
        var laneNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        if (laneNumber == 1) {
            this.lane = LANE.lane_1;
            this.x = this.lane.beginning + DISTANCE_FROM_LANE;
        }
        if (laneNumber == 2) {
            this.lane = LANE.lane_2;
            this.x = this.lane.beginning + DISTANCE_FROM_LANE;
        }
        if (laneNumber == 3) {
            this.lane = LANE.lane_3;
            this.x = this.lane.beginning + DISTANCE_FROM_LANE;
        }
        this.drawCar();
    };
    this.moveCar = function(speed) {
        this.y = this.y + speed;
        this.drawCar();
    };
    this.drawCar = function() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    };
    this.removeCar = function() {

        this.parentElement.removeChild(this.element);
    };
}

function Game(parentElement) {
    var self = this;
    var leftKeyPressed = false;
    var rightKeyPressed = false;
    var controlledCar = null;
    var laneChangeFlag = null;
    var generatedCars = [];
    var x = null;
    var counter = 0;
    var generatedCarSpeed = 0;
    var spawnRate = 0;
    var score = 0;
    var game_loop = null;
    var scoreBoard = null;
    var collisionScoreBoard = null;
    var road = null;
    var restart = null;
    var restartButton = null;
    var roadStartingPostion = -1408;
    var highScore = 0;
    var highScoreAchieved = false;
    var congratulation = null;
    var gameOver = null;
    var generatedCar = null;
    var gameLevel = {
        level1: {
            speed: 5,
            rateOfSpawn: 46
        },
        level2: {
            speed: 7,
            rateOfSpawn: 34
        },
        level3: {
            speed: 8,
            rateOfSpawn: 30
        },
        level4: {
            speed: 10,
            rateOfSpawn: 22
        },
        level5: {
            speed: 12,
            rateOfSpawn: 20
        }
    };
    this.startGame = function() {
        restart = document.createElement('div');
        parentElement.appendChild(restart);
        restart.setAttribute('style', 'position: absolute; height: 100%; width: 100%; top:0px; z-index: 200');
        restart.style.background = "rgba(0,0,100,0.7)";
        restart.classList.add('dynamic')
        restart.style.display = 'none';
        road = parentElement.children[0];
        road.style.top = -840 + 'px';
        controlledCar = new PlayerCar(parentElement).initCar();
        controlledCar.setPosition();
        scoreBoard = document.createElement('div');
        scoreBoard.innerHTML = '0';
        scoreBoard.classList.add('dynamic')
        scoreBoard.setAttribute('style', 'font-family: "Montserrat", sans-serif;position: absolute; top: 0px; left: 400px; font-size: 50px; color: white;z-index: 100');
        parentElement.appendChild(scoreBoard);
        document.addEventListener("keydown", self.keyDownHandler);
        game_loop = setInterval(this.gameLoop, 17);
    };
    this.clearDom = function() {
        var toRemove = Array.from(parentElement.getElementsByClassName('dynamic'));
        for (var i = 0; i < toRemove.length; i++) {
            parentElement.removeChild(toRemove[i]);
        }
        for (var i = 0; i < generatedCars.length; i++) {
            generatedCars[i].removeCar();
        }
        controlledCar.removeCar();
        toRemove = [];
        leftKeyPressed = false;
        rightKeyPressed = false;
        controlledCar = null;
        laneChangeFlag = null;
        generatedCars = [];
        x = null;
        counter = 0;
        generatedCarSpeed = 0;
        spawnRate = 0;
        score = 0;
        game_loop = null;
        scoreBoard = null;
        collisionScoreBoard = null;
        road = null;
        restart = null;
        restartButton = null;
        roadStartingPostion = -1408;
        gameOver = null;
        generatedCar = null;
        highScoreAchieved = false;
        congratulation = null;
        self.startGame();

    }
    this.keyDownHandler = function(event) {
        if ((event.keyCode == 37 || event.keyCode == 65) && rightKeyPressed == false) {
            leftKeyPressed = true;
        }
        if ((event.keyCode == 39 || event.keyCode == 68) && leftKeyPressed == false) {
            rightKeyPressed = true;
        }
    };
    this.collisionDetector = function() {
        for (var i = 0; i < generatedCars.length; i++) {

            if (

                (controlledCar.x + controlledCar.element.clientWidth < generatedCars[i].x || controlledCar.x > generatedCars[i].x + generatedCars[i].element.clientWidth || generatedCars[i].y > controlledCar.y + controlledCar.element.clientHeight || generatedCars[i].y + generatedCars[i].element.clientHeight < controlledCar.y)
            ) {
                return false;
            } else {
                return generatedCars[i];
            }
        }
    };
    this.gameLoop = function() {
        counter = counter + 1;
        if (roadStartingPostion >= -14) {
            roadStartingPostion = -1408;
        }
        road.style.top = (generatedCarSpeed + roadStartingPostion) + 'px';
        roadStartingPostion = generatedCarSpeed + roadStartingPostion;
        if (score <= 10) {
            generatedCarSpeed = gameLevel.level1.speed;
            spawnRate = gameLevel.level1.rateOfSpawn;
        } else if (score <= 25) {
            generatedCarSpeed = gameLevel.level2.speed;
            spawnRate = gameLevel.level2.rateOfSpawn;
        } else if (score <= 50) {
            generatedCarSpeed = gameLevel.level3.speed;
            spawnRate = gameLevel.level3.rateOfSpawn;
        } else if (score <= 100) {
            generatedCarSpeed = gameLevel.level4.speed;
            spawnRate = gameLevel.level4.rateOfSpawn;
        } else {
            generatedCarSpeed = gameLevel.level5.speed;
            spawnRate = gameLevel.level5.rateOfSpawn;
        }
        if (leftKeyPressed == true && rightKeyPressed == false) {
            x = controlledCar.x;
            laneChangeFlag = controlledCar.changePositionAnimate(
                "left",
                (x = x - 31)
            );
        }
        if (rightKeyPressed == true && leftKeyPressed == false) {
            x = controlledCar.x;
            laneChangeFlag = controlledCar.changePositionAnimate(
                "right",
                (x = x + 31)
            );
        }
        if (laneChangeFlag == "lane changed") {
            leftKeyPressed = false;
            rightKeyPressed = false;
            x = controlledCar.x;
        }
        if (leftKeyPressed == false || rightKeyPressed == false) {
            laneChangeFlag = null;
        }
        if (counter % spawnRate == 0) {

            generatedCar = new GeneratedCar(parentElement).initCar();
            generatedCar.spawnCar();
            generatedCars.push(generatedCar);

        }

        for (var i = 0; i < generatedCars.length; i++) {
            generatedCars[i].moveCar(generatedCarSpeed);
            if (generatedCars[i].y > 720) {
                generatedCars[i].removeCar();
                generatedCars.splice(i, 1);
            }
            if (
                generatedCars[i].y > 673 &&
                generatedCars[i].y < 673 + generatedCarSpeed
            ) {
                score = score + 1;
            }
        }
        var collision = self.collisionDetector(generatedCars[i]);
        if (collision !== false && collision !== undefined) {
            clearInterval(game_loop);
            var boom = document.createElement('div');
            parentElement.appendChild(boom);
            boom.classList.add('dynamic');
            boom.style.background = 'url(./images/boom.png)';
            boom.style.position = 'absolute'
            boom.style.top = collision.y + 'px';
            boom.style.left = collision.x + 'px';
            boom.style.height = '90px'
            boom.style.width = '121px';
            if (highScore < score) {
                highScore = score;
                highScoreAchieved = true;
            }
            setTimeout(function() {
                restart.style.display = 'block';
                restartButton = document.createElement('div');
                restartButton.setAttribute('style', 'height: 100px; width: 100px; background-image: url(./images/redo-image.svg);cursor: pointer; margin-top: 310px; margin-left: 40%; font-size:30px; z-index: 200;position: absolute');
                restart.appendChild(restartButton);
                restartButton.addEventListener('click', self.clearDom);
                gameOver = document.createElement('div');
                gameOver.setAttribute('style', 'height: 100px; width: auto; color: white; margin-top: 100px;margin-left:23%; font-family: "Montserrat", sans-serif; font-size: 45px;z-index: 200; position: absolute; text-transform: uppercase');
                gameOver.innerHTML = 'game over';
                restart.appendChild(gameOver);
                collisionScoreBoard = document.createElement('div');
                collisionScoreBoard.setAttribute('style', 'height: 100px; width: 150px; color: white; margin-top: 200px;margin-left:38%; font-family: "Montserrat", sans-serif; font-size: 25px;z-index: 200; position: absolute; text-transform: uppercase');
                collisionScoreBoard.innerHTML = 'score: ' + score + '<br/>best: ' + highScore;
                restart.appendChild(collisionScoreBoard);
                if (highScoreAchieved) {
                    congratulation = document.createElement('div');
                    congratulation.setAttribute('style', 'height: auto; width: auto; color: white; font-size: 45px; text-align: center; font-family: "Montserrat", sans-serif; z-index: 200; position: absolute; text-transform: uppercase; margin-top: 460px');
                    congratulation.innerHTML = 'congratulation <br/> high score achieved.';
                    restart.appendChild(congratulation);
                }
            }, 500)
        }
        scoreBoard.innerHTML = score + '';
    };
}
var container = Array.from(document.getElementsByClassName("container"));
container.forEach(function(item, index) {
    item.style.display = 'none';
})
var loadingScreen = document.createElement('div');
var body = document.getElementsByTagName('body')[0];
loadingScreen.setAttribute('style', 'width: 33.25em; height: 720px; background-image: url(./images/initial-image.png); position: absolute; top: 0px; left: 502px; margin: 0 auto;')
body.appendChild(loadingScreen);
var loadingScreenBackground = document.createElement('div');
loadingScreenBackground.setAttribute('style', 'height: 100%; width: 100%; background-color: rgba(0,0,100,0.7);')
loadingScreen.appendChild(loadingScreenBackground);
var startButton = document.createElement('div');
startButton.setAttribute('style', 'height: 120px; width: 105px; margin: 0 auto; position: absolute; top: 245px; left: 40%; background-image: url(./images/play-image.svg); cursor: pointer')
var gameName = document.createElement('div');
gameName.innerHTML = 'car lane game';
gameName.setAttribute('style', 'color: white; font-family: "Montserrat", sans-serif; text-align: center; text-transform: uppercase; font-size: 35px; position: absolute; top: 85px; left: 20%');
loadingScreen.appendChild(gameName);
loadingScreen.appendChild(startButton);
var userGuide = document.createElement('div');
userGuide.setAttribute('style', 'color: white; font-family: "Montserrat", sans-serif; text-align: center; font-size: 25px; position: absolute; top: 490px; line-height: 38px; margin-left: 33px; margin-right: 35px');
userGuide.innerHTML = 'use "left" / "right" arrow keys or "a" / "w" keys to navigate your car around other cars.'
loadingScreen.appendChild(userGuide);
startButton.addEventListener('click', function() {
    body.removeChild(loadingScreen);
    container.forEach(function(item, index) {
        item.style.display = 'block'
        new Game(item).startGame();
    });
})