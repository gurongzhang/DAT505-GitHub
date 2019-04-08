//Global variables
var scene, camera, renderer;
var geometry, material, mesh, threejs, color;

var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;

//GUI - Declare variable
var gui = null;

//Rotation converter
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};

init();
render();

function init(){
  threejs = document.getElementById('threejs');

  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a renderer  ------------
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x333F47, 1);
  renderer.shadowMap.Enabled = true;
  renderer.shadowMapSoft = true;

  threejs.appendChild(renderer.domElement);

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 1, 1000);
  camera.position.set(0, 0.1, 1);
  camera.lookAt(scene.position);
  scene.add(camera);

  // Create a Cube Mesh with material
  geometry = new THREE.BoxGeometry(2, 2, 2);
  color = Math.random() * 0xffffff;

  for(let i = 0;i<geometry.faces.length;i++){
  let hex = Math.random() * 0xffffff;
  geometry.faces[ i ].color.setHex( hex );
            }

  var material = new THREE.MeshLambertMaterial({
    //ambient: color,
  vertexColors: THREE.FaceColors
    //transparent: true
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, -12);
  mesh.rotation.set(0, 0, 0);
  mesh.rotation.x = de2ra(45);
  mesh.rotation.y = de2ra(-45);
  mesh.scale.set(1, 1, 1);
  mesh.doubleSided = true;
  mesh.castShadow = true;
  scene.add(mesh);

  var mesh1 = new THREE.Mesh(geometry, material);
  mesh1.position.set(2.8, 0, -12);
  mesh1.rotation.set(0, 0, 0);
  mesh1.rotation.x = de2ra(45);
  mesh1.rotation.y = de2ra(-45);
  mesh1.scale.set(1, 1, 1);
  mesh1.doubleSided = true;
  mesh1.castShadow = true;
  scene.add(mesh1);

  var mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.set(5.6, 0, -12);
  mesh2.rotation.set(0, 0, 0);
  mesh2.rotation.x = de2ra(45);
  mesh2.rotation.y = de2ra(-45);
  mesh2.scale.set(1, 1, 1);
  mesh2.doubleSided = true;
  mesh2.castShadow = true;
  scene.add(mesh2);

  var mesh3 = new THREE.Mesh(geometry, material);
  mesh3.position.set(-2.8, 0, -12);
  mesh3.rotation.set(0, 0, 0);
  mesh3.rotation.x = de2ra(45);
  mesh3.rotation.y = de2ra(-45);
  mesh3.scale.set(1, 1, 1);
  mesh3.doubleSided = true;
  mesh3.castShadow = true;
  scene.add(mesh3);

  var mesh4 = new THREE.Mesh(geometry, material);
  mesh4.position.set(-5.6, 0, -12);
  mesh4.rotation.set(0, 0, 0);
  mesh4.rotation.x = de2ra(45);
  mesh4.rotation.y = de2ra(-45);
  mesh4.scale.set(1, 1, 1);
  mesh4.doubleSided = true;
  mesh4.castShadow = true;
  scene.add(mesh4);

  var mesh5 = new THREE.Mesh(geometry, material);
  mesh5.position.set(1.45, 2.5, -12);
  mesh5.rotation.set(0, 0, 0);
  mesh5.rotation.x = de2ra(45);
  mesh5.rotation.y = de2ra(-45);
  mesh5.scale.set(1.03, 1.03, 1.03);
  mesh5.doubleSided = true;
  mesh5.castShadow = true;
  scene.add(mesh5);

  var mesh6 = new THREE.Mesh(geometry, material);
  mesh6.position.set(-1.45, 2.5, -12);
  mesh6.rotation.set(0, 0, 0);
  mesh6.rotation.x = de2ra(45);
  mesh6.rotation.y = de2ra(-45);
  mesh6.scale.set(1.03, 1.03, 1.03);
  mesh6.doubleSided = true;
  mesh6.castShadow = true;
  scene.add(mesh6);

  var mesh7 = new THREE.Mesh(geometry, material);
  mesh7.position.set(-4.4, 2.5, -12);
  mesh7.rotation.set(0, 0, 0);
  mesh7.rotation.x = de2ra(45);
  mesh7.rotation.y = de2ra(-45);
  mesh7.scale.set(1.07, 1.05, 1.05);
  mesh7.doubleSided = true;
  mesh7.castShadow = true;
  scene.add(mesh7);

  var mesh8 = new THREE.Mesh(geometry, material);
  mesh8.position.set(4.4, 2.49, -12);
  mesh8.rotation.set(0, 0, 0);
  mesh8.rotation.x = de2ra(45);
  mesh8.rotation.y = de2ra(-45);
  mesh8.scale.set(1.07, 1.05, 1.05);
  mesh8.doubleSided = true;
  mesh8.castShadow = true;
  scene.add(mesh8);

  mesh9 = new THREE.Mesh(geometry, material);
  mesh9.position.set(0, -4.5, -12);
  mesh9.rotation.set(0, 0, 0);
  mesh9.rotation.x = de2ra(45);
  mesh9.rotation.y = de2ra(-45);
  mesh9.scale.set(0.96, 0.96, 0.96);
  mesh9.doubleSided = true;
  mesh9.castShadow = true;
  scene.add(mesh9);

  mesh10 = new THREE.Mesh(geometry, material);
  mesh10.position.set(-2.65, -4.5, -12);
  mesh10.rotation.set(0, 0, 0);
  mesh10.rotation.x = de2ra(45);
  mesh10.rotation.y = de2ra(-45);
  mesh10.scale.set(0.96, 0.96, 0.96);
  mesh10.doubleSided = true;
  mesh10.castShadow = true;
  scene.add(mesh10);

  mesh11 = new THREE.Mesh(geometry, material);
  mesh11.position.set(2.65, -4.5, -12);
  mesh11.rotation.set(0, 0, 0);
  mesh11.rotation.x = de2ra(45);
  mesh11.rotation.y = de2ra(-45);
  mesh11.scale.set(0.96, 0.96, 0.96);
  mesh11.doubleSided = true;
  mesh11.castShadow = true;
  scene.add(mesh11);

  mesh12 = new THREE.Mesh(geometry, material);
  mesh12.position.set(-5.2, -4.5, -12);
  mesh12.rotation.set(0, 0, 0);
  mesh12.rotation.x = de2ra(45);
  mesh12.rotation.y = de2ra(-45);
  mesh12.scale.set(0.9, 0.9, 0.9);
  mesh12.doubleSided = true;
  mesh12.castShadow = true;
  scene.add(mesh12);

  mesh13 = new THREE.Mesh(geometry, material);
  mesh13.position.set(5.3, -4.5, -12);
  mesh13.rotation.set(0, 0, 0);
  mesh13.rotation.x = de2ra(45);
  mesh13.rotation.y = de2ra(-45);
  mesh13.scale.set(0.96, 0.96, 0.96);
  mesh13.doubleSided = true;
  mesh13.castShadow = true;
  scene.add(mesh13);

  var mesh14 = new THREE.Mesh(geometry, material);
  mesh14.position.set(1.36, -2.33, -12);
  mesh14.rotation.set(0, 0, 0);
  mesh14.rotation.x = de2ra(45);
  mesh14.rotation.y = de2ra(-45);
  mesh14.scale.set(0.96,0.96,0.96);
  mesh14.doubleSided = true;
  mesh14.castShadow = true;
  scene.add(mesh14);

  var mesh18 = new THREE.Mesh(geometry, material);
  mesh18.position.set(6.72, -2.33, -12);
  mesh18.rotation.set(0, 0, 0);
  mesh18.rotation.x = de2ra(45);
  mesh18.rotation.y = de2ra(-45);
  mesh18.scale.set(0.96,0.96,0.96);
  mesh18.doubleSided = true;
  mesh18.castShadow = true;
  scene.add(mesh18);

  var mesh19 = new THREE.Mesh(geometry, material);
  mesh19.position.set(-6.74, -2.33, -12);
  mesh19.rotation.set(0, 0, 0);
  mesh19.rotation.x = de2ra(45);
  mesh19.rotation.y = de2ra(-45);
  mesh19.scale.set(0.96,0.96,0.96);
  mesh19.doubleSided = true;
  mesh19.castShadow = true;
  scene.add(mesh19);

  var mesh15 = new THREE.Mesh(geometry, material);
  mesh15.position.set(-1.36, -2.33, -12);
  mesh15.rotation.set(0, 0, 0);
  mesh15.rotation.x = de2ra(45);
  mesh15.rotation.y = de2ra(-45);
  mesh15.scale.set(0.96,0.96,0.96);
  mesh15.doubleSided = true;
  mesh15.castShadow = true;
  scene.add(mesh15);

  var mesh16 = new THREE.Mesh(geometry, material);
  mesh16.position.set(4.05, -2.33, -12);
  mesh16.rotation.set(0, 0, 0);
  mesh16.rotation.x = de2ra(45);
  mesh16.rotation.y = de2ra(-45);
  mesh16.scale.set(0.96,0.96,0.96);
  mesh16.doubleSided = true;
  mesh16.castShadow = true;
  scene.add(mesh16);

  var mesh17 = new THREE.Mesh(geometry, material);
  mesh17.position.set(-4.05, -2.33, -12);
  mesh17.rotation.set(0, 0, 0);
  mesh17.rotation.x = de2ra(45);
  mesh17.rotation.y = de2ra(-45);
  mesh17.scale.set(0.96,0.96,0.96);
  mesh17.doubleSided = true;
  mesh17.castShadow = true;
  scene.add(mesh17);


  lightingSystem();

  //GUI - Setup the GUI controller
  var controller = new function() {
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.positionX = 0;
    this.positionY = 0;
    this.positionZ = 0;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.boxColor = color;
    //this.castShadow = true;
    this.boxOpacity = 1;
  }();

  var gui = new dat.GUI();
//  var f1 = gui.addFolder('Rotation');
  gui.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh.rotation.x = de2ra(controller.rotationX);
  });
  gui.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh1.rotation.y = de2ra(controller.rotationY);
  });
  gui.add(controller, 'rotationZ', -180, 180).onChange( function() {
    mesh3.rotation.z = de2ra(controller.rotationZ);
  });
  gui.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh5.rotation.x = de2ra(controller.rotationX);
  });
  gui.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh6.rotation.y = de2ra(controller.rotationY);
  });
  gui.add(controller, 'rotationZ', -180, 180).onChange( function() {
    mesh7.rotation.z = de2ra(controller.rotationZ);
  });
  gui.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh8.rotation.x = de2ra(controller.rotationX);
  });
  gui.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh14.rotation.y = de2ra(controller.rotationY);
  });
  gui.add(controller, 'rotationZ', -180, 180).onChange( function() {
    mesh15.rotation.z = de2ra(controller.rotationZ);
  });
  gui.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh16.rotation.x = de2ra(controller.rotationX);
  });
  gui.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh17.rotation.y = de2ra(controller.rotationY);
  });

  //f1.add(controller, 'rotationY', -180, 180).onChange( function() {
