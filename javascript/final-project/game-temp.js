function Game(parentElement) {
    var self = this;
    var waveNumber = null;
    var createNewWave = false;
    var level_for_road = null;
    var level = 1;
    var road_map = null;
    var towers = [];
    var buildingArea = [];
    var characters = [];
    var charactersStatus = [];
    var slowedCharacters = [];
    var foxes = [];
    var wizards = [];
    var vikings = [];
    var goblins = [];
    var points = 1000;
    var numberLeftToLoose = 5;
    var game_loop = null;
    var setTimeOutTest = 0;
    var selectTower = null;
    var weapons = [];
    var detectedEnemyIndex = null;
    var gamePoints = null;
    var leftToLoose = null;
    var wave = {
        wave_1: {
            animal: "fox",
            amount: 8
        },
        wave_2: {
            animal: "goblin",
            amount: 12
        },
        wave_3: {
            animal: "goblin",
            amount: 25
        },
        wave_4: {
            animal: "viking",
            amount: 15
        }
    };
    this.startGame = function(start_level) {
        if (start_level) {
            console.log('start_level', start_level)
            level = start_level;
        }
        waveNumber = 1;
        if (level == 1) {
            var tower = gameData.level_1.tower;
            for (var i = 0; i < tower.towerNumber; i++) {
                var building = new Building_Area(
                    parentElement,
                    tower.towerCoordinates[i][0],
                    tower.towerCoordinates[i][1]
                ).BuildTower();
                buildingArea.push(building);
            }
            road_map = points_changes.level_1;
            parentElement.style.backgroundImage = "url(./images/resize.png)";
        } else if (level == 2) {
            var tower = gameData.level_2.tower;
            for (var i = 0; i < tower.towerNumber; i++) {
                var building = new Building_Area(
                    parentElement,
                    tower.towerCoordinates[i][0],
                    tower.towerCoordinates[i][1]
                ).BuildTower();
                buildingArea.push(building);
            }
            road_map = points_changes.level_2;
            parentElement.style.backgroundImage = "url(./images/resize.png)";
        } else if (level == 3) {
            var tower = gameData.level_3.tower;
            for (var i = 0; i < tower.towerNumber; i++) {
                var building = new Building_Area(
                    parentElement,
                    tower.towerCoordinates[i][0],
                    tower.towerCoordinates[i][1]
                ).BuildTower();
                buildingArea.push(building);
            }
            road_map = points_changes.level_3;
            parentElement.style.backgroundImage = "url(./images/resize.png)";
        }
        if (waveNumber == 1) {
            for (var i = 0; i < wave.wave_1.amount; i++) {
                self.createFox(i);
            }
        }
        buildingArea.forEach(function(item, index) {
            item.element.addEventListener(
                "click",
                self.createSelectTower.bind(this, item.x, item.y, index)
            );
        });
        document.addEventListener("keydown", function(event) {
            if (event.keyCode == 32) {
                clearInterval(game_loop);
            }
        });
        var gameBoard = document.createElement('div');
        gameBoard.setAttribute('style', 'position: relative; width: 200px; height: 50px; top: 10px; left: 10px; background: darkgreen; border-radius: 14%; font-weight: bold; font-size: 18px');
        gameBoard.classList.add('dynamic');
        parentElement.appendChild(gameBoard);
        gamePoints = document.createElement('div');
        leftToLoose = document.createElement('div');
        gamePoints.setAttribute('style', 'width: 105px; height: auto; position: absolute; top: 25%; left: 18px;');
        gamePoints.innerHTML = 'Points: ' + points;
        gameBoard.appendChild(gamePoints);
        leftToLoose.setAttribute('style', 'width: 70px; height: auto; position: absolute; top: 25%; left: 125px;');
        leftToLoose.innerHTML = 'left: ' + numberLeftToLoose;
        gameBoard.appendChild(leftToLoose);

        game_loop = setInterval(self.gameLoop, 20);
    };
    this.createSelectTower = function(x, y, index) {
        if (selectTower != null) {
            parentElement.removeChild(selectTower);
        }
        selectTower = document.createElement("div");
        var selectArcher = document.createElement("div");
        var selectCannon = document.createElement("div");
        var selectIce = document.createElement("div");
        var selectMagic = document.createElement("div");
        selectTower.setAttribute(
            "style",
            "width:200px; height:140px; position:relative; border-radius: 8%"
        );
        selectTower.style.top = y - 45 + "px";
        selectTower.style.left = x - 90 + "px";
        selectTower.style.background = "rgba(100,100,100,0.6)";
        selectTower.classList.add("dynamic");
        parentElement.appendChild(selectTower);
        selectArcher.setAttribute(
            "style",
            "position:absolute; border-radius: 50%; width: 62px; height: 56px; background: black;"
        );
        selectArcher.style.top = "6%";
        selectArcher.style.left = "8%";
        selectTower.appendChild(selectArcher);
        selectCannon.setAttribute(
            "style",
            "position:absolute; border-radius: 50%; width: 62px; height: 56px; background: black;"
        );
        selectCannon.style.top = "56%";
        selectCannon.style.left = "8%";
        selectTower.appendChild(selectCannon);
        selectIce.setAttribute(
            "style",
            "position:absolute; border-radius: 50%; width: 62px; height: 56px; background: black;"
        );
        selectIce.style.top = "6%";
        selectIce.style.left = "56%";
        selectTower.appendChild(selectIce);
        selectMagic.setAttribute(
            "style",
            "position:absolute; border-radius: 50%; width: 62px; height: 56px; background: black;"
        );
        selectMagic.style.top = "56%";
        selectMagic.style.left = "56%";
        selectTower.appendChild(selectMagic);
        [selectArcher, selectCannon, selectIce, selectMagic].forEach(function(
            item,
            id
        ) {
            item.addEventListener(
                "click",
                self.buildingInProgress.bind(this, id, index)
            );
        });
    };
    this.buildingInProgress = function(id, index) {
        var x = buildingArea[index].x;
        var y = buildingArea[index].y;
        var tower = null;
        if (points >= 100) {
            parentElement.removeChild(buildingArea[index].element);
            parentElement.removeChild(selectTower);
            selectTower = null;
            // buildingArea.splice(0, 1);
            if (id == 0) {
                tower = new Archer_Tower(parentElement, x, y).buildTower();
            } else if (id == 1) {
                tower = new Cannon_Tower(parentElement, x, y).buildTower();
            } else if (id == 2) {
                tower = new Ice_Tower(parentElement, x, y).buildTower();
            } else if (id == 3) {
                tower = new Magic_Tower(parentElement, x, y).buildTower();
            }
            tower.element.addEventListener(
                "click",
                self.addUpgradeButton.bind(this, tower)
            );
            towers.push(tower);
        }
    };
    this.addUpgradeButton = function(tower) {
        if (tower.level < 3) {
            console.log("now add the upgrade menu");
            var upgrade = document.createElement("div");
            upgrade.setAttribute(
                "style",
                "position: absolute; background: black; width: 35px; height: 35px; border-radius: 50%; cursor: pointer"
            );
            upgrade.classList.add('dynamic');
            upgrade.style.top = tower.y + 7 + "px";
            upgrade.style.left = tower.x - 7 + "px";
            parentElement.appendChild(upgrade);
            upgrade.addEventListener("click", function() {
                tower.upgrade();
                self.removeContentsFromGame(upgrade);
            });
        }
    };
    this.upgradeInProgress = function() {};
    this.resetSourceAndDestination = function(item, statusItem) {
        item.move(item.destination.x, item.destination.y);
        statusItem.move(item.destination.x, item.destination.y - 8);
        item.setSource(
            road_map.road[item.destIndex][0],
            road_map.road[item.destIndex][1]
        );
        item.setDestination(
            road_map.road[item.destIndex + 1][0],
            road_map.road[item.destIndex + 1][1]
        );
        item.setDestIndex(item.destIndex + 1);
        var angleDeg =
            (Math.atan2(
                    item.destination.y - item.source.y,
                    item.destination.x - item.source.x
                ) *
                180) /
            Math.PI;
        var angle = (angleDeg * Math.PI) / 180;
        item.setAngle(angle);
        return;
    };
    this.findNextPoint = function(item, statusItem) {
        if (item.source.x < item.destination.x) {
            if (item.x >= item.destination.x) {
                self.resetSourceAndDestination(item, statusItem);
            }
        } else if (item.source.y < item.destination.y) {
            if (item.y >= item.destination.y) {
                self.resetSourceAndDestination(item, statusItem);
            }
        } else if (item.source.x > item.destination.x) {
            if (item.x <= item.destination.x) {
                self.resetSourceAndDestination(item, statusItem);
            }
        } else if (item.source.y > item.destination.y) {
            if (item.y <= item.destination.y) {
                self.resetSourceAndDestination(item, statusItem);
            }
        }
        var deltaX = Math.cos(item.angle) * item.speed;
        var deltaY = Math.sin(item.angle) * item.speed;
        item.move(item.x + deltaX, item.y + deltaY);
        statusItem.move(statusItem.x + deltaX, statusItem.y + deltaY);
    };
    this.removeContentsFromGame = function(item) {
        parentElement.removeChild(item);
    };
    this.removeCharacterFromGame = function(index) {
        if (characters[index] == undefined) {
            return;
        }
        parentElement.removeChild(characters[index].element);
        parentElement.removeChild(charactersStatus[index].element);
        characters.splice(index, 1);
        charactersStatus.splice(index, 1);
    };
    this.removeWeaponFromGame = function(index) {
        parentElement.removeChild(weapons[index].element);
        weapons.splice(index, 1);
    };
    this.checkCharacterOverflow = function() {
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].x >= 1210) {
                numberLeftToLoose -= 1;
                leftToLoose.innerHTML = 'left: ' + numberLeftToLoose;
                self.removeCharacterFromGame(i);
            }
        }
    };
    this.createFox = function(fox_number) {
        var backwards = 0 - fox_number * 26;
        var y_position = road_map.road[0][1];
        var nextX = road_map.road[1][0];
        var nextY = road_map.road[1][1];
        var angleDeg =
            (Math.atan2(nextY - y_position, nextX - backwards) * 180) / Math.PI;
        var angle = (angleDeg * Math.PI) / 180;
        var character = new Fox(
            parentElement,
            backwards,
            y_position,
            nextX,
            nextY,
            angle,
            waveNumber,
            fox_number
        ).createFox();
        var statusBar = new Status_Bar(
            parentElement,
            backwards,
            y_position - 8,
            4,
            character.width,
            character.health
        ).createStatusBar();
        charactersStatus.push(statusBar);
        characters.push(character);
    };
    this.createOrce = function(orce_number) {
        var backwards = 0 - orce_number * 26;
        var y_position = road_map.road[0][1];
        var nextX = road_map.road[1][0];
        var nextY = road_map.road[1][1];
        var angleDeg =
            (Math.atan2(nextY - y_position, nextX - backwards) * 180) / Math.PI;
        var angle = (angleDeg * Math.PI) / 180;
        var character = new Orce(
            parentElement,
            backwards,
            y_position,
            nextX,
            nextY,
            angle,
            waveNumber,
            orce_number
        ).createOrce();
        var statusBar = new Status_Bar(
            parentElement,
            backwards,
            y_position - 8,
            4,
            character.width,
            character.health
        ).createStatusBar();
        charactersStatus.push(statusBar);
        characters.push(character);
    };
    this.createOrge = function(orge_number) {
        var backwards = 0 - orge_number * 26;
        var y_position = road_map.road[0][1];
        var nextX = road_map.road[1][0];
        var nextY = road_map.road[1][1];
        var angleDeg =
            (Math.atan2(nextY - y_position, nextX - backwards) * 180) / Math.PI;
        var angle = (angleDeg * Math.PI) / 180;
        var character = new Orge(
            parentElement,
            backwards,
            y_position,
            nextX,
            nextY,
            angle,
            waveNumber,
            orge_number
        ).createOrge();
        var statusBar = new Status_Bar(
            parentElement,
            backwards,
            y_position - 8,
            4,
            character.width,
            character.health
        ).createStatusBar();
        charactersStatus.push(statusBar);
        characters.push(character);
    };
    this.createViking = function(viking_number) {
        var backwards = 0 - viking_number * 26;
        var y_position = road_map.road[0][1];
        var nextX = road_map.road[1][0];
        var nextY = road_map.road[1][1];
        var angleDeg =
            (Math.atan2(nextY - y_position, nextX - backwards) * 180) / Math.PI;
        var angle = (angleDeg * Math.PI) / 180;
        var character = new Viking(
            parentElement,
            backwards,
            y_position,
            nextX,
            nextY,
            angle,
            waveNumber,
            viking_number
        ).createViking();
        var statusBar = new Status_Bar(
            parentElement,
            backwards,
            y_position - 8,
            4,
            character.width,
            character.health
        ).createStatusBar();
        charactersStatus.push(statusBar);
        characters.push(character);
    };
    this.createWizard = function(wizard_number) {
        var backwards = 0 - wizard_number * 26;
        var y_position = road_map.road[0][1];
        var nextX = road_map.road[1][0];
        var nextY = road_map.road[1][1];
        var angleDeg =
            (Math.atan2(nextY - y_position, nextX - backwards) * 180) / Math.PI;
        var angle = (angleDeg * Math.PI) / 180;
        var character = new Wizard(
            parentElement,
            backwards,
            y_position,
            nextX,
            nextY,
            angle,
            waveNumber
        ).createWizard();
        var statusBar = new Status_Bar(
            parentElement,
            backwards,
            y_position - 8,
            4,
            character.width,
            character.health
        ).createStatusBar();
        charactersStatus.push(statusBar);
        characters.push(character);
    };
    this.checkEnemies = function(tower) {
        var enemiesDetected = null;
        var towerFoot = {
            x: tower.x + tower.width / 2,
            y: tower.y + tower.height
        };
        for (var i = 0; i < characters.length; i++) {
            distance1 = Math.sqrt(
                Math.ceil(
                    Math.pow(characters[i].x - towerFoot.x, 2) +
                    Math.pow(characters[i].y - towerFoot.y, 2)
                )
            );
            distance2 = Math.sqrt(
                Math.ceil(
                    Math.pow(characters[i].x + characters[i].width - towerFoot.x, 2) +
                    Math.pow(characters[i].y - towerFoot.y, 2)
                )
            );
            if (distance1 < tower.range || distance2 < tower.range) {
                enemiesDetected = characters[i];
                detectedEnemyIndex = i;
                break;
            }
        }
        if (enemiesDetected != null) {
            var angleDeg =
                (Math.atan2(
                        enemiesDetected.y - tower.y,
                        enemiesDetected.x - (tower.x + tower.width / 2)
                    ) *
                    180) /
                Math.PI;
            var angle = (angleDeg * Math.PI) / 180;
            var weapon = new Weapon(
                parentElement,
                tower.x + tower.width / 2,
                tower.y,
                enemiesDetected.x,
                enemiesDetected.y,
                tower.weapon.width,
                tower.weapon.height,
                angle,
                tower.fireSpeed,
                tower.damage,
                tower.type
            ).createWeapon();

            weapons.push(weapon);
            tower.resetCounter();
        } else {
            return;
        }
    };

    this.reloadTower = function(tower) {
        tower.increaseCounter();
        if (tower.counter % tower.fireRate == 0) {
            self.checkEnemies(tower);
        }
    };
    this.checkWizard = function(wizard) {
        wizard.increaseCounter();
        if (wizard.counter % 600 == 0) {
            self.wizardHeal(wizard);
        }
    };
    this.wizardHeal = function(wizard) {
        console.log("inside wizardHeal");
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].wizard != true) {
                var distance1 = Math.sqrt(
                    Math.ceil(
                        Math.pow(characters[i].x - wizard.x + wizard.width / 2, 2) +
                        Math.pow(characters[i].y - wizard.y, 2)
                    )
                );
                var distance2 = Math.sqrt(
                    Math.ceil(
                        Math.pow(
                            characters[i].x +
                            characters[i].width -
                            wizard.x +
                            wizard.width / 2,
                            2
                        ) + Math.pow(characters[i].y - wizard.y, 2)
                    )
                );
                if (distance1 <= wizard.range || distance2 <= wizard.range) {
                    characters[i].heal(wizard.increaseHealth);
                    if (characters[i].health > characters[i].maxHealth) {
                        console.log("no need to heal");
                        characters[i].health = characters[i].maxHealth;
                    }
                    charactersStatus[i].setStatusValue(
                        (characters[i].health / charactersStatus[i].initialStatus) * 100
                    );
                }
            }
        }
    };
    this.updateSlowedCharacters = function() {
        for (var i = 0; i < slowedCharacters.length; i++) {
            slowedCharacters[i].increaseIceEffectCounter();
            if (slowedCharacters[i].iceEffectCounter % 300 == 0) {
                slowedCharacters[i].setSpeed(slowedCharacters[i].initialSpeed);
                slowedCharacters.splice(i, 1);
            }
        }
    };
    this.stopGame = function() {
        clearInterval(game_loop);
        var dynamic = Array.from(parentElement.getElementsByClassName('dynamic'));
        dynamic.forEach(function(item, index) {
            parentElement.removeChild(item)
        })
        waveNumber = null;
        createNewWave = false;
        level_for_road = null;
        level = 1;
        road_map = null;
        towers = [];
        buildingArea = [];
        characters = [];
        charactersStatus = [];
        slowedCharacters = [];
        foxes = [];
        wizards = [];
        vikings = [];
        goblins = [];
        points = 1000;
        numberLeftToLoose = 5;
        game_loop = null;
        setTimeOutTest = 0;
        selectTower = null;
        weapons = [];
        detectedEnemyIndex = null;
        leftToLoose = null;
        gamePoints = null;
    }
    this.afterLossOrWinGame = function(status) {
        var screen = document.createElement('div');
        screen.setAttribute('style', 'position: relative; background: rgba(0,0,0,0.4); width: 100%; height: 100%');
        parentElement.appendChild(screen);
        var gameStatus = null;
        if (status == 'win') {
            gameStatus = document.createElement('div');
            gameStatus.setAttribute('style', 'position: absolute; top: 20%;left:45%; font-size: 24px; font-weight: bold; color: white');
            gameStatus.innerHTML = 'GAME WON';
        }
        if (status == 'loss') {
            gameStatus = document.createElement('div');
            gameStatus.setAttribute('style', 'position: absolute; top: 20%;left:45%; font-size: 24px; font-weight: bold; color: white; text-align: center;');
            gameStatus.innerHTML = 'GAME LOST <br/> <span>RETRY</span>';
            var retry = Array.from(gameStatus.getElementsByTagName('span'));
            console.log(retry[0])
            retry[0].setAttribute('style', 'cursor: pointer;text-decoration: underline;');
            retry[0].addEventListener('click', function() {
                parentElement.removeChild(screen)
                self.startGame();
            })
        }
        screen.appendChild(gameStatus);
        var level1 = document.createElement('div');
        level1.setAttribute('style', 'position: absolute; width: 225px;height:270px;top: 50%; left: 10%;background: black;border-radius: 10%');
        screen.appendChild(level1);
        var level2 = document.createElement('div');
        level2.setAttribute('style', 'position: absolute; width: 225px;height:270px;top: 50%; left: 39%;background: black;border-radius: 10%');
        screen.appendChild(level2);
        var level3 = document.createElement('div');
        level3.setAttribute('style', 'position: absolute; width: 225px;height:270px;top: 50%; left: 70%;background: black;border-radius: 10%');
        screen.appendChild(level3);
        level1.addEventListener('click', function() {
            parentElement.removeChild(screen);
            self.startGame(1);
        })
        level2.addEventListener('click', function() {
            parentElement.removeChild(screen);
            self.startGame(2);
        })
        level3.addEventListener('click', function() {
            parentElement.removeChild(screen);
            self.startGame(3);
        })
    }
    this.gameLoop = function() {
        console.log(waveNumber)
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].wizard == true) {
                self.checkWizard(characters[i]);
            }
        }
        self.updateSlowedCharacters();
        if (resetTowerXandY == true) {
            for (var i = 0; i < towers.length; i++) {
                towers[i].updateXandY();
                resetTowerXandY = false;
            }
        }
        for (var i = 0; i < towers.length; i++) {
            self.reloadTower(towers[i]);
        }
        for (var i = 0; i < weapons.length; i++) {
            if (weapons[i].source.x < weapons[i].destination.x) {
                if (weapons[i].x > weapons[i].destination.x) {
                    if (characters[detectedEnemyIndex] == undefined) {
                        break;
                    }
                    if (weapons[i].towerType == "ice") {
                        characters[detectedEnemyIndex].setSpeed(1);
                        var alreadyPushed = false;
                        if (slowedCharacters.length > 0) {
                            console.log("inside slowed character > 0");
                            for (var j = 0; j < slowedCharacters.length; j++) {
                                console.log("insde for loop");
                                if (
                                    slowedCharacters[j].id == characters[detectedEnemyIndex].id
                                ) {
                                    alreadyPushed = true;
                                    slowedCharacters[j].resetIceEffectCounter();
                                    console.log("already pushed", true);
                                }
                            }
                        }
                        if (alreadyPushed == false && slowedCharacters.length > 0) {
                            slowedCharacters.push(characters[detectedEnemyIndex]);
                            console.log("pushed because of new character", slowedCharacters);
                        }
                        if (slowedCharacters.length == 0) {
                            slowedCharacters.push(characters[detectedEnemyIndex]);
                            console.log("pushed because of 0", slowedCharacters);
                        }
                    }
                    characters[detectedEnemyIndex].updateHealth(weapons[i].damage);
                    charactersStatus[detectedEnemyIndex].setStatusValue(
                        (characters[detectedEnemyIndex].health /
                            charactersStatus[detectedEnemyIndex].initialStatus) *
                        100
                    );
                    self.removeWeaponFromGame(i);
                    if (characters[detectedEnemyIndex].health <= 0) {
                        points = (characters[detectedEnemyIndex].maxHealth / 5) + points;
                        gamePoints.innerHTML = 'Points: ' + points;
                        self.removeCharacterFromGame(detectedEnemyIndex);
                    }
                    break;
                }
            } else if (weapons[i].source.x > weapons[i].destination.x) {
                if (weapons[i].x < weapons[i].destination.x) {
                    if (characters[detectedEnemyIndex] == undefined) {
                        break;
                    }
                    if (weapons[i].towerType == "ice") {
                        characters[detectedEnemyIndex].setSpeed(1);
                        var alreadyPushed = false;
                        if (slowedCharacters.length > 0) {
                            console.log("inside slowed character > 0");
                            for (var j = 0; j < slowedCharacters.length; j++) {
                                console.log("insde for loop");
                                if (
                                    slowedCharacters[j].id == characters[detectedEnemyIndex].id
                                ) {
                                    alreadyPushed = true;
                                    slowedCharacters[j].resetIceEffectCounter();
                                    console.log("already pushed", true);
                                }
                            }
                        }
                        if (alreadyPushed == false && slowedCharacters.length > 0) {
                            slowedCharacters.push(characters[detectedEnemyIndex]);
                            console.log("pushed because of new character", slowedCharacters);
                        }
                        if (slowedCharacters.length == 0) {
                            slowedCharacters.push(characters[detectedEnemyIndex]);
                            console.log("pushed because of 0", slowedCharacters);
                        }
                    }
                    characters[detectedEnemyIndex].updateHealth(weapons[i].damage);
                    charactersStatus[detectedEnemyIndex].setStatusValue(
                        (characters[detectedEnemyIndex].health /
                            charactersStatus[detectedEnemyIndex].initialStatus) *
                        100
                    );
                    self.removeWeaponFromGame(i);
                    if (characters[detectedEnemyIndex].health <= 0) {
                        points = (characters[detectedEnemyIndex].maxHealth / 5) + points;
                        gamePoints.innerHTML = 'Points: ' + points;
                        self.removeCharacterFromGame(detectedEnemyIndex);
                    }
                    break;
                }
            } else if (weapons[i].source.y < weapons[i].destination.y) {
                if (weapons[i].y > weapons[i].destination.y) {
                    if (characters[detectedEnemyIndex] == undefined) {
                        break;
                    }
                    if (weapons[i].towerType == "ice") {
                        characters[detectedEnemyIndex].setSpeed(1);
                        var alreadyPushed = false;
                        if (slowedCharacters.length > 0) {
                            console.log("inside slowed character > 0");
                            for (var j = 0; j < slowedCharacters.length; j++) {
                                console.log("insde for loop");
                                if (
                                    slowedCharacters[j].id == characters[detectedEnemyIndex].id
                                ) {
                                    alreadyPushed = true;
                                    slowedCharacters[j].resetIceEffectCounter();
                                    console.log("already pushed", true);
                                }
                            }
                        }
                        if (alreadyPushed == false && slowedCharacters.length > 0) {
                            slowedCharacters.push(characters[detectedEnemyIndex]);
                            console.log("pushed because of new character", slowedCharacters);
                        }
                        if (slowedCharacters.length == 0) {
                            slowedCharacters.push(characters[detectedEnemyIndex]);
                            console.log("pushed because of 0", slowedCharacters);
                        }
                    }
                    characters[detectedEnemyIndex].updateHealth(weapons[i].damage);
                    charactersStatus[detectedEnemyIndex].setStatusValue(
                        (characters[detectedEnemyIndex].health /
                            charactersStatus[detectedEnemyIndex].initialStatus) *
                        100
                    );
                    self.removeWeaponFromGame(i);
                    if (characters[detectedEnemyIndex].health <= 0) {
                        points = (characters[detectedEnemyIndex].maxHealth / 5) + points;
                        gamePoints.innerHTML = 'Points: ' + points;
                        self.removeCharacterFromGame(detectedEnemyIndex);
                    }
                    break;
                }
            } else if (weapons[i].source.y > weapons[i].destination.y) {
                if (weapons[i].y < weapons[i].destination.y) {
                    if (characters[detectedEnemyIndex] == undefined) {
                        break;
                    }
                    if (weapons[i].towerType == "ice") {
                        characters[detectedEnemyIndex].setSpeed(1);
                        var alreadyPushed = false;
                        if (slowedCharacters.length > 0) {
                            console.log("inside slowed character > 0");
                            for (var j = 0; j < slowedCharacters.length; j++) {
                                console.log("insde for loop");
                                if (
                                    slowedCharacters[j].id == characters[detectedEnemyIndex].id
                                ) {
                                    alreadyPushed = true;
                                    slowedCharacters[j].resetIceEffectCounter();
                                    console.log("already pushed", true);
                                }
                            }
                        }
                        if (alreadyPushed == false && slowedCharacters.length > 0) {
                            slowedCharacters.push(characters[detectedEnemyIndex]);
                            console.log("pushed because of new character", slowedCharacters);
                        }
                        if (slowedCharacters.length == 0) {
                            slowedCharacters.push(characters[detectedEnemyIndex]);
                            console.log("pushed because of 0", slowedCharacters);
                        }
                    }
                    characters[detectedEnemyIndex].updateHealth(weapons[i].damage);
                    charactersStatus[detectedEnemyIndex].setStatusValue(
                        (characters[detectedEnemyIndex].health /
                            charactersStatus[detectedEnemyIndex].initialStatus) *
                        100
                    );
                    self.removeWeaponFromGame(i);
                    if (characters[detectedEnemyIndex].health <= 0) {
                        points = (characters[detectedEnemyIndex].maxHealth / 5) + points;
                        gamePoints.innerHTML = 'Points: ' + points;
                        self.removeCharacterFromGame(detectedEnemyIndex);
                    }
                    break;
                }
            }
            var deltaX = Math.cos(weapons[i].angle) * weapons[i].speed;
            var deltaY = Math.sin(weapons[i].angle) * weapons[i].speed;
            weapons[i].angle, weapons[i].speed, weapons[i].x;
            weapons[i].move(weapons[i].x + deltaX, weapons[i].y + deltaY);
        }
        for (var i = 0; i < characters.length; i++) {
            self.findNextPoint(characters[i], charactersStatus[i]);
            self.checkCharacterOverflow(characters[i]);
        }
        if (characters.length == 0 && waveNumber < 4) {
            setTimeOutTest += 1;
            if (setTimeOutTest == 1) {
                var waveInformation = document.createElement('div');
                waveInformation.setAttribute('style', 'position: absolute; top: 45%;left:35%; font-size: 24px; font-weight: bold; color: white');
                waveInformation.innerHTML = 'Next wave of enemy approaching';
                if (waveNumber == 3) {
                    waveInformation.innerHTML = 'last wave of enemy approaching';
                }
                waveInformation.classList.add('dynamic');
                parentElement.appendChild(waveInformation);
                setTimeout(function() {
                    createNewWave = true;
                    waveNumber += 1;
                    parentElement.removeChild(waveInformation);
                }, 4000);
            }
        }
        if (createNewWave == true) {
            if (waveNumber == 2) {
                var produceWizardAt = [];
                var index = Math.floor(wave.wave_2.amount / 3);
                var checkIndex = index;
                while (checkIndex <= wave.wave_2.amount) {
                    produceWizardAt.push(checkIndex);
                    checkIndex = checkIndex + index;
                }
                var enemyIndex = -1;
                for (var i = 0; i <= wave.wave_2.amount; i++) {
                    enemyIndex = enemyIndex + 1;
                    for (var j = 0; j < produceWizardAt.length; j++) {
                        if (i == produceWizardAt[j]) {
                            self.createWizard(enemyIndex);
                            enemyIndex++;
                        }
                    }
                    self.createOrce(enemyIndex);
                }
            } else if (waveNumber == 3) {
                var produceWizardAt = [];
                var index = Math.floor(wave.wave_3.amount / 3);
                var checkIndex = index;
                while (checkIndex <= wave.wave_3.amount) {
                    produceWizardAt.push(checkIndex);
                    checkIndex = checkIndex + index;
                }
                var enemyIndex = -1;
                for (var i = 0; i <= wave.wave_3.amount; i++) {
                    enemyIndex = enemyIndex + 1;
                    for (var j = 0; j < produceWizardAt.length; j++) {
                        if (i == produceWizardAt[j]) {
                            self.createWizard(enemyIndex);
                            enemyIndex++;
                        }
                    }
                    self.createOrge(enemyIndex);
                }
            } else if (waveNumber == 4) {
                console.log("inside vikking");
                for (var i = 0; i <= wave.wave_4.amount; i++) {
                    self.createViking(i);
                }
            } else {
                buildingArea = [];
            }
            createNewWave = false;
            setTimeOutTest = 0;
        }
        if (numberLeftToLoose == 0) {
            console.log('game lost')
            self.stopGame();
            self.afterLossOrWinGame('loss')
        }
        if (waveNumber == 4 && characters.length == 0) {
            console.log('game won')
            self.stopGame();
            self.afterLossOrWinGame('win')
        }
    };
}
var draggedItem = null;
var resetTowerXandY = false;
var initial_x = null;
var initial_y = null;

