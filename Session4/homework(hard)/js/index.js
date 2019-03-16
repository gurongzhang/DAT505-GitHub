var renderer, scene, camera;
var cubes = [];
var rot_spd = [];
var rot_spd1 = [];
var rot_spd2 = [];
var rot_cur = [];
var rot_cur1 = [];
var rot_cur2 = [];
// var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(15, W / H, .1, 1000);
  camera.position.set(0, 300, 0);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);


  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -35; x < 40; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -35; y < 40; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;

      scene.add(mesh);
      cubes.push(mesh);
      rot_spd.push(Math.random() * 0.1 - 0.05);
      rot_spd1.push(Math.random() * 0.1 - 0.02);
      rot_spd2.push(Math.random() * 0.1 - 0.08);
      rot_cur.push(0);
      rot_cur1.push(0);
      rot_cur2.push(0);
    }
  }

 console.log(rot_spd);
 console.log(rot_spd.length);
 console.log(rot_cur);


  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);


  // rot += 0.01;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    rot_cur[i] += rot_spd[i];
    rot_cur1[i] += rot_spd1[i];
    rot_cur2[i] += rot_spd2[i];
    c.rotation.x = rot_cur[i];
    c.rotation.y = rot_cur1[i];
    c.rotation.z = rot_cur2[i];//Rotate the object that is referenced in c
  });
  // for (var x = 0; x < ; x += 1) {
  //
  // }

  renderer.render(scene, camera);
}

init();
drawFrame();
