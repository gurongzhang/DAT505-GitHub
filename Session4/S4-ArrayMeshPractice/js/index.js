var renderer, scene, camera, mesh;
var controls;
var cubes = [];//array system
var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(20, W / H, .1, 1000);
  camera.position.set(10, 10, 85);
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
  for (var x = -10; x < 10; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -10; y < 10; y += 5) {
      for (var z = -10; z < 10; z += 5) {
        console.log("X:"+x,"Y:"+y,"Z:"+z)
        var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
        //The color of the material is assigned a random color
        //color: Math.random() * 0xFFFFFF
        if(x >= 0 && y>= 0 && z >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color:0xFF00FF});
        }
        if(x >= 0 && y>= 0 && z < 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color:0x0000FF});
        }
        if(x < 0 && y>= 0 && z >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0x4169E1});
        }
        if(x < 0 && y>= 0 && z < 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xF08080});
        }
        if(x >= 0 && y< 0 && z >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF00});
        }
        if(x >= 0 && y< 0 && z < 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0x7B68EE});
        }
        if(x < 0 && y< 0&&z >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFB6C1});
        }
        if(x < 0 && y< 0&&z < 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xDC143C});
        }
        mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        //mesh.castShadow = true;
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.y = 0.5;
        scene.add(mesh);
        cubes.push(mesh);
      }
    }
  }
  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);
 rot += 0.02;
 cubes.forEach(function(c, i){
   c.rotation.x = rot; //Math.random() * 2 * Math.PI;
    c.rotation.y = rot;
     c.rotation.z = rot;
 });
  renderer.render(scene, camera);
}



init();
drawFrame();
