var container = Array.from(
    document.getElementsByClassName("carousel-container")
);

// console.log(imageHolder[0]);
// console.log(imageHolder[0].querySelectorAll('img'));

function CarouselConstructor(container) {
    var IMAGE_WIDTH = 500;
    var IMAGE_WRAPPER_LEFT = 0;
    var IMAGE_WRAPPER_WIDTH = 0;
    var PREVIOUS_BUTTON_SET = false;
    var NEXT_BUTTON_SET = false;
    var NUMBER_OF_INDICATOR_DOTS = 0;
    var INDICATOR_DOTS;
    var DOTS_SET = false;
    // var dots = Array.prototype.slice.call(container.children[2].children)
    this.carouselContainer = container;
    this.imageHolder = this.carouselContainer.children[0];
    this.image = this.carouselContainer.querySelectorAll("img");
    this.buttonHolder = this.carouselContainer.children[1];
    this.dotHolder = this.carouselContainer.children[2];
    this.previousButton = this.buttonHolder.children[0];
    this.nextButton = this.buttonHolder.children[1];
    // Array.prototype.slice.call( htmlCollection )
    // this.dots = Array.prototype.slice.call(this.dotHolder.getElementsByClassName("dot"));
    this.init = function() {
        // console.log(dots)
        this.setImageAbsoluteValue();
        this.setDots();
        // console.log('this is the previous button', this.previousButton);
        this.buttonHolder.style.position = "absolute";
        this.buttonHolder.style.top = "130px";
        this.previousButton.setAttribute(
            "style",
            "position: absolute; left: 5px; font-size: 45px; color: yellow; cursor: pointer"
        );
        this.nextButton.setAttribute(
            "style",
            "position: absolute; left: 479px; font-size: 45px; color: yellow; cursor: pointer"
        );
        this.dotHolder.setAttribute(
            "style",
            "position: absolute; top: 280px; margin: 0 auto"
        );
        this.dotHolder.style.left =
            ((100 - (this.dotHolder.offsetWidth * 100) / IMAGE_WIDTH) *
                (IMAGE_WIDTH / 100)) /
            2 +
            "px";
        this.previousButton.onclick = this.onClickPreviousButton.bind(this);
        this.nextButton.onclick = this.onClickNextButton.bind(this);
        // this.imageHolder.style.left = '-400px';
    };
    this.testingFunction = function() {
        console.log("TEST IS SUCCESSFULL");
    };
    this.setDots = function() {
        var self = this;
        for (var i = 0; i < NUMBER_OF_INDICATOR_DOTS; i++) {
            var dot = document.createElement("div");
            dot.setAttribute(
                "style",
                "height: 8px; width: 8px; border-radius: 50%; display: inline-block; margin-left:10px; cursor: pointer"
            );
            dot.setAttribute("id", i + "");
            dot.setAttribute("class", "dot");
            self.dotHolder.appendChild(dot);
        }
        var dots = Array.from(this.dotHolder.getElementsByClassName("dot"));
        INDICATOR_DOTS = dots;
        dots.forEach(function(item) {
            item.addEventListener("click", function() {
                console.log("ITEM", item);
                item.classList.add("active");
                self.removeActiveStateFromDotClasses(item.getAttribute("id"));
                if (IMAGE_WRAPPER_LEFT > item.getAttribute("id") * -500) {
                    var substractValue =
                        item.getAttribute("id") * 500 - IMAGE_WRAPPER_LEFT * -1;
                    self.transitionFromDots(substractValue, "substract");
                } else if (IMAGE_WRAPPER_LEFT < item.getAttribute("id") * -500) {
                    var addValue =
                        IMAGE_WRAPPER_LEFT * -1 - item.getAttribute("id") * 500;
                    self.transitionFromDots(addValue, "add");
                }
            });
        });
        dots[0].classList.add('active');
    };
    this.transitionFromDots = function(value, todo) {
        var self = this;
        if (DOTS_SET === true) {
            return;
        }
        if (todo === "substract") {
            DOTS_SET = true;
            var count = 0;
            var nextInterval = setInterval(function() {
                if (count === value) {
                    clearInterval(nextInterval);
                    DOTS_SET = false;
                    return;
                }
                IMAGE_WRAPPER_LEFT -= 10;
                self.imageHolder.style.left = IMAGE_WRAPPER_LEFT + "px";
                count += 10;
            }, 1);
        } else if (todo === "add") {
            DOTS_SET = true;
            var count = 0;
            var previousInterval = setInterval(function() {
                if (count === value) {
                    clearInterval(previousInterval);
                    DOTS_SET = false;
                    return;
                }
                IMAGE_WRAPPER_LEFT += 10;
                self.imageHolder.style.left = IMAGE_WRAPPER_LEFT + "px";
                count += 10;
            }, 1);
        }
    };
    this.removeActiveStateFromDotClasses = function(id) {
        INDICATOR_DOTS.forEach(function(item) {
            if (item.getAttribute("id") !== id) {
                item.classList.remove("active");
            }
        });
    };
    this.setImageAbsoluteValue = function() {
        this.image.forEach(function(item, index) {
            item.style.left = index * IMAGE_WIDTH + "px";
            IMAGE_WRAPPER_WIDTH += IMAGE_WIDTH;
            NUMBER_OF_INDICATOR_DOTS += 1;
            // console.log(NUMBER_OF_INDICATOR_DOTS);
        });
    };
    this.onClickPreviousButton = function() {
        if (PREVIOUS_BUTTON_SET === true) {
            return;
        }
        PREVIOUS_BUTTON_SET = true;
        var count = 0;
        var self = this;
        var previousInterval = setInterval(function() {
            if (count === IMAGE_WIDTH) {
                var toSendForRemovingClassName = Math.abs(IMAGE_WRAPPER_LEFT / 500) + "";
                clearInterval(previousInterval);
                PREVIOUS_BUTTON_SET = false;
                // console.log('RETURN DUE TO COMPLETION')
                INDICATOR_DOTS[toSendForRemovingClassName].classList.add("active")
                self.removeActiveStateFromDotClasses(toSendForRemovingClassName);
                return;
            }
            if (IMAGE_WRAPPER_LEFT === 0) {
                clearInterval(previousInterval);
                PREVIOUS_BUTTON_SET = false;
                // console.log('RETURN DUE TO 0 LEFT')
                return;
            }
            IMAGE_WRAPPER_LEFT += 10;
            self.imageHolder.style.left = IMAGE_WRAPPER_LEFT + "px";
            count += 10;
        }, 1);
    };
    this.onClickNextButton = function() {
        if (NEXT_BUTTON_SET === true) {
            return;
        }
        NEXT_BUTTON_SET = true;
        var count = 0;
        var self = this;
        var nextInterval = setInterval(function() {
            if (count === IMAGE_WIDTH) {
                var toSendForRemovingClassName = Math.abs(IMAGE_WRAPPER_LEFT / 500) + "";
                clearInterval(nextInterval);
                NEXT_BUTTON_SET = false;
                INDICATOR_DOTS[toSendForRemovingClassName].classList.add("active")
                self.removeActiveStateFromDotClasses(toSendForRemovingClassName);
                // console.log('RETURN DUE TO COMPLETION')
                return;
            }
            if (IMAGE_WRAPPER_LEFT === (IMAGE_WRAPPER_WIDTH - IMAGE_WIDTH) * -1) {
                clearInterval(nextInterval);
                NEXT_BUTTON_SET = false;
                return;
            }
            IMAGE_WRAPPER_LEFT -= 10;
            self.imageHolder.style.left = IMAGE_WRAPPER_LEFT + "px";
            count += 10;
        }, 1);
    };
    // console.log(this.carouselContainer, this.imageHolder, this.image)
}
container.forEach(function(item, index) {
    var sth = new CarouselConstructor(container[index]);
    console.log("gsgs" + sth);
    sth.init();
});
// console.log(carousel1.carouselContainer)