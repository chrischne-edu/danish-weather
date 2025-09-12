let centerLon = 10.59033122678802
let centerLat = 55.94851448756923

let projection = d3
  .geoMercator()
  .center([centerLon, centerLat])
  .translate([300, 300])
  .scale(5000);

let geoData;
let weatherData;

let countries = [];
let particles = [];
let quadtree;

function preload() {
  geoData = loadJSON("world.geojson");
  weatherData = loadJSON("weather-DK.json");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('sketch-container');

  weatherData = weatherData.data;
  console.log(weatherData);

  countries = geoData.features.filter(function (d) {
    return d.properties.CNTR_ID == "DK";
  });

  // create particles
  for (let i = 0; i < 2000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let p = new Particle(x, y);
    particles.push(p);
  }

  quadtree = d3
    .quadtree()
    .x(function (d) {
      return projection([d.coord.lon, d.coord.lat])[0];
    })
    .y(function (d) {
      return projection([d.coord.lon, d.coord.lat])[1];
    })
    .addAll(weatherData);

    background(255,255,0);
}

function draw() {

  drawCountry(countries[0]);


  // draw wind
  // for (let i = 0; i < weatherData.length; i++) {
  //   let wind = weatherData[i].wind;
  //   let lon = weatherData[i].coord.lon;
  //   let lat = weatherData[i].coord.lat;
  //   let xy = projection([lon, lat]);
  //   let x = xy[0];
  //   let y = xy[1];
  //   let v = createVector(10, 0);
  //   v.setHeading(radians(wind.deg - 90 - 180));
  //   fill(0,20);
  //   noStroke();
  //   ellipse(x, y, 3, 3);
  //   stroke(0,20);
  //   line(x, y, x + v.x, y + v.y);
  // }

  // draw particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevPos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.age = 0;
    this.maxAge = random(10,50);
  }

  update() {
    // find closest weather measurement
    let weatherStation = quadtree.find(this.pos.x, this.pos.y);
    let dir = weatherStation.wind.deg;
    let windspeed = weatherStation.wind.speed;

    // update acceleration
    this.acc.set(1, 0);
    this.acc.setHeading(radians(dir - 90 - 180));
    this.acc.normalize();
    this.acc.mult(0.5*windspeed);

    // update speed
    this.vel.add(this.acc);
    this.vel.limit(1);

    // set previous position
    this.prevPos = this.pos.copy();

    // update position
    this.pos.add(this.vel);

    this.age++;

    // reposition particle sometimes
    if (this.age > this.maxAge) {
      this.age = 0;
      this.pos = createVector(random(0, width), random(0, height));
      this.prevPos = this.pos.copy();
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
    }
  }

  display() {
    stroke(255,50);
    strokeWeight(2);
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
  }
}

function drawCountry(country) {
  if (!country) return;

  if (country.geometry.type === "Polygon") {
    noStroke();
    fill(70,10);
    drawPolygon(country);
  } else if (country.geometry.type === "MultiPolygon") {
    noStroke();
    fill(70,10);
    drawMultiPolygon(country);
  }
}


/*
Drawing Functions for GEOJSON Features
---------------------------------------------------------------------------*/
function drawPolygon(feature) {
  for (let i = 0; i < feature.geometry.coordinates.length; i++) {
    let ring = feature.geometry.coordinates[i];
    beginShape();
    for (let j = 0; j < ring.length; j++) {
      let coord = ring[j];
      let coords = projection(coord);
      let x = coords[0];
      let y = coords[1];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

function drawMultiPolygon(feature) {
  for (let i = 0; i < feature.geometry.coordinates.length; i++) {
    let polygon = feature.geometry.coordinates[i];
    for (let j = 0; j < polygon.length; j++) {
      let ring = polygon[j];
      beginShape();
      for (let k = 0; k < ring.length; k++) {
        let coord = ring[k];
        let coords = projection(coord);
        let x = coords[0];
        let y = coords[1];
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
}
