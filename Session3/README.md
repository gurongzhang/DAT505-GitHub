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
   Since the *rotation*, *position* and *scale* are the 3D properties which can be changed from X,Y and Z. So for users to see those categories conveniently, we need to add different folders to sort those properties out and put therelevant values under the corresponding folders:
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
