class Player {
  constructor() {
    this.screenWidth = windowWidth;
    this.screenHeight = windowHeight;
    this.position = createVector(windowWidth / 2, windowHeight / 2 + 100);
    this.height = 20;
    this.width = 10;
    this.rotation = 0;
    this.rotationRate = 5;

    this.velocity = createVector(0, 0);
    this.acceleration = 0;
    this.accelerationRate = 0.2;
    this.maxSpeed = 5;

    this.health = 100;

    this.fireTimer = 0;
    this.fireRate = 100; // ms
    this.bullets = [];
  }

  calculateColor() {
    return [255, (127 / 50) * this.health, (127 / 50) * this.health];
  }

  shoot() {
    if (this.fireTimer > this.fireRate) {
      if (keyIsDown(32)) {
        const bulletVelocity = createVector(
          sin(this.rotation),
          -cos(this.rotation)
        );
        const bullet = new Bullet(this.position, bulletVelocity);
        this.bullets.push(bullet);
        this.fireTimer = 0;
      }
    }
  }

  display() {
    stroke(...this.calculateColor());
    strokeWeight(1);
    fill(0);

    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    // left, top, right
    triangle(
      -this.width / 2,
      this.height / 2,
      0,
      -this.height,
      this.width / 2,
      this.height / 2
    );
    pop();

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
      this.bullets[i].display();
    }
  }

  rotateLeft() {
    this.rotation = (this.rotation - this.rotationRate + 360 * deltaTime) % 360;
  }
  rotateRight() {
    this.rotation = (this.rotation + this.rotationRate + 360 * deltaTime) % 360;
  }

  updateRotation() {
    // rotation
    if (keyIsDown(65)) {
      // A
      this.rotateLeft();
    } else if (keyIsDown(68)) {
      // D
      this.rotateRight();
    }
  }

  checkBulletEdges() {
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];

      if (
        bullet.position.x > windowWidth ||
        bullet.position.x < 0 ||
        bullet.position.y < 0 ||
        bullet.position.y > windowHeight
      ) {
        this.bullets.splice(i, 1);
      }
    }
  }
  updateMovement() {
    if (keyIsDown(87)) {
      // W
      this.acceleration += this.accelerationRate;
    }

    this.velocity.add(
      (sin(this.rotation) * this.acceleration * deltaTime) / 10,
      (-cos(this.rotation) * this.acceleration * deltaTime) / 10
    );

    this.velocity.limit(10);

    // edge handling (bounce)

    this.position.add(this.velocity);
    if (this.position.x < this.height) {
      this.position.x = this.height;
      this.velocity.mult(-0.5, 1); // accurate reflection
    }
    if (this.position.x > windowWidth - this.height) {
      this.position.x = windowWidth - this.height;
      this.velocity.mult(-0.5, 1);
    }
    if (this.position.y < this.width) {
      this.position.y = this.width;
      this.velocity.mult(1, -0.5);
    }
    if (this.position.y > windowHeight - this.width) {
      this.position.y = windowHeight - this.width;
      this.velocity.mult(1, -0.5);
    }

    this.acceleration = 0;
  }
  update() {
    this.updateRotation();
    this.updateMovement();
    this.shoot();
    this.checkBulletEdges();

    this.fireTimer += deltaTime;
  }
}
