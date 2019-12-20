function Ice_Tower(parentElement, x, y) {
    var self = this;
    this.level = 1;
    this.x = x;
    this.y = y;
    this.type = 'ice';
    this.height = 50;
    this.width = 40;
    this.counter = 0;
    this.weapon = {
        height: 8,
        width: 8
    }
    this.pointsNeeded = {
        build: 100,
        level_2: 250,
        level_3: 300
    }
    this.damage = 15;
    this.fireSpeed = 24;
    this.fireRate = 60;
    this.element = null;
    this.range = 130;
    this.buildTower = function() {
        var tower = document.createElement('div');
        tower.setAttribute('style', 'height: 50px; width: 40px; position: absolute; background: url(./images/ice_level1.png);');
        tower.setAttribute('draggable', 'true');
        tower.setAttribute('ondragstart', 'draggedElement(event,self)')
        tower.classList.add('dynamic');
        this.element = tower;
        parentElement.appendChild(this.element);
        this.element.style.top = y + 'px';
        this.element.style.left = x + 'px';
        return this;
    };
    this.upgrade = function() {
        this.level = this.level + 1;
        this.damage = this.damage + 20;
        this.fireRate = this.fireRate - 4;
        this.range = this.range + 15;
        if (this.level == 2) {
            self.element.style.background = 'pink';
        }
        if (this.level == 3) {
            self.element.style.background = 'black';
        }
    }
    this.updateXandY = function() {
        style = window.getComputedStyle(self.element);
        var top = style.getPropertyValue('top');
        var left = style.getPropertyValue('left');
        top = top.replace('px', '') * 1;
        left = left.replace('px', '') * 1;
        this.x = left;
        this.y = top;
    }
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