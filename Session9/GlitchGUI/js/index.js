var renderer, scene, camera, composer, circle, skelet, particle;
var hueSat, toneMap, glitch;
var hueSatParams, toneMapParams, glitchParams;
var hueSatPass, toneMapPass, glitchPass;

window.onload = function() {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  circle = new THREE.Object3D();
  skelet = new THREE.Object3D();
  particle = new THREE.Object3D();

  scene.add(circle);
  scene.add(skelet);
  scene.add(particle);

  var geometry = new THREE.TetrahedronGeometry(2, 0);
  var geom = new THREE.IcosahedronGeometry(7, 1);
  var geom2 = new THREE.IcosahedronGeometry(15, 1);

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  //Create the particle system -------------------------------------------------
  for (var i = 0; i < 2000; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(1 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    var randScale = Math.random() * 5;
    mesh.scale.set(randScale, randScale, randScale);
    particle.add(mesh);
  }
  //----------------------------------------------------------------------------

  var mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  var mat2 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
  });

  var planet = new THREE.Mesh(geom, mat);
  planet.scale.x = planet.scale.y = planet.scale.z = 16;
  circle.add(planet);

  var planet2 = new THREE.Mesh(geom2, mat2);
  planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
  skelet.add(planet2);

  //Lights ---------------------------------------------------------------------
  var ambientLight = new THREE.AmbientLight(0x999999 );
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight( 0xffffff, 0.2 );
  lights[0].position.set( 1, 2, -0.5);
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.3 );
  lights[1].position.set( 1, -1, 0.5 );
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.7 );
  lights[2].position.set( -1., -1, -0.1 );
  lights[3] = new THREE.DirectionalLight( 0x8200C9, 0.8 );
  lights[3].position.set( -1., 2, -1 );
  scene.add( lights[0] );
  scene.add( lights[1] );
  scene.add( lights[2] );
  scene.add( lights[3] );
  //----------------------------------------------------------------------------

  //Postprocessing
  composer = new THREE.EffectComposer( renderer );
  //composer.addPass( new THREE.RenderPass( scene, camera ) );
  var renderPass = new THREE.RenderPass(scene, camera);

  hueSatPass = new THREE.ShaderPass( THREE.HueSaturationShader);
  composer.addPass ( renderPass );
  composer.addPass ( hueSatPass );

  toneMapPass = new THREE.ShaderPass (THREE.ToneMapShader);
  composer.addPass ( toneMapPass );

  glitchPass = new THREE.GlitchPass();
  glitchPass.renderToScreen = true;
  composer.addPass( glitchPass );

  //GUI ------------------------------------------------------------------------
  hueSatParams = {
    hue: 0.,
    saturation: 0.5
  }

  toneMapParams = {
    averageLuminance: 0.001,
    minLuminance: 0.0,
    maxLuminance: 100
  }

  glitchParams = {
    amount: 0.01,
    minLuminance: 0.0,
    maxLuminance: 100
  }

  var gui = new dat.GUI();

  var hueSat = gui.addFolder('HueSaturation');
  hueSat.add(hueSatParams, 'hue', 0, 1).step(0.01).onChange(onParamsChange);
  hueSat.add(hueSatParams, 'saturation', 0, 1).step(0.01).onChange(onParamsChange);
  hueSat.open();

  toneMap = gui.addFolder('ToneMap');
  toneMap.add(toneMapParams, 'averageLuminance', 0, 1).step(0.001).onChange(onParamsChange);
  toneMap.add(toneMapParams, 'minLuminance', 0, 1).step(0.01).onChange(onParamsChange);
  toneMap.add(toneMapParams, 'maxLuminance', 0, 3000).step(1).onChange(onParamsChange);
  toneMap.open();

  glitch = gui.addFolder('Glitch');
  glitch.add(glitchParams, 'amount', 0, 100).step(0.01).onChange(onParamsChange);
  //glitch.add(glitchParams, 'minLuminance', 0, 1).step(0.01).onChange(onParamsChange);
  //glitch.add(glitchParams, 'maxLuminance', 0, 3000).step(1).onChange(onParamsChange);
  glitch.open();

  onParamsChange();
  //----------------------------------------------------------------------------

  window.addEventListener('resize', onWindowResize, false);
};

function onParamsChange(){
  hueSatPass.uniforms["hue"].value = hueSatParams.hue;
  hueSatPass.uniforms["saturation"].value = hueSatParams.saturation;

  toneMapPass.uniforms["averageLuminance"].value = toneMapParams.averageLuminance;
  toneMapPass.uniforms["minLuminance"].value = toneMapParams.minLuminance;
  toneMapPass.uniforms["maxLuminance"].value = toneMapParams.maxLuminance;

  glitchPass.uniforms["amount"].value = glitchParams.amount;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize( window.innerWidth, window.innerHeight );
}

function animate(ts) {
  requestAnimationFrame(animate);
  //var delta = clock.getDelta()

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  circle.rotation.x -= 0.0020;
  circle.rotation.y -= 0.0030;
  skelet.rotation.x -= 0.0010;
  skelet.rotation.y += 0.0020;
  //renderer.clear();

  //renderer.render( scene, camera )
  composer.render(0.1);
};
