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
    var foxes = [];
    var wizards = [];
    var vikings = [];
    var goblins = [];
    var points = 1500;
    var numberLeftToLoose = 12;
    var game_loop = null;
    var setTimeOutTest = 0;
    var selectTower = null;
    var weapons = [];
    var detectedEnemyIndex = null;
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
    this.startGame = function() {
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
            road_map = points_changes.level_2;
            parentElement.style.backgroundImage = "url(./images/resize.png)";
        } else if (level == 3) {
            road_map = points_changes.level_3;
            parentElement.style.backgroundImage = "url(./images/resize.png)";
        } else if (level == 4) {
            road_map = points_changes.level_4;
            parentElement.style.backgroundImage = "url(./images/resize.png)";
        }
        if (waveNumber == 1) {
            for (var i = 0; i < wave.wave_1.amount; i++) {
                console.log('wave number', wave.wave_1.amount)
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
            towers.push(tower);
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
        // console.log(index, charactersStatus[index].element)
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
            waveNumber
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
            waveNumber
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
            waveNumber
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
            waveNumber
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

    this.createViking = function() {};
    this.createGoblin = function() {};
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
    this.gameLoop = function() {
        for (var i = 0; i < towers.length; i++) {
            self.reloadTower(towers[i]);
        }
        for (var i = 0; i < weapons.length; i++) {
            if (weapons[i].source.x < weapons[i].destination.x) {
                if (weapons[i].x > weapons[i].destination.x) {
                    console.log(weapons[i].towerType)
                    characters[detectedEnemyIndex].updateHealth(weapons[i].damage)
                    charactersStatus[i].setStatusValue((characters[detectedEnemyIndex].health / charactersStatus[i].initialStatus) * 100)
                        // console.log(weapons[i].damage, characters[detectedEnemyIndex], charactersStatus)
                    self.removeWeaponFromGame(i);
                    if (characters[detectedEnemyIndex].health <= 0) {

                        self.removeCharacterFromGame(detectedEnemyIndex);
                    }
                    break;
                }
            } else if (weapons[i].source.x > weapons[i].destination.x) {
                if (weapons[i].x < weapons[i].destination.x) {
                    characters[detectedEnemyIndex].updateHealth(weapons[i].damage)
                    charactersStatus[i].setStatusValue((characters[detectedEnemyIndex].health / charactersStatus[i].initialStatus) * 100)
                        // console.log(weapons[i].damage, characters[detectedEnemyIndex], charactersStatus)
                    self.removeWeaponFromGame(i);
                    if (characters[detectedEnemyIndex].health <= 0) {

                        self.removeCharacterFromGame(detectedEnemyIndex);
                    }
                    break;
                }
            } else if (weapons[i].source.y < weapons[i].destination.y) {
                if (weapons[i].y > weapons[i].destination.y) {
                    charactersStatus[i].setStatusValue((characters[detectedEnemyIndex].health / charactersStatus[i].initialStatus) * 100)
                        // console.log(weapons[i].damage, characters[detectedEnemyIndex], charactersStatus)
                    self.removeWeaponFromGame(i);
                    if (characters[detectedEnemyIndex].health <= 0) {

                        self.removeCharacterFromGame(detectedEnemyIndex);
                    }
                    break;
                }
            } else if (weapons[i].source.y > weapons[i].destination.y) {
                if (weapons[i].y < weapons[i].destination.y) {
                    charactersStatus[i].setStatusValue((characters[detectedEnemyIndex].health / charactersStatus[i].initialStatus) * 100)
                        // console.log(weapons[i].damage, characters[detectedEnemyIndex], charactersStatus)
                    self.removeWeaponFromGame(i);
                    if (characters[detectedEnemyIndex].health <= 0) {

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
        if (characters.length == 0) {
            setTimeOutTest += 1;
            if (setTimeOutTest == 1) {
                setTimeout(function() {
                    createNewWave = true;
                    waveNumber += 1;
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
                    // console.log(characters[i].wizard)
                }
            } else if (waveNumber == 3) {
                for (var i = 0; i <= wave.wave_3.amount; i++) {
                    self.createOrge(i);
                }
            } else if (waveNumber == 4) {
                for (var i = 0; i <= wave.wave_4.amount; i++) {
                    self.createFox(i);
                }
            } else {
                buildingArea = [];
            }
            createNewWave = false;
            setTimeOutTest = 0;
        }
    };
}

function allowDrop(event) {
    event.preventDefault();
}
var container = Array.from(document.getElementsByClassName("game-container"));
container.forEach(function(item, index) {
    item.setAttribute('ondragover', 'allowDrop(event)')
    new Game(item).startGame();
});