var renderer, scene, camera;
var cubes = [];
var rot_spd = [];
var radius = 2;
var size = [];

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  for (var x = -10; x <= 10; x += 5) { // Start from -10 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {
      var boxGeometry = new THREE.IcosahedronGeometry(radius, 2);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshBasicMaterial({
           color: Math.random() * 0xFFFFFF,
           wireframe : true
         });
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
          mesh.position.x = x;
          mesh.position.z = y;
          mesh.rotation.x= Math.random()* 1 * Math.PI/2;
          mesh.rotation.y= Math.random()* 1 * Math.PI/2;
          mesh.rotation.z= Math.random()* 1 * Math.PI/2;

      var thingssize = Math.random()* 10 * Math.PI/2;

      scene.add(mesh);
      cubes.push(mesh);
      rot_spd.push(Math.random()* 0.01 - 0.005);
      size.push(-thingssize);
    }
  }

  document.body.appendChild(renderer.domElement);
}


function drawFrame(){
  requestAnimationFrame(drawFrame);
  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    c.scale.x = size[i];
    c.scale.y = size[i];
    c.scale.z = size[i];
    size[i] += 0.1;
  if (size[i] > 10) size[i] = -10;

    c.position.x = 0;
    c.position.y = 0;
    c.position.z = 0;
    c.rotation.x += rot_spd[i];
    c.rotation.y += rot_spd[i];
    c.rotation.z += rot_spd[i];
  });
console.log("size:" + size );
  renderer.render(scene, camera);
}

init();
drawFrame();
