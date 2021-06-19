class Planet {
  constructor(radius, color, position) {
    this.radius = radius;
    this.color = color;
    this.position = position;

    this.surface = new Surface(this.color);
  }

  display() {
    stroke(...this.color);
    strokeWeight(2);
    fill(0, 0);

    circle(this.position.x, this.position.y, this.radius * 2);
  }
}
