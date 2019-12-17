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
        weapon.setAttribute("style", "position: absolute; background: white;");
        weapon.classList.add("dynamic");
        weapon.style.width = width + 'px';
        weapon.style.height = height + 'px';
        weapon.style.top = y + 'px';
        weapon.style.left = x + 'px';
        this.element = weapon;
        parentElement.appendChild(weapon);
        if (towerType = 'archer') {
            var rotateAngle = Math.atan2(self.source.y - self.destination.y, self.source.x - self.destination.x) * 180 / Math.PI
            weapon.style.transform = 'rotate(' + rotateAngle + 'deg)';
        }
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