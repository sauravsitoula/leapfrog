function Pipe_Top(parentElement, index) {
    this.height = null;
    this.x = 660;
    this.y = 0;
    this.parentElement = parentElement;
    this.element = null;
    this.type = 'top';
    this.width = 100
    this.createPipe = function() {
        var pipe = document.createElement('div');
        pipe.setAttribute('style', 'position: absolute; width: 100px; background: url(./images/pipe-top.png); background-size: contain');
        pipe.classList.add('dynamic');
        this.parentElement.appendChild(pipe);
        this.element = pipe;
        this.setInitialPosition();
        return this;
    }
    this.setInitialPosition = function() {
        this.element.style.top = 0 + 'px';
        this.element.style.left = 660 + 'px';
    }
    this.setPipeHeight = function(height) {
        this.element.style.height = height + 'px';
        this.height = height;
    }
    this.setPipePosition = function(speed) {
        this.x = this.x - speed;
        this.animatePipe();
    }
    this.animatePipe = function() {
        this.element.style.left = this.x + 'px';
    }
}

function Pipe_Bottom(parentElement, index) {
    this.height = null;
    this.x = 660;
    this.y = null;
    this.parentElement = parentElement;
    this.element = null;
    this.type = 'bottom';
    this.width = 100;
    this.createPipe = function() {
        var pipe = document.createElement('div');
        pipe.setAttribute('style', 'position: absolute; width: 100px; background: url(./images/pipe-bottom.png);');
        pipe.classList.add('dynamic');
        this.parentElement.appendChild(pipe);
        this.element = pipe;
        this.setInitialPosition();
        return this;
    }
    this.setInitialPosition = function() {

        this.element.style.left = 660 + 'px';
    }
    this.setPipeHeight = function(height) {
        this.element.style.top = (660 - height) + 'px';
        this.y = 660 - height;
        this.element.style.height = height + 'px';
        this.height = height;
    }
    this.setPipePosition = function(speed) {
        this.x = this.x - speed;
        this.animatePipe();
    }
    this.animatePipe = function() {
        this.element.style.left = this.x + 'px';
    }
}