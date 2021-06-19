class Particle {
  constructor(x, y) {
    this.lifespan = 5;
    this.acceleration = 5;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.speed = 5;
  }

  draw() {
    stroke(255, this.lifespan);
    circle(this.position.x, this.position.y, 5);
  }
  update() {
    this.acceleration += this.speed;

    this.velocity.add(this.acceleration);
    this.posiition.add(this.velocity);
  }
}
