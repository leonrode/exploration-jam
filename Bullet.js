class Bullet {
  constructor(position, velocity) {
    this.velocity = velocity.copy();
    this.position = position.copy();
    this.speed = 25;
    this.acceleration;
  }

  update() {
    this.velocity.setMag(this.speed);
    this.position.add(this.velocity);
  }

  display() {
    fill(255);
    circle(this.position.x, this.position.y, 2);
  }
}
