class Jumper {
  constructor() {
    this.position = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.acceleration = 0;
    this.lateralSpeed = 5;
    this.collided = false;
    this.isInAir = true;
  }

  sideThrust() {
    if (keyIsDown(65)) {
      // A
      this.position.x -= this.lateralSpeed;
    } else if (keyIsDown(68)) {
      // D
      this.position.x += this.lateralSpeed;
    }
  }

  jump() {}

  update() {
    if (this.isInAir) {
      this.sideThrust();
      this.acceleration += 0.0005 * deltaTime;

      this.velocity.add(0, this.acceleration);

      this.position.add(this.velocity);
    } else {
      this.jump();
    }
  }

  display() {
    fill(255);
    circle(this.position.x, this.position.y, 25);
  }
}