//    mesh.rotation.y = de2ra(controller.rotationY);
//  });
//  f1.add(controller, 'rotationZ', -180, 180).onChange( function() {
//    mesh.rotation.z = de2ra(controller.rotationZ);
//  });

  var gui = new dat.GUI();
  gui.addColor( controller, 'boxColor', color ).onChange( function() {
  mesh.material.color.setHex( dec2hex(controller.boxColor) );
  });

  //gui.add( controller, 'castShadow', false ).onChange( function() {
    //mesh.castShadow = controller.castShadow;
  //});

}

//Color converter
function dec2hex(i) {
  var result = "0x000000";
  if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8){return result;}
}


// Render Loop
function render () {
  requestAnimationFrame(render);
  //mesh.rotation.x += 0.01; //Continuously rotate the mesh
  //mesh.rotation.y += 0.01;
  //renderer.setClearColor("#000000");
  // Render the scene
  renderer.render(scene, camera);
};

function lightingSystem(){
  var object3d  = new THREE.DirectionalLight('white', 0.15);
  object3d.position.set(6,3,9);
  object3d.name = 'Back light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.35);
  object3d.position.set(-6, -3, 0);
  object3d.name   = 'Key light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.55);
  object3d.position.set(9, 9, 6);
  object3d.name = 'Fill light';
  scene.add(object3d);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 3, 30, 3 );
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 45;
  scene.add( spotLight );


}
