var amp,fft;
var volhistory = [];
var x,y;
var darkness;
var slider;
var stop=false;
var count=0;
var state=0;


function setup() {
  
  createCanvas(windowWidth, windowHeight);
    
  let button = createButton("reset sketch");
  button.mousePressed(resetSketch);
  
  
  angleMode(DEGREES);
	amp = new p5.AudioIn();
	amp.start()
	background(255, 255, 255);
	fft = new p5.FFT(0.9,64);
	fft.setInput(amp)	
	y=0
  
  
	slider = createSlider(1, 10, 0);
	// slider.position(20,360);
  
    // textAlign(CENTER);
    // text('Time', 200, 35); 
  
}


function resetSketch() {
     angleMode(DEGREES);
	amp = new p5.AudioIn();
	amp.start()
	background(255, 255, 255);
	fft = new p5.FFT(0.9,64);
	fft.setInput(amp)	
	y=0


}

function mousePressed() {
	if(stop){
	loop()
	stop=false;
	}else{
	noLoop();
	stop=true;
	}
  
}


function draw() {	
  
	var vol = amp.getLevel();
	noFill();

 var spectrum= fft.analyze();
	darkness=map(vol,0,0.01,255,0)
	moveX=map(vol,0,0.01,0,100)
	stroke(darkness)
	noFill()
	translate(width/2,height/2)
	rotate(frameCount/slider.value());
	beginShape();
  
  for (let i = 0; i< spectrum.length-40; i++){
    let x = map(i, 0, spectrum.length-40, 0, width/4);
    let y = -map(spectrum[i], 0, 255, 0, 150);
		vertex(x,y)

  }
	endShape();
    
}