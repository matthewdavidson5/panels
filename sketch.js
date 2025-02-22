let panels = [];

let cols = 7;
let rows = 7;
let padding = 10; // Space between panels
let panelWidth;
let panelHeight;

function setup() {
  createCanvas(1800, 1800);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Compute panel size so that the entire grid (including padding) fits the canvas
  panelWidth = (width - (cols - 1) * padding) / cols;
  panelHeight = (height - (rows - 1) * padding) / rows; 
  
  let alternateRenderSwitch = 3;

  for (let i = 0; i < cols * rows; i++) {
    let pg = createGraphics(panelWidth, panelHeight);

    if (floor(random(0, 4)) == alternateRenderSwitch) {
      panels[i] = renderPanelTypeCircle(pg);
    } else {
      panels[i] = renderPanelTypeTriangle(pg);
    }
    
  }
}

function draw() {
  background(0, 0, 100);
  let noPanelRenderValue = 1;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (floor(random(0, 8)) == noPanelRenderValue) {
        break; // Skip panel rendering
      }   
      index = x + y * cols;
      image(panels[index], x * (panelWidth + padding), y * (panelHeight + padding));
    }
  }
  applyGrain()
  noLoop();
}

function renderPanelTypeTriangle(pg) {
  let candidateCutouts = [];
  let strokeSwitch = [0, 1];

  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.background(0, 0, 100);

  pg.noFill();
  pg.stroke(0, 0, 25);
  for (let i = 0; i < 500; i++) {
    pg.circle(pg.width * random(), pg.height * random(), pg.width * random());
  }

  // Define possible triangle cutouts
  candidateCutouts.push({
    vertices: [[0, 0], [pg.width, pg.height], [0, pg.height]]
  });

  candidateCutouts.push({
    vertices: [[pg.width, 0], [pg.width, pg.height], [0, pg.height]]
  });

  candidateCutouts.push({
    vertices: [[0, 0], [pg.width, 0], [pg.width, pg.height]]
  });

  candidateCutouts.push({
    vertices: [[0, 0], [pg.width, 0], [0, pg.height]]
  });

  candidateCutouts.push({
    vertices: [[0, 0], [pg.width / 2, pg.height /2], [pg.width, 0]]
  })

  candidateCutouts.push({
    vertices: [[0, pg.height], [pg.width / 2, pg.height /2], [pg.width, pg.height]]
  })

  // Pick a random triangle cutout
  let cutout = candidateCutouts[floor(random(0, candidateCutouts.length))];
  let stroke = strokeSwitch[floor(random(2))]

  // Access the vertices directly from the array
  let [vx1, vy1] = cutout.vertices[0];
  let [vx2, vy2] = cutout.vertices[1];
  let [vx3, vy3] = cutout.vertices[2];

  pg.fill(0, 0, 100);
  
  if (stroke == 1) {
    pg.stroke(0, 0, 0);
  } else {
    pg.noStroke();
  }
  pg.triangle(vx1, vy1, vx2, vy2, vx3, vy3);

  return pg;
}


function renderPanelTypeCircle(pg) {
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.background(0, 0, 100);

  pg.noFill();
  let centerOffset = 0;
  let diameter = pg.width / 4;
  for (let i = 0; i < 10; i++) {
    pg.fill(0, 0, 100);
    pg.circle(pg.width / 2 + centerOffset, pg.height / 2 + centerOffset, diameter);
    centerOffset += 2.5;
  } 

  return pg;
}

function applyGrain(grainAmount = 50) {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let grain = random(-grainAmount, grainAmount); // Random noise
    pixels[i] += grain;     // Red
    pixels[i + 1] += grain; // Green
    pixels[i + 2] += grain; // Blue
  }
  updatePixels();
}
