// Food
//
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

  // Constructor
  //
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Also set a minimum and maximum size for this food object which it
  // will vary between when it resets
  constructor(x,y,size,agentColor,minSize,maxSize,maxSpeed) {
    super(x,y,size,agentColor);
    this.minSize = minSize;
    this.maxSize = maxSize;
    //For food movement
    //velocities
    this.vx = 0;
    this.vy = 0;
    //noise parameters
    this.tx = random(0,1000);
    this.ty = random(0,1000);
    this.maxSpeed = maxSpeed;
  }

  //update()
  //
  //Set x and y velocity based on tx and ty
  //Make the food able to warp itself to the other side of the screen when it crosses the canvas' borders
  update() {
  if (this.active == true) {
    //set up random velocities based on perlin noise
    this.vx = map(noise(this.tx), 0, 1, -this.maxSpeed, this.maxSpeed);
    this.vy = map(noise(this.ty), 0, 1, -this.maxSpeed, this.maxSpeed);

    this.x += this.vx;
    this.y += this.vy;

    //warp the food to the other side of the screen if it crosses the canvas' borders
    if(this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }

    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }

    //update the noise parameters (the greater the margin, the more erratic the movement)
    this.tx += 0.01;
    this.ty += 0.01;
  }
  else {
    this.reset();
    this.active = true;
  }
}

  // reset()
  //
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize,this.maxSize);
    this.color = color(random(100,255),random(100,255),random(100,255));
  }
}
