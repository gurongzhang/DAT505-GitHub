# DAT505-Session4
## Introduction:
#### This session introduced:
  * ### Array System
  * ### For Loop
#### We studied how to use **For Loop** to *create objects efficiently* and how to use **Array** to _assign different values for individual objects which created by *for loop*_.
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
   Although we difined the value under name **Y**, but since we assigned this value after:
   ```javascript
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
 #### For this exercise, we created 64 cubes(4 on each x,y and z axis,4x4x4). And we divided those cubes into 8 equal groups and we assigned different colors for each one of them.
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
   * Color 0xFF00FF was given to cubes:
     (X:0, Y:0, Z:0)
     (X:0, Y:0, Z:5)
     (X:0, Y:5, Z:0)
     (X:0, Y:5, Z:5)
     (X:5, Y:0, Z:0)
     (X:5, Y:0, Z:5)
     (X:5, Y:5, Z:0)
     (X:5, Y:5, Z:5)
   * Color 0x0000FF was given to cubes:
     (X:0, Y:0, Z:-5)
     (X:0, Y:0, Z:-10)
     (X:0, Y:5, Z:-5)
     (X:0, Y:5, Z:-10)
     (X:5, Y:0, Z:-5)
     (X:5, Y:0, Z:-10)
     (X:5, Y:5, Z:-5)
     (X:5, Y:5, Z:-10)
   * Color 0x4169E1 was given to cubes:
     (X:-5, Y:0, Z:0)
     (X:-5, Y:0, Z:5)
     (X:-5, Y:5, Z:0)
     (X:-5, Y:5, Z:5)
     (X:-10, Y:0, Z:0)
     (X:-10, Y:0, Z:5)
     (X:-10, Y:5, Z:0)
     (X:-10, Y:5, Z:5)
   * Color 0xF08080 was given to cubes:
     (X:-5, Y:0, Z:-5)
     (X:-5, Y:0, Z:-10)
     (X:-5, Y:5, Z:-5)
     (X:-5, Y:5, Z:-10)
     (X:-10, Y:0, Z:-5)
     (X:-10, Y:0, Z:-10)
     (X:-10, Y:5, Z:-5)
     (X:-10, Y:5, Z:-10)
   * Color 0xFFFF00 was given to cubes:
     (X:0, Y:-5, Z:0)
     (X:0, Y:-10, Z:5)
     (X:0, Y:-5, Z:0)
     (X:0, Y:-10, Z:5)
     (X:5, Y:-5, Z:0)
     (X:5, Y:-10, Z:5)
     (X:5, Y:-5, Z:0)
     (X:5, Y:-10, Z:5)  
   * Color 0x7B68EE was given to cubes:
     (X:0, Y:-5, Z:-5)
     (X:0, Y:-10, Z:-10)
     (X:0, Y:-5, Z:-5)
     (X:0, Y:-10, Z:-10)
     (X:5, Y:-5, Z:-5)
     (X:5, Y:-10, Z:-10)
     (X:5, Y:-5, Z:-5)
     (X:5, Y:-10, Z:-10)  
   * Color 0xFFB6C1 was given to cubes:
     (X:-5, Y:-5, Z:0)
     (X:-5, Y:-10, Z:5)
     (X:-5, Y:-5, Z:0)
     (X:-5, Y:-10, Z:5)
     (X:-10, Y:-5, Z:0)
     (X:-10, Y:-10, Z:5)
     (X:-10, Y:-5, Z:0)
     (X:-10, Y:-10, Z:5)  
   * Color 0xDC143C was given to cubes:
     (X:-5, Y:-5, Z:-5)
     (X:-5, Y:-10, Z:-10)
     (X:-5, Y:-5, Z:-5)
     (X:-5, Y:-10, Z:-10)
     (X:-10, Y:-5, Z:-5)
     (X:-10, Y:-10, Z:-10)
     (X:-10, Y:-5, Z:-5)
     (X:-10, Y:-10, Z:-10)  
 3. The next step is one **key step**, for which the concept of *FOR LOOP* needs to be explained:
    To my understanding, everthing that written in this loop _only happened **once**_, everytime we run the loop, **one result will be added to the scene**, for example, in this exercise, the first time we run the loop, mesh one, AKA cube0(X:-10, Y:-10,Z:-10)is added to the scene, the second time the loop runs, cube1(X:-10, Y:-10,Z:-5) is added to the scene,etc. The loop will stop running until *it finishes adding all the cubes*. So what we saw on the scene is **the result of 64 times the loop runs**. But since everthing just happened *for one time*, this loop *__can not remember__ the history or I want to say record the results of every loop*, so it *only knows what happened for the __last loop__*. As I set this clear, it is easy to understand that if I put the rotation code inside the for loop, *there would be __just one cube__ that is rotating which is the last cube-cube63*.
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

********************

## S4-MyExamples-01-homework(easy): *Cubes who stay with different rotation directions*
#### For this exercise, we created 225 cubes(15(X axis)x15(Z axis)). And try to make them have different rotate directions in one still scene.
![S4-MyExamples-01-homework(easy)00](/Session4/(README)pictures/pic-4.png "S4-MyExamples-01-homework(easy)00")
### Knowledge Points:
1. It was very easy to find out the solution based on the for loop that we talked about during *S4-MyExamples-00-ArrayMeshPractice/3*, the solution for this one is to show the result of what each cube looks like after the rotation. So what we need to do is write the rotation code inside the for loop that is all:
   ```javascript
   for (var x = -35; x < 40; x += 5) {
   for (var y = -35; y < 40; y += 5) {
   var boxGeometry = new THREE.BoxGeometry(3, 3, 3);

   var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
   var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

   mesh.position.x = x;
   mesh.position.z = y;
   mesh.rotation.x = Math.random() * 2 * Math.PI;
   mesh.rotation.y = Math.random() * 2 * Math.PI;
   mesh.rotation.z = Math.random() * 2 * Math.PI;
   scene.add(mesh);
   cubes.push(mesh);
     }
   }
   ```

********************

## S4-MyExamples-02-homework(hard): *Cubes who keep rotating with different rotate speeds*
#### For this exercise, we created 225 cubes(15(X axis)x15(Z axis)). And try to make them rotating with different rotate speeds in the scene.
![S4-MyExamples-02-homework(hard)00](/Session4/(README)pictures/pic-5.png "S4-MyExamples-02-homework(hard)00")
### Knowledge Points:
1. To finding out the solution for this exercise, the **S4-MyExamples-00-ArrayMeshPractice readme note** is good for reference, as we know that if we want to make all cubes created in the for loop to animate, we must push those cubes in an array.

   However, what is this exercise that differ from the *S4-MyExamples-00-ArrayMeshPractice* is that, in this exercise, each cube has their own rotation speed, which means, they will do the rotation individually, in the *S4-MyExamples-00-ArrayMeshPractice*, all cubes rotate the same. So for this *S4-MyExamples-02-homework(hard)* exercise, how to give each cube their unique rotate speed is what should be working on.

2. To solve this quesiton:
   * First, we need to create an array to push all meshes in:
     ```javascript
     var cubes = [];
     cubes.push(mesh);
     ```
   * So **right now** *we can bring all cubes out from the for loop*, the **next step** is to *define the unique rotate speed for each cube*. So basicly, *every cube should has different rotate speed for its X,Y,Z*. _The **array** which has different random values in it_ would be a perfect choice to define the rotate speed. So we need to **define 3 arrays** to *put the rotate speed values for X,Y,Z*:
     ```javascript
     var rot_spd = [];
     var rot_spd1 = [];
     var rot_spd2 = [];
     ```
   * Then we *push random numbers which from different ranges into these 3 arrays* to *make the rotate speed for X,Y,Z different*, **if we assign those random numbers directly to the rotate speed**, the cubes **will still have the same X,Y,Z rotate speeds ,just with 3 random speed values**:
     ```javascript
     rot_spd.push(Math.random() * 0.1 - 0.05);
     rot_spd1.push(Math.random() * 0.1 - 0.02);
     rot_spd2.push(Math.random() * 0.1 - 0.08);
     ```
   * The last step was to assign those values to the X,Y,Z rotate speeds:
     ```javascript
     cubes.forEach(function(c, i) {
     c.rotation.x += rot_spd[i];
     c.rotation.y += rot_spd1[i];
     c.rotation.z += rot_spd2[i];//Rotate the object that is referenced in c
     });
     ```
