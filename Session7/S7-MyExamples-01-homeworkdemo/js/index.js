var camera, scene, renderer;
var image;
var mouseX, mouseY;
var ppx;
var ppy;
var container, stats;
// Set for convenience
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// Basic settings
// 'Eye' settings(mesh,texture)
function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
  // Add scene
	scene = new THREE.Scene();
  // Add a Perspective Camera
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 150 );
	var light = new THREE.PointLight( 0xffffff, 1 );
	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	camera.add( light );
	scene.add( camera ); // since light is child of camera
	// Set mesh for the 'eye'
  // Set 'Eye' geometry
	var geometry = new THREE.SphereGeometry( 30, 32, 16 );
	// Set 'Eye' material
	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});
  // modify UVs to accommodate MatCap texture
	var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
	for ( i = 0; i < faceVertexUvs.length; i ++ ) {
		var uvs = faceVertexUvs[ i ];
		var face = geometry.faces[ i ];
		for ( var j = 0; j < 3; j ++ ) {
			uvs[ j ].x = face.vertexNormals[ j ].x * 0.5 + 0.5;
			uvs[ j ].y = face.vertexNormals[ j ].y * 0.5 + 0.5;
		}
	}
  // Set mesh
  mesh = new THREE.Mesh( geometry, material );
	// Randomize the position
	mesh.position.x = (Math.random()*90)-45;
	mesh.position.y = (Math.random()*90)-45;
	// Transfer the 3D world coordinate of the 'eye' to screen mouse coordinate
	ppx = (mesh.position.x / 40) * windowHalfX;
	ppy = (-mesh.position.y /40) * windowHalfY;
	// Add mesh to scene
	scene.add( mesh );
  // Set renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	console.log(window.innerHeight)
	// Make the 'eye' rotate with the mouse
	mesh.rotation.x = mouseY/window.innerHeight*2;
	mesh.rotation.y = mouseX/window.innerWidth*2;

	renderer.render( scene, camera );
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
	// Make the transferred coordinate of the 'eye' the origin of the screen
  mouseX = event.clientX - windowHalfX-ppx;
  mouseY = event.clientY - windowHalfY-ppy;
}


init();
animate();
