# DAT505-Session7
## Introduction:
#### This session introduced:
  * ### How to load different textures randomly in the scene
  * ### How to transfer threejs 3D world coordinates to screen mouse coordinates
#### This session has abundant contents, some of them might not be easy to absorb, especially the *transformation between 3D coordinates and mouse coordinates*, but I will try my best to explaine them.
## S7-ClassExamples-00-Texture-Cube: *Loading random texures to the objects*
#### This example demonstrates how to make the object do the *'drop loop'* and change its initial position every time *refreshing the page*. Another important part is to *show how to load texture to the object*.
![S7-ClassExamples-00-Texture-Cube00](/Session7/(README)pictures/pic-0.png "S7-ClassExamples-00-Texture-Cube00")
### Knowledge Points
1. First, to loading the texture, the following codes need to be added:
   ```javascript
   var texture;
   function init() {
   	texture = new THREE.TextureLoader().load( "texture.jpg" );
   ```
   What needs to be pointed out is the file catalog in the:
   ```javascript
   texture = new THREE.TextureLoader().load( "file catalog" );
   ```
   needs to be the catalog which can shows where this texture file is, in other words, if the texture picture is put under one file named 'textures', the content inside should be something like "textures/texture.jpg".
2. Secondly, to make it looks like 'drop', the y position needs to be *consistly changed*, and the x position needs to be *randomized*. Of course, all these codes should appear under the *animate function* to make the object move:
   ```javascript
   function animate() {
   	requestAnimationFrame( animate );
   	//Move the mesh towards the bottom of the screen
   	mesh.position.y -= 0.2;
   	//If the mesh passes the bottom of the screen,make it appear on the top.
    //Also x position is randomized
   	if (mesh.position.y <- 30){
   		mesh.position.y = 35;
   		mesh.position.x = (Math.random() * -20) +10;
   	}
   }
   ```
   The comments describe everything clearly.
3. Finally, adding some rotate speed to the object under the *animate function*:
   ```javascript
 	mesh.rotation.x += 0.02;
 	mesh.rotation.y += 0.01;
   ```

********************

## S7-MyExamples-03-Texture-Cubepractice: *Multipul cubes with random texures and random positions keep 'falling'*
#### In this exercise, we were asked to load random texures to 10 cubes and made them do the *same* 'drop' just like *S7-ClassExamples-00-Texture-Cube* but with *different 'drop speed'*, *different initial positions* and *same rotate speeds*.
![S7-MyExamples-03-Texture-Cubepractice00](/Session7/(README)pictures/pic-1.png "S7-MyExamples-03-Texture-Cubepractice00")
### Knowledge Points
1. To loading random texures, we need to divide the solution into two part.
   * Loading different textures.
   * Loading them randomly.
   The script is down below:
   ```javascript
   var texture = new THREE.TextureLoader().load( "textures/texture"+ Math.floor(Math.random()*4)+".jpg" );
   // Create a MeshBasicMaterial with a loaded texture
 	 material = new THREE.MeshBasicMaterial( { map: texture} );
   ```
   ![S7-MyExamples-03-Texture-Cubepractice01](/Session7/(README)pictures/pic-6.png "S7-MyExamples-03-Texture-Cubepractice01")
   ![S7-MyExamples-03-Texture-Cubepractice02](/Session7/(README)pictures/pic-4.png "S7-MyExamples-03-Texture-Cubepractice02")
2. Different 'initial positions':
   ```javascript
   mesh.position.x=(Math.random()*30)-15;
 	 mesh.position.y=(Math.random()*30)-15;
   ```
3. Different 'drop speed':
   ```javascript
   var randomValue = Math.random()*0.5;
   spd.push(randomValue);
   	c.position.y -= spd[i];
   ```
4. Same 'rotate speed':
   ```javascript
   c.rotation.x += 0.02;
   c.rotation.y += 0.01;
   ```
5. 'Drop loop':
   ```javascript
   //If the mesh passes the bottom of the screen,
   //make it appear on the top. Also x position is randomized
   if (c.position.y <- 30){
 		c.position.y = 35;
 		c.position.x = (Math.random() * -20) +10;
 		c.scale.x = (Math.random() * -2) +1;
 		c.scale.y = (Math.random() * -2) +1;
 		c.scale.z = (Math.random() * -2) +1;
 	 }
   ```

********************

