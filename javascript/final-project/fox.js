function Fox(parentElement, intial_X_position, initial_Y_position, destination_x, destination_y, angle, waveNumber, id) {
    this.iceEffectCounter = 0;
    this.fox = true;
    this.element = null;
    this.id = id;
    this.maxHealth = 100;
    this.health = 100;
    this.initialSpeed = 1.5;
    this.speed = 1.5;
    this.width = 12;
    this.height = 18;
    this.x = null;
    this.y = null;
    this.waveNumber = waveNumber;
    this.source = {
        x: intial_X_position,
        y: initial_Y_position
    }
    this.destination = {
        x: destination_x,
        y: destination_y
    }
    this.angle = angle;
    this.destIndex = 1;
    this.createFox = function() {
        var fox = document.createElement('div');
        fox.setAttribute('style', 'position: absolute; width: 18px; height: 24px;');
        fox.style.backgroundImage = 'url(./images/fox-running.gif)'
        fox.classList.add('dynamic');
        this.element = fox;
        parentElement.appendChild(this.element);
        this.setInitialPosition();
        return this;
    }
    this.updateHealth = function(value) {
        this.health = this.health - value;
    }
    this.heal = function(heal) {
        this.health = this.health + heal;
    }
    this.setSource = function(x, y) {
        this.source.x = x;
        this.source.y = y;
    }
    this.setDestination = function(x, y) {
        this.destination.x = x;
        this.destination.y = y;
    }
    this.setDestIndex = function(value) {
        this.destIndex = value;
    }
    this.setAngle = function(value) {
        this.angle = value;
    }
    this.setSpeed = function(speed) {
        this.speed = speed;
    }
    this.setInitialPosition = function() {
        this.x = intial_X_position;
        this.y = initial_Y_position;
        this.draw();
    }
    this.move = function(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }
    this.draw = function() {
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }
    this.increaseIceEffectCounter = function() {
        this.iceEffectCounter++;
    }
    this.resetIceEffectCounter = function() {
        this.iceEffectCounter = 0;
    }
}