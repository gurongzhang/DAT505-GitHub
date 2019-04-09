// MatCap-style image rendered on a sphere
// modify sphere UVs instead of using a ShaderMaterial

var camera, scene, renderer;
var image;
var mouseX = 0, mouseY = 0;
var container, stats;
var spheres = [];
var mousex = [];
var mousey = [];
var mousexary = [];
var mouseyary = [];
var ppx;
var ppy;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 150 );
  scene.add( camera ); // since light is child of camera

	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	var light = new THREE.PointLight( 0xffffff, 1 );
	camera.add( light );

	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});
for (var x = 0; x < 10; x ++) {
	var geometry = new THREE.SphereGeometry( 15, 16, 8 );


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

  mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = (Math.random()*120)-60;
	mesh.position.y = (Math.random()*120)-60;
	ppx = (mesh.position.x / 60) * windowHalfX;
	ppy = (-mesh.position.y /50) * windowHalfY ;
	scene.add( mesh );
	spheres.push(mesh);
	mousex.push(ppx);
	mousey.push(ppy);
}
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}
//console.log(ppx,ppy);
function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
//	console.log(window.innerHeight)
spheres.forEach(function(c, i) {
	c.rotation.x = mouseyary[i]/window.innerHeight*3;
	c.rotation.y = mousexary[i]/window.innerWidth*3;
});
	renderer.render( scene, camera );
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
	mousex.forEach(function(c, i) {
	mouseX = event.clientX - windowHalfX-mousex[i];
	mousexary[i] = mouseX;
	mouseY = event.clientY - windowHalfY-mousey[i];
	mouseyary[i] = mouseY;
	});
	console.log(mousexary);
}
