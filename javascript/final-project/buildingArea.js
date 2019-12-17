function Building_Area(parentElement, x, y) {
    this.x = x;
    this.y = y;
    this.element = null;
    this.BuildTower = function() {
        var tower = document.createElement('div');
        tower.setAttribute('style', 'height: 50px; width: 20px; position: absolute; background: red');
        tower.classList.add('dynamic');
        this.element = tower;
        parentElement.appendChild(this.element);
        this.element.style.top = y + 'px';
        this.element.style.left = x + 'px';
        return this;
    };

}