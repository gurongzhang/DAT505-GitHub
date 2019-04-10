var renderer, scene, camera;
var controls, group;

var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();

//Boolean (true or false) to show if an object has been selected
var selectedObject = null;

init();
animate();

function init() {
  // init renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // init scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  group = new THREE.Group();
  scene.add( group );

  // init camera
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 15, 15, 15 );
  camera.lookAt( scene.position );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableRotate = true;

  // add sprites
  var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f' } ) );
  sprite.position.set( 6, 5, 5 );
  sprite.scale.set( 2, 5, 1 );
  group.add( sprite );

  var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f' } ) );
  sprite.material.rotation = Math.PI / 3 * 4;
  sprite.position.set( 8, - 2, 2 );
  sprite.center.set( 0.5, 0 );
  sprite.scale.set( 1, - 5, 1 );
  group.add( sprite );

  var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f' } ) );
  sprite.position.set( 0, 2, 5 );
  sprite.scale.set( 10, 2, 3 );
  sprite.center.set( - 0.1, 0 );
  sprite.material.rotation = Math.PI / 3;
  group.add( sprite );

  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener( "mousedown", onDocumentMouseDown, false );
}

function animate() {
  renderer.render( scene, camera );
  requestAnimationFrame( animate );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event ) {
  event.preventDefault();
  if ( selectedObject ) {
    selectedObject.material.color.set( '#69f' );
    selectedObject = null;
  }

  var intersects = getIntersects( event.layerX, event.layerY );
  if ( intersects.length > 0 ) {
    var res = intersects.filter( function ( res ) {
      return res && res.object;
    } )[ 0 ];
    if ( res && res.object ) {
      selectedObject = res.object;
      selectedObject.material.color.set( '#f00' );
      console.log(selectedObject.position);
    }
  }
}

function getIntersects( x, y ) {
  x = ( x / window.innerWidth ) * 2 - 1;
  y = - ( y / window.innerHeight ) * 2 + 1;
  mouseVector.set( x, y, 0.5 );
  raycaster.setFromCamera( mouseVector, camera );
  return raycaster.intersectObject( group, true );
}
