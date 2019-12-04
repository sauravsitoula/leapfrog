function Bird(parentElement) {
    this.x = 170;
    this.y = 382;
    this.height = 42;
    this.width = 56;
    this.lowBound = 660;
    this.highBound = 650;
    this.parentElement = parentElement;
    this.element = null;
    this.createBird = function() {
        var bird = document.createElement('div');
        bird.setAttribute('style', 'height: 42px; width: 56px; background: url(./images/new-flappy.gif); position: absolute');
        bird.classList.add('dynamic');
        this.parentElement.appendChild(bird);
        this.element = bird;
        this.setInitialPosition();
        return this;
    };
    this.setBirdPosition = function(position) {
        this.y = position;
        this.animateBird();
    };
    this.animateBird = function() {

        this.element.style.top = this.y + 'px';
    };
    this.setInitialPosition = function() {
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    };
};