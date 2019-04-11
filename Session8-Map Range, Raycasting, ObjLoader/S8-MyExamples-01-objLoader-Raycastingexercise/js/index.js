var container, stats;
var camera, scene, raycaster, renderer;
var controls;
var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
var object;
var selectedObject = null;
var objects = [];

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );


  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  //aboutOrbitControls
  camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);
  var light = new THREE.DirectionalLight( 0xffffff, 3 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );
  //aboutOrbitControls
  controls = new THREE.OrbitControls(camera,container);

  // Create 100 models
  for (var i=0; i<100; i++){

  // Model/material loading
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("female02.mtl", function(materials){

		materials.preload();

    var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);

  		objLoader.load("female02.obj", function(mesh){
  			mesh.traverse(function(node){
  				if( node instanceof THREE.Mesh ){
  					node.castShadow = true;
  					node.receiveShadow = true;
  				}
  			});
        var sizeRand = Math.random() * 0.5;
        //to set the different scales of models but keep the scale of every single modle the same
        mesh.scale.set(sizeRand,sizeRand,sizeRand);
        mesh.position.set(Math.random()*200-100, Math.random()*200-100, Math.random()*200-100);
        mesh.rotation.y = -Math.PI/Math.random()*4;
        // Add mesh to scene
        scene.add(mesh);
        //Add to the array so that we can access for raycasting
        objects.push(mesh);
  		});
  	});
  }

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //container.appendChild( stats.dom );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false  );
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
// Select the object conditionally under the mouse click
function onDocumentMouseDown( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    if ( selectedObject ) {
      selectedObject = null;
    }
  }

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  //Find intersections
  raycaster.setFromCamera( mouse, camera );
  renderer.render( scene, camera );

  var intersects = raycaster.intersectObjects( objects, true );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      // Everytime when mouse click on the eligible objects , change their colors to random colors
      INTERSECTED.material.emissive.setHex(  Math.random() * 0xFFFFFF  );
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = null;
    }
}


init();
animate();
