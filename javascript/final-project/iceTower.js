function Ice_Tower(parentElement, x, y) {
    this.x = x;
    this.y = y;
    this.type = 'ice';
    this.height = 50;
    this.width = 20;
    this.counter = 0;
    this.weapon = {
        height: 8,
        width: 8
    }
    this.pointsNeeded = {
        build: 100,
        level_2: 100,
        level_3: 100
    }
    this.damage = 50;
    this.fireSpeed = 24;
    this.fireRate = 50;
    this.element = null;
    this.range = 130;
    this.buildTower = function() {
        var tower = document.createElement('div');
        tower.setAttribute('style', 'height: 50px; width: 20px; position: absolute; background: white');
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