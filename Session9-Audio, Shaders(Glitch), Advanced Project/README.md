# DAT505-Session9-Audio, Shaders(Glitch), Advanced Project
## Introduction:
#### This session introduced:
  * ### Audio
  * ### Glitch/Shaders
  * ### Supplemental project
#### This session introduced how to **add audio** into the scene and combine the audio with the *Raycasting system*. **Glitch** and **Shaders** were new concepts that introduced to us. In this last session, some other interesting projrcts were given to us as the inspiring resources.
## S9-ClassExample-00-RaycastAudio: *Playing sound effect automatically when moving mouse on the objects*
#### This example is based on the *S8-ClassExamples-02-objLoader-Raycasting*, we studied how to load audio to the scene and adjust the properties of it.
![S9-ClassExample-00-RaycastAudio00](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-0.png "S9-ClassExample-00-RaycastAudio00")
### Knowledge Points
1. The codes relate to loading the audio:
   ```javascript
   // create an AudioListener and add it to the camera
   var listener = new THREE.AudioListener();

   // create a global audio source
   var sound = new THREE.Audio( listener );

   // load a sound and set it as the Audio object's buffer
   var audioLoader = new THREE.AudioLoader();
   var intersects = raycaster.intersectObjects( objects, true );

   if ( intersects.length > 0 ) {
     if ( INTERSECTED != intersects[ 0 ].object ) {
       if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
       INTERSECTED = intersects[ 0 ].object;
       INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
       INTERSECTED.material.emissive.setHex( 0xff0000 );

       audioLoader.load( 'audio/Diploship-Fly.wav', function( buffer ) {
         sound.setBuffer( buffer );
         sound.setLoop( false );
         sound.setVolume( 0.5 );
         sound.play();
       });
     }
   ```
   File to put the audio files in:
   ![S9-ClassExample-00-RaycastAudio00](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-1.png "S9-ClassExample-00-RaycastAudio00")

********************

## S9-ClassExample-01-PostProcessing-Glitch: *Screen effects*
#### In this example, lightings and glith are added to the scene to create cool effects.
![S9-ClassExample-01-PostProcessing-Glitch00](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-2.png "S9-ClassExample-01-PostProcessing-Glitch00")
### Knowledge Points
1. To adding *different glitch* effects:
   *. The relative shader js files should be *copied* to the project file:
      ![S9-ClassExample-01-PostProcessing-Glitch01](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-3.png "S9-ClassExample-01-PostProcessing-Glitch01")
2. Adding script source to **index.html**:
   ![S9-ClassExample-01-PostProcessing-Glitch01](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-9.png "S9-ClassExample-01-PostProcessing-Glitch01")
3. The codes to load shaders:
   ```javascript
   var effectGlitch, effectRGB, motion1, motion2;
   var kaleidoParams, kaleidoPass;
   var rgbPass, rgbParams;
   var renderPass = new THREE.RenderPass(scene, camera);

   rgbPass = new THREE.ShaderPass( THREE.HueSaturationShader);
   composer.addPass ( renderPass );
   composer.addPass ( rgbPass );

   kaleidoPass = new THREE.ShaderPass (THREE.ToneMapShader);
   composer.addPass ( kaleidoPass );

   var glitchPass = new THREE.GlitchPass();
   glitchPass.renderToScreen = true;
   composer.addPass( glitchPass );

   rgbParams = {
     amount: 0.5,
     angle: 0.0
   }

   kaleidoParams = {
     sides: 2,
     angle: 0.0
   }
   ```
   The properties of the shaders can be changed in the corresponding shader js files.
4. The *shader file* is in the catalog: three-3.js-master-r102/examples/js/shaders
5. You can change the property values of different shaders in the corresponding js file to control the effect of how those shaders work so that the final look of the scene will be changed too.

********************

## S9-ClassExample-02-GlitchGUI: *Adding GUI to control the glitch*
#### In this example, **GUI** was *added* to control the *properties of the glitch*.
![S9-ClassExample-02-GlitchGUI00](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-4.png "S9-ClassExample-02-GlitchGUI00")
### Knowledge Points
1. GUI codes:
   ```javascript
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

   onParamsChange();
   ```
   Just like the *describtion* of this project, this **S9-ClassExample-02-GlitchGUI** is the combination of **GUI** and **Glitch**.

********************

## S9-ClassExample-03-PostProcessing-Advanced: *Advanced project*
#### This example is an advanced project which combine the *model*, *shaders*, *textures*.
![S9-ClassExample-03-PostProcessing-Advanced00](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-5.png "S9-ClassExample-03-PostProcessing-Advanced00")
### Knowledge Points
1. Details are all in the **script.js** file.

********************

## S9-MyExamples-00-RaycastAudioexercise: _Loading audio based on the project *S8-MyExamples-01-objLoader-Raycastingexercise*_
#### In this exercise I *downloaded 3 sound effects* and *loaded them to my previous project* **S8-MyExamples-01-objLoader-Raycastingexercise**.
![S9-MyExamples-00-RaycastAudioexercise00](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-6.png "S9-MyExamples-00-RaycastAudioexercise00")
### Knowledge Points
1. First, I downloaded 3 sound effects and put them under the folder **audio**:
   ![S9-MyExamples-00-RaycastAudioexercise01](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-7.png "S9-MyExamples-00-RaycastAudioexercise01")
2. Then loaded them randomly when moving mouse on the object and adjusted the properties of those sound effects:
   ```javascript
   audioLoader.load( "audio/sound"+Math.floor(Math.random()*3)+".wav", function( buffer ) {
     sound.setBuffer( buffer );
     sound.setLoop( false );
     sound.setVolume( 1);
     sound.setPlaybackRate( Math.random() * 2+0.3);
     sound.play();
   ```
********************

## S9-MyExamples-01-PostProcessing-Glitchexercise: *Trying to load different shaders to the scene*
#### In this exercise I loaded *GammaCorrectionShader* and created cool effects.
![S9-MyExamples-01-PostProcessing-Glitchexercise00](/Session9-Audio%2C%20Shaders(Glitch)%2C%20Advanced%20Project/(README)pictures/pic-8.png "S9-MyExamples-01-PostProcessing-Glitchexercise00")
### Knowledge Points
1. What did I add:
   ```javascript
   var gammaCorrectionPass;
   gammaCorrectionPass = new THREE.ShaderPass (THREE.GammaCorrectionShader);
   composer.addPass ( gammaCorrectionPass );
   ```
