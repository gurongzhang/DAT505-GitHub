# DAT505-Session5-If, If-Else
## Introduction:
#### This session introduced:
  * ### If Function
  * ### If Else Function
#### This session is the further study of Session4. We studied how to use **if and if else** to *set up conditions* to define some specific values for particular objects based on the *array* and *for loop* study.
## S5-MyExamples-00-ParticularRotatingCubes: *Make particular cubes colorful and rotate*
#### This is one exercise which we were asked to *make two specific cubes have different color* and *keep rotating in the scene*. The color of those two specified cubes needs to be random and everytime when someone refresh the web page, those two colors need to change.
![S5-MyExamples-00-ParticularRotatingCubes00](/Session5-If%2C%20If-Else/(README)pictures/pic-0.png "S5-MyExamples-00-ParticularRotatingCubes00")
### Knowledge Points
1. First is the rotation part, which is well explained in **Session4 README notes**. But the only tiny difference is during Session4, we always make all cubes rotate together, so during Session4 we used:
   ```javascript
   cubes.forEach(function(c, i) {});
   ```
   to control all the animation of cubes, although each cube may has different rotate speed, they always rotate together.

   However in this exercise, there were only two cubes need to animate, so the difference is we used those two meshes' array number to define their rotate speed under the *animate function*:
   ```javascript
   function drawFrame(){
     requestAnimationFrame(drawFrame);

            cubes.forEach(function(c, i){
            cubes[6].rotation.x +=  rot_spd[i];
            cubes[18].rotation.x += rot_spd[i];
           });

     renderer.render(scene, camera);
   }
   ```
   The reason why those two cubes were cubes[6] and cubes[8] is due to the *circular order of the for loop*:
   ![S5-MyExamples-00-ParticularRotatingCubes01](/Session5-If%2C%20If-Else/(README)pictures/pic-1.png "S5-MyExamples-00-ParticularRotatingCubes01")
2. For the color part:
   * If we define the color directly random, such as:
     ```javascript
     cubes[6].material.color.set(Math.random() * 0xFFFFFF);
     cubes[18].material.color.set(Math.random() * 0xFFFFFF);
     ```
     the result would be like the color of those two cubes *keep changing very fast* instead of staying with one random color. So right now we can use **if else** function to specify the cube color:
     ```javascript
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
     ```
   Those codes mean that:
   * If the X and Y position of the cube is (X:-5, Y:-5) or (X:5, Y:5), the color of it would be a random color, otherwise, the color would be white.
   * Those codes were in the for loop, this explained why the specified cubes appear with random color but will not keep changing their color.

********************

## S5-MyExamples-01-CreativeObjects: *Creative objects by using if function*
#### In this example, I created 25 icosahedrons who showed their wireframe and defined them with *random color*, *same position*, *same extending speed* and *different initial sizes*. And when their sizes *reach to a certain value*, they will *turn back to an appropriate size*.
![S5-MyExamples-01-CreativeObjects00](/Session5-If%2C%20If-Else/(README)pictures/pic-2.png "S5-MyExamples-01-CreativeObjects00")
### Knowledge Points
1. How to set up the **wireframe**, **initial position**, **color**, and **rotate speed** are well explained in the previous sessions.

2. The *if function* in this exercise is basicly used for definine the range of  **changing speed** and **size** of those icosahedrons:
   * We can extract the codes which contain the **if function**:
   ```javascript
   var size = [];

   var thingssize = Math.random()* 10 * Math.PI/2;
   size.push(-thingssize);

   cubes.forEach(function(c, i) {
     c.scale.x = size[i];
     c.scale.y = size[i];
     c.scale.z = size[i];
     size[i] += 0.1;
   if (size[i] > 10) size[i] = -10;
   ```
   * __Math.random()* 10 * Math.PI/2__ is a range from [0,5PI), 5PI is about 15.70.
   * There is a __"-"__ before the "thingssize" in
     ```javascript
     size.push(-thingssize);
     ```
     which means the range of the array **size** is (-5PI,0], we can also take it as some range around (-15.70,0]
   * The code:
     ```javascript
     size[i] += 0.1;
     ```
     shows that the initial scale of those icosahedrons is random and those icosahedrons will keep growing, and we use the if function to limit the growing speed in cause their sizes become too big:
     ```javascript
     if (size[i] > 10) size[i] = -10;
     ```
     so that if the initial scale or the growing speed is too big or too fast, they will return to value *-10*, so we can always see those icosahedrons in the scene.