## S7-ClassExamples-01-Texture-Eyes-Interaction:*An 'eye' that continuously ‘looks’ the mouse position*
#### In this example, a sphere with the eye texture will *stare fixedly at the mouse*, so with the mouse moving, the sphere will do the *corresponding rotations*.
![S7-ClassExamples-01-Texture-Eyes-Interaction00](/Session7/(README)pictures/pic-7.png "S7-ClassExamples-01-Texture-Eyes-Interaction00")
### Knowledge Points
1. First we find the values that **catch the mouse move** and *print them in console* to see the *mouse position*:
   ```javascript
   function onDocumentMouseMove( event ) {
     mouseX = event.clientX - windowHalfX;
     mouseY = event.clientY - windowHalfY;
   	console.log(event.clientX - windowHalfX,event.clientY - windowHalfY);
   }
   ```
   ![S7-ClassExamples-01-Texture-Eyes-Interaction01](/Session7/(README)pictures/pic-8.png "S7-ClassExamples-01-Texture-Eyes-Interaction01")
   So right now we can know that, the mouse coordinate system is like:
   ![S7-ClassExamples-01-Texture-Eyes-Interaction02](/Session7/(README)pictures/pic-9.png "S7-ClassExamples-01-Texture-Eyes-Interaction02")
2. Since the value **event.clientX - windowHalfX** is assigned to **mouseX** and the value **event.clientY - windowHalfY** is assigned to the **mouseY**, so right now when using the **mouseX** and **mouseY** in the codes relating to the rotation of the sphere:
   ```javascript
   mesh.rotation.x = mouseY/window.innerHeight*2;
   mesh.rotation.y = mouseX/window.innerWidth*2;
   ```
   it will do the **positive rotation(right)** and the **negative rotation(left)** according to the *value of mouseX and mouseY*.
3. So the key to make the eye follow the mouse is to:
   1. Making the middle of the eye(s) become **the origin(s) of the mouse coordinate system**. So when users moving the mouse in the scene, the **mouseX** and **mouseY** can always be the positive or negative numbers(screen mouse coordinates) due to those different *origin(s)*.
   2. In order to make 'Ⅰ' happened, I need to explain few more things:
      * We can always know the 3D world coordinates of the middle of our eye(s) whatever their position is random or not.
      * If we can transfer the threejs 3D world coordinate(s) of our eye(s) to screen mouse coordinate(s), the only thing we need to do is to **subtract the transferred screen mouse coordinate(s)** from **mouseX** and **mouseY**.
      ![S7-ClassExamples-01-Texture-Eyes-Interaction03](/Session7/(README)pictures/pic-10.png "S7-ClassExamples-01-Texture-Eyes-Interaction03")
      The new mouseX and mouseY would be like:
      ```javascript
      mouseX = event.clientX - windowHalfX-transferredX;
      mouseY = event.clientY - windowHalfY-transferredY;
      ```

********************

## S7-MyExamples-00-homeworkdemo:*Changing the position of the 'eye' to another certain spot*
#### In this demo, I moved the position of the 'eye' from (0,0) to (30,10) and made the new 'eye' still follow the mouse.
![S7-MyExamples-00-homeworkdemo00](/Session7/(README)pictures/pic-11.png "S7-MyExamples-00-homeworkdemo00")
### Knowledge Points
1. I already explained my solution before, so I broke my whole processes into several parts:
   1. I checked the **origin** of the s*creen mouse coordinate system* and the *3D world coordinate system*:
      ![S7-MyExamples-00-homeworkdemo01](/Session7/(README)pictures/pic-12.png "S7-MyExamples-00-homeworkdemo01")  
      by printing the console for *event.clientX,event.clientY*:
      ```javascript
      function onDocumentMouseMove( event ) {
      mouseX = event.clientX;
      mouseY = event.clientY;
     	console.log(event.clientX,event.clientY);
      }
      ```
      ![S7-MyExamples-00-homeworkdemo02](/Session7/(README)pictures/pic-13.png "S7-MyExamples-00-homeworkdemo02")
      by put the mesh to the position (0,0):
      ```javascript
      mesh = new THREE.Mesh( geometry, material );
	    mesh.position.x= 0;
	    mesh.position.y= 0;
	    scene.add( mesh );
      ```
      **So right now we can know that the top left corner is the origin of the screen mouse coordinate system and the middle of the screen is the origin of the 3D world coordinate system**
      ![S7-MyExamples-00-homeworkdemo03](/Session7/(README)pictures/pic-14.png "S7-MyExamples-00-homeworkdemo03")
   2. Since the direction of y-aixs in those two systems is reversed, we should put **'-'** before the y value when unifying the coordinates.
   3. So if we know the *length* and *width* of the scene in the camera(3D world), we can *calculate the proportion of the eye's coordinate in the half 3D world x-aixs and half 3D world y-axis* and *time the half length of the window.innerWidth and the negative value of half length of the window.innerHeight(unifying the coordinates)*. And the result will the be the *coordinates of the eye* in the *screen mouse coordinate system*. The code for this would be:
      ```javascript
      transferredcoordinateX = (mesh.position.x / HalfcamerasceneWidth) * windowHalfX;
      transferredcoordinateY = (-mesh.position.y / HalfcamerasceneHeight) * windowHalfY;
      ```
      In my exercise, I just used **ppx** and **ppy** to represent *transferredcoordinateX* and *transferredcoordinateY*, and I tried to get the data of the *HalfcamerasceneWidth* and *HalfcamerasceneHeight* by *changing the position of the mesh*, and finally after adjusting for several times, I found out '40' is a suitable number to use, so now I have the transferred coordinates, even if they are not absolutely correct, but it would kind of work:
      ```javascript
      var ppx;
      var ppy;
      ppx = (mesh.position.x / 40) * windowHalfX;
    	ppy = (-mesh.position.y / 40) * windowHalfY;
      ```
      And I __subtract *ppx* and *ppy*__ from __*mouseX* and *mouseY*__:
      ```javascript
      function onDocumentMouseMove( event ) {
        mouseX = event.clientX - windowHalfX-ppx;
        mouseY = event.clientY - windowHalfY-ppy;
      ```
      It seemed like I made it!

