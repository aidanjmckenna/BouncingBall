/*
 * This program sketch is copied from Even Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Xiannong Meng
 * 2022-06-25
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 *
 * Aidan McKenna
 * 2022-12-01
 *
 * Additional Revisions
 * Now that it is December, I decided to make some Christmas themed changes to get excited for the holidays. 
 * 1. I removed the reference to the Apollo launch audio file and replaced it with Christmas Time Is Here from A Charlie Brown Christmas. 
 * 2. I played around with the text in the textbox by changing the text to 'Merry Christmas!', changing the color of the text so that it is always red, and changing the font. 
 * 3. I learned about p5js shapes and where things are located by adding a basic Christmas tree in the background using rectangles and triangles. I assigned colors to these shapes as well. 
 * The program can also be found on my github page here: https://aidanjmckenna.github.io/BouncingBall/
 */

const BOX_WIDTH  = 200;  // textbox dimensions
const BOX_HEIGHT = 100;

var balls = [];
var sound;
var testBall;

function preload() {
  sound = loadSound("Vince Guaraldi Trio - Christmas Time Is Here (Vocal).mp3");
}

function setup() {

//  createCanvas(windowWidth, windowHeight);
  createCanvas(600,400)

  
  noStroke();
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 10; ballNum++) {
  	balls[ballNum] = new Ball();  
  }

  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 0;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  rect(0, 0, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(24);           // size of the text (pixels)
  fill(215, 0, 64);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  textFont('Courier New', 20)
  text('Merry Christmas!', BOX_WIDTH/2 , BOX_HEIGHT/2);   
 
}

function createTree() {
  strokeWeight(4)
  fill(150, 100, 20)
  rect(400, 340, 40, 60)
  
  fill(14, 200, 30)
  triangle(330, 340, 510, 340, 420, 150 )
  
  triangle(350, 250, 490, 250, 420, 90 )
  

}

function draw() {

  background(255);
  createBox();
  createTree();
  
  testBallMove();  // a special ball to test corner collision
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    
    if (mouseIsPressed) {
      balls[ballNum].randomize()
    }
  }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  testBall.checkForHitBox();
  testBall.moveBall();
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255)
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;

//    if (((this.ballX-radius) > BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) || d < radius) {
    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT)) {
      // bump into the textbox, need to reverse direction
      this.reverseBall()
      ;
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}
