"use strict";
class Player {
    constructor(element) {
        this.element = element;
        this.last = 1;
        this.lastTime = new Date();
        this.direction = 'r';
        this.x = 0;
        this.flowers = [];
        this.labelOpened = false;
        this.handlingFlower = false;
        this.activeFlower = undefined;
        setInterval(() => {
            if (this.direction === 'r') {
                this.element.style.backgroundImage = "url('player_right.png')";
            }
            else {
                this.element.style.backgroundImage = "url('player_left.png')";
            }
        }, 1000);
    }
    handleRightArrow() {
        this.direction = 'r';
        const diff = (Number(new Date())) - Number(this.lastTime);
        if (diff < 100) {
            return;
        }
        this.x += 25;
        this.element.style.setProperty("left", this.x.toString() + "px");
        if (this.last === 1) {
            this.element.style.backgroundImage = "url('player_right_2.png')";
            this.last = 2;
        }
        else {
            this.last = 1;
            this.element.style.backgroundImage = "url('player_right_1.webp')";
        }
        this.lastTime = new Date();
    }
    handleLeftArrow() {
        this.direction = 'l';
        const diff = (Number(new Date())) - Number(this.lastTime);
        if (diff < 100) {
            return;
        }
        this.x -= 25;
        this.element.style.setProperty("left", this.x.toString() + "px");
        if (this.last === 1) {
            this.element.style.backgroundImage = "url('player_left_2.png')";
            this.last = 2;
        }
        else {
            this.last = 1;
            this.element.style.backgroundImage = "url('player_left_1.webp')";
        }
        this.lastTime = new Date();
    }
    logic() {
        if (this.x < -100) {
            this.x = window.innerWidth;
        }
        if (this.x > window.innerWidth) {
            this.x = -100;
        }
        this.flowers = this.flowers.map((item) => {
            if (this.openedFlower !== undefined) {
                if (this.openedFlower.inHand) {
                    item.x = this.x;
                    this.openedFlower.element.classList.add("animate");
                }
                else {
                    this.openedFlower.element.classList.remove("animate");
                }
            }
            if (-150 < this.x - item.x && this.x - item.x < 150) {
                this.labelOpened = true;
                this.openedFlower = item.flower;
                if (this.openedFlower !== undefined) {
                    if (this.openedFlower.inHand) {
                        item.flower.closeLabel();
                    }
                    else {
                        item.flower.showLabel();
                    }
                }
            }
            else {
                this.labelOpened = false;
                this.openedFlower = undefined;
                item.flower.closeLabel();
            }
            return item;
        });
        if (this.openedFlower !== undefined) {
            if (this.openedFlower.inHand) {
                this.openedFlower.toHand();
            }
        }
    }
    addFlower(flower) {
        this.flowers.push({
            x: flower.x,
            flower: flower
        });
    }
    handleUpArrow() {
        if (this.labelOpened) {
            if (typeof this.openedFlower !== "undefined") {
                if (!this.openedFlower.inHand) {
                    this.openedFlower.inHand = true;
                    this.handlingFlower = true;
                }
            }
        }
    }
    handleDownArrow() {
        if (typeof this.openedFlower !== "undefined") {
            if (this.openedFlower.inHand) {
                this.openedFlower.inHand = false;
                this.handlingFlower = false;
            }
        }
    }
}
const flowers = {
    size: [
        "big",
        "small"
    ],
    color: [
        "yellow",
        "red"
    ],
    stem_size: [
        "big",
        "small"
    ]
};
class Flower {
    constructor(x, size, color, stem_size) {
        this.x = Number(x);
        this.inHand = false;
        this.element = document.createElement("div");
        this.element.setAttribute("class", "flower");
        this.element.style.setProperty("left", this.x + "px");
        const flowerTop = document.createElement("div");
        flowerTop.setAttribute("class", "top");
        flowerTop.setAttribute("image", `/flower/${size}/${color}.png`);
        flowerTop.style.backgroundImage = `url('/flower/${size}/${color}.png')`;
        this.element.appendChild(flowerTop);
        const stem = document.createElement("div");
        stem.setAttribute("class", "stem rotating");
        stem.style.setProperty("height", stem_size + "px");
        this.element.appendChild(stem);
        const flowerBottom = document.createElement("div");
        flowerBottom.setAttribute("class", "bottom");
        this.element.appendChild(flowerBottom);
        const flowers = document.getElementById("flowers");
        flowers.appendChild(this.element);
        this.label = document.createElement("div");
        this.label.classList.add("label");
        this.label.innerText = "Hello World";
        this.label.style.setProperty("left", x + "px");
        const labels = document.getElementById("labels");
        labels.appendChild(this.label);
        player.addFlower(this);
    }
    updateLabel() {
        this.label.style.setProperty("left", this.x + "px");
    }
    showLabel() {
        this.updateLabel();
        this.label.classList.add("open");
    }
    closeLabel() {
        this.label.classList.remove("open");
    }
    toHand() {
        this.x = player.x;
        this.element.style.setProperty("left", this.x + "px");
    }
}
const playerEl = document.getElementById("player");
let player;
if (playerEl !== null) {
    player = new Player(playerEl);
    new Flower(Math.floor(Math.random() * 1000), "small", "red", String(Math.floor(Math.random() * 300)));
    if (document !== null) {
        document.addEventListener("keydown", (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                player.handleLeftArrow();
            }
            if (e.key === 'ArrowRight' || e.key === 'd') {
                player.handleRightArrow();
            }
            if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w' || e.key.toLowerCase() === ' ') {
                player.handleUpArrow();
            }
            if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's' || e.key.toLowerCase() === ' ') {
                player.handleDownArrow();
            }
            player.logic();
        });
    }
}