********************

## S7-MyExamples-01-homeworkdemo:*Making a random-position eye work*
#### In this example, I made the position of the 'eye' random.
![S7-MyExamples-01-homeworkdemo00](/Session7/(README)pictures/pic-15.png "S7-MyExamples-01-homeworkdemo00")
### Knowledge Points
1. In this demo, I did not change anything from the *S7-MyExamples-00-homeworkdemo* but *redefined the position of my 'eye'*:
   ```javascript
   mesh.position.x = (Math.random()*90)-45;
   mesh.position.y = (Math.random()*90)-45;
   ```
   And it worked fine, this showed that I'm on the right track.

********************

## S7-MyExamples-02-homeworkfinal:*Creating 10 random-position eyes and making them always follow the mouse*
#### In this example, I *randomized the position of 10 eyes* and tried to make them work. It turned out that some eyes which appear in the corner *did not work very well*.
![S7-MyExamples-01-homeworkdemo01](/Session7/(README)pictures/pic-16.png "S7-MyExamples-01-homeworkdemo01")
### Knowledge Points
1. In this demo, since I use *for loop* to create 10 eyes, as we mentioned in the **Session4 README note**, if we want to make our objects animate, we need to create arrays to bring those values out, so I defined several arrays and of course, my *ppx* and *ppy* to store different values:
   ```javascript
   var spheres = [];
   var mousex = [];
   var mousey = [];
   var mousexary = [];
   var mouseyary = [];
   var ppx;
   var ppy;
   ```
   And then I created the *for loop* and start defining values, randomizing positions and pushed them into corresponding arrays:
   ```javascript
   for (var x = 0; x < 10; x ++) {
   	var geometry = new THREE.SphereGeometry( 15, 16, 8 );
        mesh = new THREE.Mesh( geometry, material );
   	     mesh.position.x = (Math.random()*120)-60;
         mesh.position.y = (Math.random()*120)-60;
        ppx = (mesh.position.x / 60) * windowHalfX;
      	ppy = (-mesh.position.y /50) * windowHalfY ;
   	scene.add(mesh);
   	spheres.push(mesh);
   	mousex.push(ppx);
   	mousey.push(ppy);
   }
   ```
2. Because all 'eyes' have the animation, so when we coding their movement, we should replace all the single value to array value:
   ```javascript
   function render() {
   spheres.forEach(function(c, i) {
   	c.rotation.x = mouseyary[i]/window.innerHeight*3;
   	c.rotation.y = mousexary[i]/window.innerWidth*3;
   });
   	renderer.render( scene, camera );
   }

   function onDocumentMouseMove( event ) {
   	mousex.forEach(function(c, i) {
   	mouseX = event.clientX - windowHalfX-mousex[i];
   	mousexary[i] = mouseX;
   	mouseY = event.clientY - windowHalfY-mousey[i];
   	mouseyary[i] = mouseY;
   	});
   }
   ```
3. The ptimization method will be showed in the Session8 to fix the 'corner eyes problem'
4. To understand better about the *coordinates transformation*:
   * [Coordinates Transformation1](https://blog.csdn.net/weitaming1/article/details/82387091)
   * [Coordinates Transformation2](https://blog.csdn.net/yrbin666/article/details/44565731)
