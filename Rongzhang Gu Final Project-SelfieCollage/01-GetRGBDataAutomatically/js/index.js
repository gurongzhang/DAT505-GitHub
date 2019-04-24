var renderer, scene, camera, controls;
var imgTexture = new THREE.ImageLoader().load("image.jpg");
var cubes=[];
var color = [];
var pixelnum = 40;
var imgwidth,imgheight;

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
	camera = new THREE.PerspectiveCamera(10, W / H, .1, 1000);
	camera.position.set(0, 0, 300);
	camera.lookAt(scene.position);
  // Add 3 spot lights in the scene
	var spotLight = new THREE.SpotLight(0xFFFFFF);
	spotLight.position.set(0, 1000, 0);
	var spotLight1 = new THREE.SpotLight(0xFFFFFF);
	spotLight1.position.set(1000, 0, 0);
	var spotLight2 = new THREE.SpotLight(0xFFFFFF);
	spotLight2.position.set(0, 0, 1000);
	scene.add(spotLight);
	scene.add(spotLight1);
	scene.add(spotLight2);
  // Set renderer
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor(0x17293a);
	renderer.setSize(W, H);
	document.body.appendChild(renderer.domElement);
  // Set OrbitControls to know the scene better
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	// Create a two dimensional grid(x,y) of objects, and position them accordingly
  // Start from -20 and sequentially add one every 1 pixels
	for (var x = -20; x < 20; x += 1) {
  	for (var y = -20; y < 20; y += 1) {
			// Create 1600 Cube Meshes with Lambert material
		  var boxGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
		  var boxMaterial = new THREE.MeshLambertMaterial();
	  	var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
		      mesh.position.x = x;
	    	  mesh.position.y = y;
	 scene.add(mesh);
	 // Push those meshes into array
	 cubes.push(mesh);
	  }
  }
}

// Transferrd RGB colors to Hex colors
function RGB2Hex(clr) {
    var r = clr[0];// The first element 
    var g = clr[1];// The second element
    var b = clr[2];// The third element

    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
 }

function drawFrame(){
	requestAnimationFrame(drawFrame);
  // Get the RGB data of the image
	var imagedata = getImageData( imgTexture );
  // Execute the loop 1600 times and each time it is executed, get the RGB data of one pixel and save it in color[]
	// Then transfered the RGB colors to Hex colors in function RGB2Hex(clr)
	// Use the transfered Hex color to define the color of the cubes
	for (var x = 0; x < pixelnum; x += 1) {
		for (var y = 0; y < pixelnum; y += 1) {

			color[x * pixelnum + y] = getPixel( imagedata,parseInt((imgwidth)/pixelnum * x),parseInt(imgheight-1-(imgheight)/pixelnum * y));
		}
	}

	cubes.forEach(function(c, i) {
		// Set the color of those 1600 cubes
		c.material.color.set(RGB2Hex(color[i]));
	});
	renderer.render(scene, camera);
}

init();
drawFrame();
