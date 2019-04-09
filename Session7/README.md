# DAT505-Session7
## Introduction:
#### This session introduced:
  * ### How to load different textures randomly in the scene
  * ### How to transfer threejs 3D world coordinates to screen mouse coordinates
#### This session has abundant contents, some of them might not be easy to absorb, especially the transformation between 3D coordinates and mouse coordinates, but I will try my best to explaine them.
## S7-ClassExamples-00-Texture-Cube: *Loading random texures for the objects*
#### This example demonstrates how to make the object do the 'drop loop' and change its initial position every time refresh the page. Another important part is to show how to load texture for the object.
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
   texture = new THREE.TextureLoader().load( "" );
   ```
   needs to be the catalog which can shows where this texture file is, in other words, if the texture picture is put under one file named 'textures', the content inside should be like "textures/texture.jpg"
2. Secondly, to make it looks like 'drop', the y position needs to consistly change, and the x position needs to be randomized. Of course, all these codes should appear under the *animate function* to make the object move:
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
#### In this exercise, we were asked to load random texures for 10 cubes and made them do the same 'drop' just like *S7-ClassExamples-00-Texture-Cube* but with different 'drop speed', different initial positions and same rotate speeds.
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
#### In this example, a sphere with the eye texture will stare fixedly at the mouse, so with the mouse moving, the sphere will do the corresponding rotation.
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

********************

## S7-MyExamples-00-homeworkdemo:*Changing the position of the 'eye' to another certain spot*
#### In this example, I move the position of the 'eye' from (0,0) to (30,10) and make the new 'eye' still follow the mouse.
![S7-MyExamples-00-homeworkdemo00](/Session7/(README)pictures/pic-11.png "S7-MyExamples-00-homeworkdemo00")
### Knowledge Points
1. I already explain my solution before, so I break my whole processes into several parts:
   1. I check the origin of the screen mouse coordinate system and the 3D world coordinate system:
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
      
