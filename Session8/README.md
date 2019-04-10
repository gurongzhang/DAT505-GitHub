# DAT505-Session8
## Introduction:
#### This session introduced:
  * ### map_range function
  * ### Raycasting(onDocumentMouseDown function, onDocumentMouseMove function)
#### This session firstly introduced the map_range to optimize the 'eyes-interaction' project, then we studied the Raycasting and how to load models and materials in our project.
## S8-ClassExamples-00-Texture-Eyes-Interaction2X: *Optimizing the 'eyes-interaction' project*
#### This example demonstrates how to limit the rotation range of corner-located eyes with **map_range**.
![S8-ClassExamples-00-Texture-Eyes-Interaction2X00](/Session8/(README)pictures/pic-0.png "S8-ClassExamples-00-Texture-Eyes-Interaction2X00")
### Knowledge Points
1. To my understanding, **map_range** is something that can transfer a range to another range:
   ```javascript
   xPosMap[i] = map_range(xPos[i], -50, 50, 0, window.innerWidth);
   ```
    This line means, when the values of the array 'xPos[i]' range from (-50,50), transferring them to range(0, window.innerWidth), and store those transferred values into array 'xPosMap'.
2. In this example, 'map_range' is used to limit the rotation range of eyes:
   ```javascript
   var eyesNum = 5;
   for (var i = 0; i < eyesNum; i++) {
     eyes[0].rotation.y = map_range(mouseX, 0, window.innerWidth, -1.14, 1.14);
     eyes[0].rotation.x = map_range(mouseY, 0, window.innerHeight, -1.14, 1.14);

     if (mouseX<140) eyes[1].rotation.y = map_range(mouseX, 0, 140, -0.2, 0.25);
     else eyes[1].rotation.y = map_range(mouseX, 140, window.innerWidth, 0.25, 1.14);
     if (mouseY<810) eyes[1].rotation.x = map_range(mouseY, 0, 810, -1.14, -0.25);
     else eyes[1].rotation.x = map_range(mouseY, 810, window.innerHeight, -0.25, 0);

     if (mouseX<140) eyes[3].rotation.y = map_range(mouseX, 0, 140, -0.2, 0.25);
     else eyes[3].rotation.y = map_range(mouseX, 140, window.innerWidth, 0.25, 1.14);
     if (mouseY<35) eyes[3].rotation.x = map_range(mouseY, 0, 35, 0, 0.25);
     else eyes[3].rotation.x = map_range(mouseY, 35, window.innerHeight, 0.25, 1.14);
    }
   ```
   The value range inside the 'map_range' are not the exact value after precise calculation, they are relatively appropriate values.

********************

## S8-ClassExamples-01-RaycastSprite: *Changing cubes' color by clicking*
#### In this example, when clicking the cubes, their color will change to red and their positions will be printed in console.
![S8-ClassExamples-01-RaycastSprite00](/Session8/(README)pictures/pic-1.png "S8-ClassExamples-01-RaycastSprite00")
### Knowledge Points
1. This example uses **Raycasting system** to know wether we choose an object or not, to know more about it:
   [Threejs Raycaster](https://threejs.org/docs/index.html#api/en/core/Raycaster)
2. The codes about changing color and printing console after we do the click is down below:
   ```javascript
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
   ```
   The objects we pick are the blue(color'#69f') objects, and after we clicking them, they will change color to red(color'#f00'). Meanwhile, the console will print the position(x,y,z) of those objects.

********************

## S8-ClassExamples-02-objLoader-Raycasting: *500 loading-material models who will change color when mouse moving on them*
#### In this example, 'for loop' was used to create 500 objects and when the 'raycasting system' detected those objects, the color of them will turn red.
![S8-ClassExamples-02-objLoader-Raycasting00](/Session8/(README)pictures/pic-2.png "S8-ClassExamples-02-objLoader-Raycasting00")
### Knowledge Points
1. To loading model and material:
   ```javascript
   // Model/material loading!
   var mtlLoader = new THREE.MTLLoader();
   mtlLoader.load("Blocks.mtl", function(materials){

   materials.preload();

   var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load("ship.obj", function(mesh){
      mesh.traverse(function(node){
        if( node instanceof THREE.Mesh ){
          node.castShadow = true;
          node.receiveShadow = true;
        }
     });
   ```
  Do not forget to copy the model file, material file and other js files into the project file:
  ![S8-ClassExamples-02-objLoader-Raycasting01](/Session8/(README)pictures/pic-3.png "S8-ClassExamples-02-objLoader-Raycasting01")
2. To pick the object that when mouse move on them and thir color will change:
   ```javascript
   function onDocumentMouseMove( event ) {
     event.preventDefault();
     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
   }

   //
   function animate() {
     requestAnimationFrame( animate );

     render();
     //stats.update();
   }

   function render() {
     //Auto rotate camera
     theta += 0.1;
     camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
     camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
     camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
     camera.lookAt( scene.position );
     camera.updateMatrixWorld();

     //Find intersections
     raycaster.setFromCamera( mouse, camera );
     //var intersects = raycaster.intersectObjects( scene.children );

     var intersects = raycaster.intersectObjects( objects, true );

     if ( intersects.length > 0 ) {
       if ( INTERSECTED != intersects[ 0 ].object ) {
         if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
         INTERSECTED = intersects[ 0 ].object;
         INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
         INTERSECTED.material.emissive.setHex( 0xff0000 );
       }
     } else {
       if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
       INTERSECTED = null;
     }
   ```

********************

## S8-MyExamples-00-RaycastSpriteexercise: *Changing cubes' color by moving mouse on them*
#### In this exercise, when moving the mouse on cubes, their color will change to random hex color and when clicking on them, their positions will be printed in console.
![S8-MyExamples-00-RaycastSpriteexercise00](/Session8/(README)pictures/pic-4.png "S8-MyExamples-00-RaycastSpriteexercise00")
### Knowledge Points
1. The difference between *S8-ClassExamples-01-RaycastSprite* and *S8-MyExamples-00-RaycastSpriteexercise* is that, in *S8-ClassExamples-01-RaycastSprite*, the condition for cubes to change color is clicking them. However, in this exercise, the condition for cubes to change color is moving mouse on them, so there are something needs to change in the script:
   ```javascript
   unction onDocumentMouseMove( event ) {
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
         selectedObject.material.color.setHex( Math.random() * 0xFFFFFF );
       }
     }
   }
   ```
   As we can see in the code above, we change **onDocumentMouseDown** to **onDocumentMouseMove**, and set the color to the random color.
2. Since we still need to click on objects to print their positions in console, the *onDocumentMouseDown* code is still needed:
   ```javascript
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
         console.log(selectedObject.scale);
       }
     }
   }
   ```

********************

## S8-MyExamples-01-objLoader-Raycastingexercise: *Loading my own objects and when mouse clicking on them, their color will change to a random hex color*
#### In this exercise, I tried to load my own models and materials. Meanwhile, I replaced the automatically rotating camera with OrbitControls.
![S8-MyExamples-01-objLoader-Raycastingexercise00](/Session8/(README)pictures/pic-5.png "S8-MyExamples-01-objLoader-Raycastingexercise00")
### Knowledge Points
*. I think the main knowledges are well explained above, the only thing I want to mention in this project is different model and material may have different textures files or other relative files, you should make sure you copy all files you needs in the project file.

   ![S8-MyExamples-01-objLoader-Raycastingexercise01](/Session8/(README)pictures/pic-6.png "S8-MyExamples-01-objLoader-Raycastingexercise01")
