var renderer, scene, camera, controls;
var imgTexture = new THREE.ImageLoader().load("image.jpg");
var cubes=[];
var color = [];
var pixelnum = 40;
var imgwidth,imgheight;
var spd = [];


function getImageData( image ) {

		 var canvas = document.createElement( 'canvas' );
		 imgwidth = canvas.width = image.width;
		 imgheight = canvas.height = image.height;

		 var context = canvas.getContext( '2d' );
		 //drawImage(image, dx, dy)
		 //'image' can be HTMLImageElement, HTMLCanvasElement or HTMLVideoElement.
	   //'dx' and 'dy' are the coordinates of image positioning in canvas
		 context.drawImage( image, 0, 0 );

     // context.getImageData(x,y,width,height);
		 // 'x':Start copying the x-coordinate of the upper-left corner position of the image.
		 // 'y':Start copying the y-coordinate of the upper-left corner position of the image.
		 // 'width':The width of the rectangular region which is going to be copied.
		 // 'height':The height of the rectangular region which is going to be copied.
		 return context.getImageData( 0, 0, image.width, image.height );
 }

 // Get pixels
 function getPixel( imagedata, x, y) {
	   // Get the position of the pixels
		 var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
		 // Get rgb color data of the pixels
     var rgb = [data[ position ],data[ position + 1 ], data[ position + 2 ]];
	   // Ruturn the r,g,b, values(3 values)
		 return rgb;
 }

// Basic settings(scene, camera, spotLight, renderer, OrbitControls)
// Set the cubes we need
function init() {
	// Add scene
	scene = new THREE.Scene();
  // Set camera
	var W = window.innerWidth,H = window.innerHeight;
	camera = new THREE.PerspectiveCamera(20, W / H, 0.1, 1000);
	camera.position.set(0, 0, 300);
	camera.lookAt(scene.position);
  // Add 3 spot lights in the scene
	//light from the top
	var ambient = new THREE.AmbientLight(0xffffff);
	var spotLight = new THREE.SpotLight(Math.random()*0xFFFFFF);
	spotLight.position.set(0, 10, 0);
	//light from the right
	var spotLight1 = new THREE.SpotLight(Math.random()*0xFFFFFF);
	spotLight1.position.set(10, 0, 0);
	//light from the front
	var spotLight2 = new THREE.SpotLight(0xFFFFFF);
	spotLight2.position.set(0, 0, 10);
	scene.add(spotLight);
	scene.add(spotLight1);
	scene.add(spotLight2);
	scene.add(ambient);
  // Set renderer
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor(0x17293a);
	renderer.setSize(W, H);
	document.body.appendChild(renderer.domElement);
  // Set OrbitControls to know the scene better
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	// Create a two dimensional grid(x,y) of objects, and position them accordingly
  // Start from -20 and sequentially add one every 1 pixels
	for (var x = -40; x < 40; x += 2) {
  	for (var y = -40; y < 40; y += 2) {
			// Create 1600 Cube Meshes with Lambert material
		  var boxGeometry = new THREE.BoxGeometry();
		  var boxMaterial = new THREE.MeshLambertMaterial();
	  	var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
		      mesh.position.x = x;
	    	  mesh.position.y = y;
   spd.push(Math.random()* 10 -5);
	 scene.add(mesh);
	 // Push those meshes into array
	 cubes.push(mesh);
	  }
  }
}

function RGB2Hex(clr) {
    var r = clr[0];
    var g = clr[1];
    var b = clr[2];

    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
 }

function drawFrame(){
	requestAnimationFrame(drawFrame);
  var imagedata = getImageData( imgTexture);

	for (var x = 0; x < pixelnum; x += 1) {
		for (var y = 0; y < pixelnum; y += 1) {

			color[x * pixelnum + y] = getPixel( imagedata,parseInt((imgwidth)/pixelnum * x),parseInt(imgheight-1-(imgheight)/pixelnum * y));
		}
	}

	cubes.forEach(function(c, i) {
		// Set the color of those 1600 cubes
		c.material.color.set(RGB2Hex(color[i]));
		c.scale.x = color[i][0]*0.01;
		c.scale.y = color[i][1]*0.01;
		c.scale.z = color[i][2]*0.2;

  	c.position.z += spd[i];
		if (c.position.z > 20) spd[i] = -spd[i];
		if (c.position.z < -20) spd[i] = -spd[i];
	});
	renderer.render(scene, camera);
}

init();
drawFrame();
