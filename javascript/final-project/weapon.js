var Weapon = function(
    parentElement,
    x,
    y,
    destination_x,
    destination_y,
    width,
    height,
    angle,
    speed,
    damage,
    towerType
) {
    var count = 1;
    var self = this;
    this.x = x;
    this.y = y;
    this.element = null;
    this.towerType = towerType
    this.damage = damage;
    this.source = {
        x: x,
        y: y
    };
    this.destination = {
        x: destination_x,
        y: destination_y
    };
    this.angle = angle;
    this.speed = speed;
    this.createWeapon = function() {
        var weapon = document.createElement("div");
        weapon.setAttribute("style", "position: absolute;");
        weapon.classList.add("dynamic");
        if (towerType == 'ice') {
            weapon.style.backgroundColor = 'white';
        } else if (towerType == 'magic') {
            weapon.style.backgroundColor = 'lightBlue';
        } else if (towerType == 'cannon') {
            weapon.style.backgroundColor = 'black';
        } else if (towerType == 'archer') {
            var rotateAngle = Math.atan2(self.source.y - self.destination.y, self.source.x - self.destination.x) * 180 / Math.PI
            weapon.style.transform = 'rotate(' + rotateAngle + 'deg)';
            weapon.style.backgroundColor = 'black';
        }
        weapon.style.width = width + 'px';
        weapon.style.height = height + 'px';
        weapon.style.top = y + 'px';
        weapon.style.left = x + 'px';
        weapon.style.borderRadius = '50%';
        this.element = weapon;
        parentElement.appendChild(weapon);

        return this;
    };
    this.move = function(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }
    this.draw = function() {
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }
};