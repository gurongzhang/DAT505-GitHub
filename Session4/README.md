# DAT505-Session4
## Introduction:
#### This session introduced:
  * ### Array System
  * ### For Loop
#### We studied how to use **For Loop** to *create objects efficiently* and how to use **Array** to _assaign different values for individual objects which created by *for loop*_.
## S4-ClassExamples-00-ArrayMesh: *5 Cubes Created By For Loop*
#### This is one example shows how to create five cubes by using for loop.
![S4-ClassExamples-00-ArrayMesh00](/Session4/(README)pictures/pic-0.png "S4-ClassExamples-00-ArrayMesh00")
### Knowledge Points
1. [For Loop(百度百科)](https://baike.baidu.com/item/for循环/5755435?fr=aladdin) shows the chinese definition of **For Loop**.
   [For Loop(Wikipedia)](https://en.wikipedia.org/wiki/For_loop) shows the english definition of **For Loop**.
   For DAT505, for loop is used for creating massive objects efficiently, the note down below is made on the fourth class of the workshop, it explained how *for loop* works:
   ![S4-ClassExamples-00-ArrayMesh01](/Session4/(README)pictures/pic-1.png "S4-ClassExamples-00-ArrayMesh01")
2. The *for loop code* in this example is:
   ```javascript
   for (var x = -10; x <= 10; x += 5) { // Start from -45 and sequentially add one every 5 pixels
        var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
        //The color of the material is assigned a random color
        var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
        var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        mesh.position.x = x;
        mesh.position.z = 0;
        mesh.scale.y = 0.5;
        scene.add(mesh);
    }
   ```
   And the simple strcture of this for loop is:
   ```javascript
   for (var x = -10; x <= 10; x += 5) {
    }
   ```
   So we can know that there will be 5 random-color-cubes whose positions would be:
     1. (X:-10, Y:0, Z:0)
     2. (X:-5, Y:0, Z:0)
     3. (X:0, Y:0, Z:0)
     4. (X:5, Y:0, Z:0)
     5. (X:10, Y:0, Z:0)
  Since we only difined the *x postion* of the cubes, the *y and z postion* which we did not difine will *remain the value 0*.

********************

## S4-ClassExamples-01-ArrayMesh-Exercise-template: *225 Cubes Created By For Loop*
#### This example created more cubes based on what we did for *S4-ClassExamples-00-ArrayMesh*
![S4-ClassExamples-01-ArrayMesh-Exercise-template00](/Session4/(README)pictures/pic-2.png "S4-ClassExamples-01-ArrayMesh-Exercise-template00")
### Knowledge Points
1. The *for loop* for this one added z position:
   ```javascript
   for (var x = -35; x < 40; x += 5) { // Start from -35 and sequentially add one every 5 pixels
     for (var y = -35; y < 40; y += 5) {
          var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
          //The color of the material is assigned a random color
          var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
          var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

          mesh.position.x = x;
          mesh.position.z = y;

          scene.add(mesh);
          cubes.push(mesh);
      }
    }
   ```
   Although we difined the value under name **Y**, but since we assigned this value after ```javascript
   mesh.position.z = ;
   ```
   it means those values will control the *z position* of those cubes.
   the simple strcture of *this for loop* is:
   ```javascript
   for (var x = -35; x < 40; x += 5) {
     for (var y = -35; y < 40; y += 5) {
     }
   }
   ```
   And we can still list those cube postions one by one:
       (X:-35, Y:0, Z:-35)
       (X:-35, Y:0, Z:-30)
       (X:-35, Y:0, Z:-25)
       (X:-35, Y:0, Z:-20)
       (X:-35, Y:0, Z:-15)
      ...
       (X:-35, Y:0, Z:35)
       (X:-30, Y:0, Z:-35)
       (X:-30, Y:0, Z:-30)
       (X:-30, Y:0, Z:-25)
       (X:-30, Y:0, Z:-20)
      ...
       (X:35, Y:0, Z:15)
       (X:35, Y:0, Z:20)
       (X:35, Y:0, Z:25)
       (X:35, Y:0, Z:30)
       (X:35, Y:0, Z:35)  

********************

 ## S4-MyExamples-00-ArrayMeshPractice: *Defining specific colors and rotation speed of the cubes created by for loop*
 #### For this exercise, we created 64 cubes(4 on each x,y and z axis). And we divided those cubes into 8 equal groups and we assigned different colors for each one of them.
 ![S4-MyExamples-00-ArrayMeshPractice00](/Session4/(README)pictures/pic-3.png "S4-MyExamples-00-ArrayMeshPractice00")
 ### Knowledge Points:
 1. First, we need to create the *for loop* for each x,y and z axis.
 ```javascript
 for (var x = -10; x < 10; x += 5) {
   for (var y = -10; y < 10; y += 5) {
     for (var z = -10; z < 10; z += 5) {
     }
   }
 }
 ```
 2. To defining different group colors, we used **if** to restrict conditions：
 ```javascript
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
 ```
 To explaining more clearly:
  Color 0xFF00FF was given to cubes:
     (X:0, Y:0, Z:0)
     (X:0, Y:0, Z:5)
     (X:0, Y:5, Z:0)
     (X:0, Y:5, Z:5)
     (X:5, Y:0, Z:0)
     (X:5, Y:0, Z:5)
     (X:5, Y:5, Z:0)
     (X:5, Y:5, Z:5)
  Color 0x0000FF was given to cubes:
     (X:0, Y:0, Z:-5)
     (X:0, Y:0, Z:-10)
     (X:0, Y:5, Z:-5)
     (X:0, Y:5, Z:-10)
     (X:5, Y:0, Z:-5)
     (X:5, Y:0, Z:-10)
     (X:5, Y:5, Z:-5)
     (X:5, Y:5, Z:-10)
  Color 0x4169E1 was given to cubes:
     (X:-5, Y:0, Z:0)
     (X:-5, Y:0, Z:5)
     (X:-5, Y:5, Z:0)
     (X:-5, Y:5, Z:5)
     (X:-10, Y:0, Z:0)
     (X:-10, Y:0, Z:5)
     (X:-10, Y:5, Z:0)
     (X:-10, Y:5, Z:5)
  Color 0xF08080 was given to cubes:
     (X:-5, Y:0, Z:-5)
     (X:-5, Y:0, Z:-10)
     (X:-5, Y:5, Z:-5)
     (X:-5, Y:5, Z:-10)
     (X:-10, Y:0, Z:-5)
     (X:-10, Y:0, Z:-10)
     (X:-10, Y:5, Z:-5)
     (X:-10, Y:5, Z:-10)
  Color 0xFFFF00 was given to cubes:
     (X:0, Y:-5, Z:0)
     (X:0, Y:-10, Z:5)
     (X:0, Y:-5, Z:0)
     (X:0, Y:-10, Z:5)
     (X:5, Y:-5, Z:0)
     (X:5, Y:-10, Z:5)
     (X:5, Y:-5, Z:0)
     (X:5, Y:-10, Z:5)  
  Color 0x7B68EE was given to cubes:
     (X:0, Y:-5, Z:-5)
     (X:0, Y:-10, Z:-10)
     (X:0, Y:-5, Z:-5)
     (X:0, Y:-10, Z:-10)
     (X:5, Y:-5, Z:-5)
     (X:5, Y:-10, Z:-10)
     (X:5, Y:-5, Z:-5)
     (X:5, Y:-10, Z:-10)  
  Color 0xFFB6C1 was given to cubes:
     (X:-5, Y:-5, Z:0)
     (X:-5, Y:-10, Z:5)
     (X:-5, Y:-5, Z:0)
     (X:-5, Y:-10, Z:5)
     (X:-10, Y:-5, Z:0)
     (X:-10, Y:-10, Z:5)
     (X:-10, Y:-5, Z:0)
     (X:-10, Y:-10, Z:5)  
  Color 0xDC143C was given to cubes:
     (X:-5, Y:-5, Z:-5)
     (X:-5, Y:-10, Z:-10)
     (X:-5, Y:-5, Z:-5)
     (X:-5, Y:-10, Z:-10)
     (X:-10, Y:-5, Z:-5)
     (X:-10, Y:-10, Z:-10)
     (X:-10, Y:-5, Z:-5)
     (X:-10, Y:-10, Z:-10)  
 3. The next step is one **key step**, for which the concept of *FOR LOOP* needs to be explained:
    To my understanding, everthing that written in this loop _only happened **once**_, everytime we runs the loop, **one result will be added to the scene**, for example, in this exercise, the first time we run the loop, mesh one, AKA cube0(X:-10, Y:-10,Z:-10)is added to the scene, the second time we run it, cube1(X:-10, Y:-10,Z:-5) is added to the scene,etc. So what we saw on the scene is **the result of 64 times the loop runs**. But since everthing just happened *for one time*, this loop *__can not remember__ the history or I want to say record the results of each loop*, so it *only knows what happened for the __last loop__*. As I set this clear, it is easy to understand that if I put the rotation code inside the for loop, *there would be __just one cube__ that is rotating which is the last cube-cube63*.
 4. To solve this problem, the **Array** is the key now coming on stage：
    Since the for loop **can not** support all cubes to rotate, we must bring all cubes out from the *for loop* and define their rotation under the **requestAnimationFrame**
    ```javascript
    function drawFrame(){
      requestAnimationFrame(drawFrame);
    }
    ```
    So first: Creating an array for example name it **cubes**:
    ```javascript
    var cubes = [];
    ```  
    Then pushing all cubes(meshes) into this array after we set everthing down in the for loop:
    ```javascript
    cubes.push(mesh);
    ```
    Last but not least, writing the code under the *requestAnimationFrame*:
    ```javascript
    rot += 0.02;
    cubes.forEach(function(c, i){
                  c.rotation.x = rot;
                  c.rotation.y = rot;
                  c.rotation.z = rot;
              });
    ```
   And right now we can have all cubes that do the rotation together.
