function Archer_Tower(parentElement, x, y) {
    this.x = x;
    this.y = y;
    this.type = 'archer';
    this.height = 50;
    this.width = 20;
    this.counter = 0;
    this.weapon = {
        height: 3,
        width: 30,
    };
    this.pointsNeeded = {
        build: 100,
        level_2: 100,
        level_3: 100
    }
    this.damage = 60;
    this.fireSpeed = 20;
    this.fireRate = 40;
    this.element = null;
    this.range = 140;
    this.buildTower = function() {
        var tower = document.createElement('div');
        tower.setAttribute('style', 'height: 50px; width: 20px; position: absolute; background: green; cursor:pointer');
        tower.setAttribute('draggable', 'true')
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