function Cannon_Tower(parentElement, x, y) {
    this.x = x;
    this.y = y;
    this.type = 'cannon';
    this.width = 50;
    this.height = 20;
    this.counter = 0;
    this.weapon = {
        height: 10,
        width: 10
    }
    this.pointsNeeded = {
        build: 100,
        level_2: 100,
        level_3: 100
    }
    this.damage = 100;
    this.fireSpeed = 18;
    this.fireRate = 50;
    this.element = null;
    this.range = 150;
    this.buildTower = function() {
        var tower = document.createElement('div');
        tower.setAttribute('style', 'height: 50px; width: 20px; position: absolute; background: black');
        tower.classList.add('dynamic');
        this.element = tower;
        parentElement.appendChild(this.element);
        this.element.style.top = y + 'px';
        this.element.style.left = x + 'px';
        return this;
    };
    this.increaseCounter = function() {
        this.counter += 1;
    }
    this.resetCounter = function() {
        this.counter = 0;
    }
    this.updateDamage = function(damage) {
        this.damage = damage;
    }
}