let solarSystem;
let font;
function preload() {
  font = loadFont("./assets/JetBrainsMono-ExtraLight.ttf");
}
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  background(0);

  solarSystem = new SolarSystem(5, random(100, 150), font);
}

function draw() {
  background(0);
  solarSystem.update();
  solarSystem.display();
}
