var renderer, scene, camera;
var cubes = [];
var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.y = 400;
  camera.position.z = 400;
  camera.rotation.x = -45 * Math.PI / 180;

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  for (var x = -35; x < 40; x += 5) { 
    for (var y = -35; y < 40; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(30, 30, 30);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        //wireframe:true,
      });

      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      var box = new THREE.BoxHelper( mesh, 0xffff00 );
       scene.add( box );
      //mesh.castShadow = true;

      mesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
      mesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
      mesh.position.y = Math.floor( Math.random() * 200 - 100 ) * 4;
      scene.add(mesh);
      cubes.push(mesh);
    }
  }

  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  cubes.forEach(function(c, i) {
    var wireframe = new THREE.WireframeGeometry( cubes );

     var line = new THREE.LineSegments( wireframe );
     line.material.depthTest = false;
     line.material.opacity = 0.25;
     line.material.transparent = true;

     scene.add( line );
    });

  renderer.render(scene, camera);
}

init();
drawFrame();
