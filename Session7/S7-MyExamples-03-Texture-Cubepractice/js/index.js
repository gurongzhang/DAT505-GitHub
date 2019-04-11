//Setup the global variables
var camera, scene, renderer, geometry, material, mesh;
var texture;
// Arrays
var cubes = [];
var spd = [];

function init() {
	// Create a scene
	scene = new THREE.Scene();
	// Create a geometry
	// 	Create a box (cube) of 10 width, length, and height
	for (var x = 0; x < 10; x ++) { // Start from -35 and sequentially add one every 5 pixels
    // Define the 'randomValue' whose range is: [0,0.5)
		var randomValue = Math.random()*0.5;
	geometry = new THREE.BoxGeometry(10,10,10);
	// Load a texture
	var texture = new THREE.TextureLoader().load( "textures/texture"+ Math.floor(Math.random()*4)+".jpg" );
	// Create a MeshBasicMaterial with a loaded texture
	material = new THREE.MeshBasicMaterial( { map: texture} );
	// Combine the geometry and material into a mesh
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.x=(Math.random()*30)-15;
	mesh.position.y=(Math.random()*30)-15;
	// Add the mesh to the scene
	scene.add( mesh );
	cubes.push(mesh);
	// Push the random value ranging[0,0.5) into array spd[i]
	spd.push(randomValue);
}
	// Create a camera
	// 	Set a Field of View (FOV) of 75 degrees
	// 	Set an Apsect Ratio of the inner width divided by the inner height of the window
	//	Set the 'Near' distance at which the camera will start rendering scene objects to 2
	//	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000 );
	// Move the camera 'out' by 30
	camera.position.z = 30;
	// Create a WebGL Rendered
	renderer = new THREE.WebGLRenderer();
	// Set the size of the rendered to the inner width and inner height of the window
	renderer.setSize( window.innerWidth, window.innerHeight );
	// Add in the created DOM element to the body of the document
	document.body.appendChild( renderer.domElement );
}

function animate() {
	// Call the requestAnimationFrame function on the animate function
	// 	(thus creating an infinite loop)
	requestAnimationFrame( animate );

	// Rotate the x position of the mesh by 0.03
	cubes.forEach(function(c, i) {
	// Rotate the x position of the mesh by 0.02
  c.rotation.x += 0.02;
	// Rotate the y position of the mesh by 0.01
	c.rotation.y += 0.01;
	//Move the mesh towards the bottom of the screen
	c.position.y -= spd[i];

	//If the mesh passes the bottom of the screen,
	//make it appear on the top. Also x position is randomized
	if (c.position.y <- 30){
		c.position.y = 35;
		c.position.x = (Math.random() * -20) +10;
		c.scale.x = (Math.random() * -2) +1;
		c.scale.y = (Math.random() * -2) +1;
		c.scale.z = (Math.random() * -2) +1;
	}
});

	// Render everything using the created renderer, scene, and camera
	renderer.render( scene, camera );
}

init();
animate();