function allowDrop(event) {
    event.preventDefault();
}

function initialLocation(event) {
    console.log('inside initallocaiton')
    var e = window.event;
    initial_x = e.clientX - initial_x;
    initial_y = e.clientY - initial_y;
    // console.log(e.clientX - initial_x)
}

function newLocation(event) {
    console.log('inside newlocation')
    var e = window.event;
    var posX = e.clientX;
    var posY = e.clientY;
    console.log('inital y', initial_y)
    draggedItem.style.top = posY - initial_y + 4 + "px";
    draggedItem.style.left = posX - initial_x + 4 + "px";
    console.log("new location", posX, posY);
    resetTowerXandY = true;
}

function draggedElement(event) {
    draggedItem = event.target;
    const style = getComputedStyle(draggedItem)
    initial_x = style.left.replace('px', '') * 1;
    initial_y = style.top.replace('px', '') * 1;
    console.log(initial_x, initial_y);
}
var container = Array.from(document.getElementsByClassName("game-container"));
// container.forEach(function(item, index) {
//     item.setAttribute("ondragover", "allowDrop(event)");
//     item.setAttribute("ondrop", "newLocation(event)");
//     item.setAttribute("ondragstart", "initialLocation(event)");
//     new Game(item).startGame();
// });
var initialScreen = document.createElement('div');
initialScreen.setAttribute('style', 'position: relative;background: red; width: 100%; height: 100%');
container[0].appendChild(initialScreen);
var gameName = document.createElement('div');
gameName.setAttribute('style', 'position: absolute; top: 20%;left:31%; font-size: 36px; font-weight: bold; color: white');
gameName.innerHTML = 'TOWER DEFENSE HERO';
initialScreen.appendChild(gameName);
var level1 = document.createElement('div');
level1.setAttribute('style', 'position: absolute; width: 225px;height:270px;top: 45%; left: 10%;background: black;border-radius: 10%');
initialScreen.appendChild(level1);
var level2 = document.createElement('div');
level2.setAttribute('style', 'position: absolute; width: 225px;height:270px;top: 45%; left: 39%;background: black;border-radius: 10%');
initialScreen.appendChild(level2);
var level3 = document.createElement('div');
level3.setAttribute('style', 'position: absolute; width: 225px;height:270px;top: 45%; left: 70%;background: black;border-radius: 10%');
initialScreen.appendChild(level3);
var levelDescription = document.createElement('div');
levelDescription.setAttribute('style', 'position: absolute; top: 88%;left:40%; font-size: 24px; font-weight: bold; color: white');
levelDescription.innerHTML = 'Select a level to play';
initialScreen.appendChild(levelDescription);
level1.addEventListener('click', function() {
    container[0].removeChild(initialScreen);
    container.forEach(function(item, index) {
        item.setAttribute("ondragover", "allowDrop(event)");
        item.setAttribute("ondrop", "newLocation(event)");
        item.setAttribute("ondragstart", "initialLocation(event)");
        new Game(item).startGame(1);
    });
})
level2.addEventListener('click', function() {
    container[0].removeChild(initialScreen);
    container.forEach(function(item, index) {
        item.setAttribute("ondragover", "allowDrop(event)");
        item.setAttribute("ondrop", "newLocation(event)");
        item.setAttribute("ondragstart", "initialLocation(event)");
        new Game(item).startGame(2);
    });
})
level3.addEventListener('click', function() {
    container[0].removeChild(initialScreen);
    container.forEach(function(item, index) {
        item.setAttribute("ondragover", "allowDrop(event)");
        item.setAttribute("ondrop", "newLocation(event)");
        item.setAttribute("ondragstart", "initialLocation(event)");
        new Game(item).startGame(3);
    });
})