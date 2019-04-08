var renderer, scene, camera;
var controls;
var cubes = [];
var rot_spd = [];

function init() {

  console.log("Init Function Starts");

  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(10, 20, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 500, 0);
  scene.add(spotLight);

  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0, 500, 0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);

  controls = new THREE.OrbitControls(camera, renderer.domElement);


for (var x = -10; x <= 10; x += 5 ) {
  for (var y = -10; y <= 10; y += 5) {
    var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
   if (x==-5 && y==-5){
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
   }else{
          boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
   if (x==5 && y==5){
          boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
   }else {
          boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
        }
   }

   var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
       mesh.position.x = x;
       mesh.position.y = y;
       mesh.rotation.x = Math.random() * 2 * Math.PI;
       mesh.rotation.y = Math.random() * 2 * Math.PI;
       mesh.rotation.z = Math.random() * 2 * Math.PI;

     rot_spd.push(Math.random() * 0.1 - 0.05);

   scene.add( mesh );
   cubes.push(mesh);
    }
}
document.body.appendChild(renderer.domElement);

}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  cubes.forEach(function(c, i){
        cubes[6].rotation.x +=  rot_spd[i];
        cubes[18].rotation.x += rot_spd[i];
  });

  renderer.render(scene, camera);
}

init();
drawFrame();
