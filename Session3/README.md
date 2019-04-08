# DAT505-Session3
## Introduction:
#### This session introduced the concept of GUI(Graphical User Interface). From my understanding, GUI means users can change different values on the user interface directly instead of changing them in the code sources. What is more, we did our own creative GUI projects based on what we learned:
  * ### GUI
  * ### Controller(Scale, Position, Rotation, Color, Opacity)
  * ### Color converter
## S3-ClassExamples-00-BasicStructure-GUI: *Cube(scale,position,rotation)*
#### This example shows that users can change the *rotation*, *position* and *scale* of the cube directly on the user interface.
![S3-ClassExamples-00-BasicStructure-GUI00](/Session3/(README)pictures/pic-0.png "S3-ClassExamples-00-BasicStructure-GUI00")
### Knowledge Points
  1. To use GUI, one line of code that shows the script source containing the _**dat.gui.min.js** file_ must be added to the _**index.html** file_.
  ```javascript
    <script src="js/dat.gui.min.js"></script>
  ```
  * Meanwhile, the _**dat.gui.min.js** file_ should be copied to the _**js** file_ too.
     ![S3-ClassExamples-00-BasicStructure-GUI01](/Session3/(README)pictures/pic-1.png "S3-ClassExamples-00-BasicStructure-GUI01")
  2. The following code will determine the initial value of different properties:
     ```javascript
     var controller = new function (){
       this.scaleX = 1 ;
       this.scaleY = 1 ;
       this.scaleZ = 1 ;

       this.positionX = 1 ;
       this.positionY = 1 ;
       this.positionZ = -400 ;

       this.rotationX = 1 ;
       this.rotationY = 1 ;
       this.rotationZ = 1 ;
     }
     ```
     Since the *rotation*, *position* and *scale* are the 3D properties which can be changed from X,Y and Z. So for users to see those properties conveniently, we need to add different folders to sort them out and put the relevant values under the corresponding folders:
     ```javascript
     var gui = new dat.GUI();
     var f1 = gui.addFolder('Scale');
     var f2 = gui.addFolder('Position');
     var f3 = gui.addFolder('Rotation');

     f1.add(controller, 'scaleX', 0.1, 5).onChange( function(){
     mesh.scale.x = (controller.scaleX);
     });
     f1.add(controller, 'scaleY', 0.1, 5).onChange( function(){
     mesh.scale.y = (controller.scaleY);
     });
     f1.add(controller, 'scaleZ', 0.1, 5).onChange( function(){
     mesh.scale.z = (controller.scaleZ);
     });

     f2.add(controller, 'positionX', 0.1, 100).onChange( function(){
     mesh.position.x = (controller.positionX);
     });
     f2.add(controller, 'positionY', 0.1, 100).onChange( function(){
     mesh.position.y = (controller.positionY);
     });
     f2.add(controller, 'positionZ',-5000, -400).onChange( function(){
     mesh.position.z = (controller.positionZ);
     });

     f3.add(controller, 'rotationX', -3.14, 3.14).onChange( function(){
     mesh.rotation.x = (controller.rotationX);
     });
     f3.add(controller, 'rotationY', -3.14, 3.14).onChange( function(){
     mesh.rotation.y = (controller.rotationY);
     });
     f3.add(controller, 'rotationZ', -3.14, 3.14).onChange( function(){
     mesh.rotation.z = (controller.rotationZ);
     });
     ```

**************************


## S3-ClassExamples-01-BasicGUI: *Cube(scale,position,rotation,color,opacity)*
#### This example added two more properties —— *color* and *opacity* so that users can change the *rotation*, *position*, *scale*, *color* and *opacity* of the cube directly on the user interface.
![S3-ClassExamples-01-BasicGUI00](/Session3/(README)pictures/pic-2.png "S3-ClassExamples-01-BasicGUI00")
### Knowledge Points
  1. To add the **Color converter**, the code below needs to be written to the script:
     ```javascript
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
     ```
     Do not forget to define the random color at the begining:
     ```javascript
     var color;
     color = Math.random() * 0xffffff;
     ```
  2. For adding the **opacity**:
     ```javascript
     var controller = new function() {
       this.boxOpacity = 1;
     }();
     gui.add( controller, 'boxOpacity', 0.1, 1 ).onChange( function() {
       material.opacity = (controller.boxOpacity);
     });
     ```

**************************

## S3-MyExamples-00-GUICubes: *Cubes(users can change their rotation on the UI)*
#### For this exercise, I created 20 cubes who have different colors for each surface and change to random color everytime refresh the page. I also  added rotation controllers and color controller for users controlling the X,Y,Z rotation and the color of those cubes on the UI.
![S3-MyExamples-00-GUICubes00](/Session3/(README)pictures/pic-3.png "S3-MyExamples-00-GUICubes00")
### Knowledge Points
  1. The basic code for setting the cube and the rotation controller is showed below:
  ```javascript
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, -12);
  mesh.rotation.x = de2ra(45);
  mesh.rotation.y = de2ra(-45);
  mesh.scale.set(1, 1, 1);
  scene.add(mesh);

  var gui = new dat.GUI();
  gui.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh.rotation.x = de2ra(controller.rotationX);
  });
  ```

  2. How to set up the color controller is already aforesaid mentioned.

  3. To creating the random-different-surfaces-color cube, the following code is for reference:
  ```javascript
  geometry = new THREE.BoxGeometry(2, 2, 2);
  color = Math.random() * 0xffffff;

  for(let i = 0;i<geometry.faces.length;i++){
  let hex = Math.random() * 0xffffff;
  geometry.faces[ i ].color.setHex( hex );
  }

  var material = new THREE.MeshLambertMaterial({
                 vertexColors: THREE.FaceColors
  });
  ```
