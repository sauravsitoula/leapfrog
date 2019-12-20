function Status_Bar(parentElement, x, y, height, width, statusValue) {
    var self = this;
    this.appended = false;
    this.x = x;
    this.y = y;
    this.element = null;
    this.innerElement = null;
    this.statusValue = statusValue;
    this.initialStatus = statusValue;
    this.createStatusBar = function() {
        var status = document.createElement('div');
        status.setAttribute('style', 'position: absolute;');
        status.style.top = y + 'px';
        status.style.left = x + 'px';
        status.style.width = width + 'px';
        status.style.height = height + 'px';
        status.classList.add('dynamic')
        var bar = document.createElement('div');
        status.appendChild(bar);
        bar.setAttribute('style', 'height:105%; background:green;');
        this.element = status;
        this.innerElement = bar;
        this.setStatusValue(100)
        return this;
    }
    this.setStatusValue = function(status) {
        this.innerElement.style.width = status + '%';
        if (status < 100 && this.appended == false) {
            parentElement.appendChild(this.element);
            this.appended = true;
        }
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
}