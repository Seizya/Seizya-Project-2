// - character ----------------------------------------------------------------
function Character() {
    this.position = new Point();
    this.size = 0;
}

Character.prototype.init = function (size) {
    this.size = size;
};
// CharaShot0-------------------------
function CharaShot0() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

CharaShot0.prototype.set = function (p, vector, size, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.speed = speed;
    this.vector = vector;
    this.alive = true;
};
CharaShot0.prototype.move = function () {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;
    if (
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ) {
        this.alive = false;
    }
};
// CharaShot1-------------------------
function CharaShot1() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

CharaShot1.prototype.set = function (p, vector, size, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.speed = speed;
    this.vector = vector;
    this.alive = true;
};
CharaShot1.prototype.move = function () {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;
    if (
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ) {
        this.alive = false;
    }
};
// CharaShot2-------------------------
function CharaShot2() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

CharaShot2.prototype.set = function (p, vector, size, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.speed = speed;
    this.vector = vector;
    this.alive = true;
};
CharaShot2.prototype.move = function () {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;
    if (
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ) {
        this.alive = false;
    }
};

// - enemy-------------------------------------------------------------
function Enemy() {
    this.position = new Point();
    this.size = 100;
    this.type = 0;
    this.param = 0;
    this.alive = false;
}

Enemy.prototype.set = function (p, size, type) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.type = type;
    this.param = 0;
    this.alive = true;
};

Enemy.prototype.move = function () {
    this.param++;
    switch (this.type) {
        case 0:
            this.position.x += 3;
            if (this.position.x > this.size + screenCanvas.width)
                this.alive = false;
            break;
        case 1:
            this.position.x -= 3;
            if (this.position.x < -this.size)
                this.alive = false;
            break;
    }
};
// enemy shot-------------------------
function EnemyShot() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

EnemyShot.prototype.set = function (p, vector, size, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.vector.x = vector.x;
    this.vector.y = vector.y;
    this.size = size;
    this.speed = speed;
    this.alive = true;
};

EnemyShot.prototype.move = function () {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;
    if (
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ) {
        this.alive = false;
    }
};
//BOSS----------------------------------------------------------------------------------------------------------------------------------------
function Boss() {
    this.position = new Point();
    this.size = 100;
    this.type = 0;
    this.param = 0;
    this.alive = false;
}

Boss.prototype.set = function (p, size, type) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.type = type;
    this.param = 0;
    this.alive = true;
};

Boss.prototype.move = function () {
    this.param++;
    if (this.position.y < (screenCanvas.height - this.size) / 2) {
        this.position.y += 1;
    };
}
// boss shot-------------------------
function BossShot() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

BossShot.prototype.set = function (p, vector, size, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.speed = speed;
    this.vector = vector;
    this.alive = true;
};
BossShot.prototype.move = function () {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;
    if (
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ) {
        this.alive = false;
    }
};
