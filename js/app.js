const canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        document.body.style.zoom = "400%";
        document.body.style.marginTop = "5%"
        const fps = 60;
        const worldTiles = new Image();
        worldTiles.src = "images/overworld/tiles-overworld.png";
        const link = new Image();
        link.src = "images/Characters/link/link.png"
        let rightPressed = false;
        let leftPressed = false;
        let upPressed = false;
        let downPressed = false;
        let lastButtonPressed = "up";
        let animationCounter = 0;
        let currentAnimation = 0;
        let animationSpeed = 10;
        let linkX = 116;
        let linkY = 135;

        //Full-Screen-Tile-Arrays
        const map7_7 = [
                [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                [ 61, 61, 61, 61, 61, 61, 61,  2,  2, 61, 61, 61, 61, 61, 61, 61],
                [ 61, 61, 61, 61, 28, 61, 62,  2,  2, 61, 61, 61, 61, 61, 61, 61],
                [ 61, 61, 61, 62,  2,  2,  2,  2,  2, 61, 61, 61, 61, 61, 61, 61],
                [ 61, 61, 62,  2,  2,  2,  2,  2,  2, 61, 61, 61, 61, 61, 61, 61],
                [ 61, 62,  2,  2,  2,  2,  2,  2,  2, 60, 61, 61, 61, 61, 61, 61],
                [  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],
                [ 43, 44,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 43, 43],
                [ 61, 61,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 61, 61],
                [ 61, 61,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 61, 61],
                [ 61, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 61, 61],
                [ 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61]];

        //Player movement functions
        const keyDownHandler = (e) => {//key-pressed
            if(e.keyCode === 37){//left
                leftPressed = true;
                lastButtonPressed = "left";
            } else if(e.keyCode === 39){//right
                rightPressed = true;
                lastButtonPressed = "right";
            } else if(e.keyCode === 38){//up
                upPressed = true;
                lastButtonPressed = "up";
            } else if(e.keyCode === 40){//down
                downPressed = true;
                lastButtonPressed = "down";
            }
        }

        const keyUpHandler = (e) => {//key-up (stopped pressing)
            if(e.keyCode === 37){//left
                leftPressed = false;
            } else if(e.keyCode === 39){//right
                rightPressed = false;
            } else if(e.keyCode === 38){//up
                upPressed = false;          
            } else if(e.keyCode === 40){//down
                downPressed = false;  
            }
        }


        const drawMap = level => {
            for(let i = 0; i < level.length; i++){
                for(let j = 0; j < level[i].length; j++){
                    ctx.drawImage(worldTiles, ((level[i][j]%18) * 17) + 1, (Math.floor(level[i][j]/18) * 17) + 1, 16, 16, j *16, i *16, 16, 16);
                               /* Source image,      (^sx) + sy = top left courner of image on source (sy^),   sWidth = 16(The width of the sub-rectangle of the source image 16 pixels to right of sprite), sHeight = 16(The hight same as previous paramater - stets the bottom location), 
                                dx, dy(these two paramaters locate the destination on the html to render (so because it's a nested array, it will start at location 
                                x = 0 * 16 or 0, y = 0 * 16 also 0, resulting in the top left courner of the screen), 
                                these final 2 paramaters dictate the pixel size of the image, dWidth=>dHeight respectivly rendering the 16x16 pixel image captured from the source onto the html) 
                                Seeing as the game field is set to a 256x240 pixels, 240 16x16 pixel blocks, rows of 16, columns of 15  */
                }
            }
        }

        const drawLink = () => {
            let speed = 2;
            animationCounter++;

            if(leftPressed){ //left movement
                linkX -= speed; //changes the drawing location on the x axis, negative for left
                if(currentAnimation === 0){
                    ctx.drawImage(link, 30, 0, 16, 16, linkX, linkY, 16, 16);//(source image, x-location top left of wanted sprite, y-location, width of sprite, height of sprite, x-position of the top left courner of where to render the image, y-position, pixel size to render) - re-expressing understanding 
                } else if(currentAnimation === 1){
                    ctx.drawImage(link, 30, 30, 16, 16, linkX, linkY, 16, 16)
                }
                if(animationCounter >= 6){
                    currentAnimation++;
                    animationCounter = 0;
                    if(currentAnimation > 1){
                        currentAnimation = 0;
                    }
                }
            } else if(rightPressed){ //right movement
                linkX += speed; //changes the drawing location on the x axis, positive for right
                if(currentAnimation === 0){
                    ctx.drawImage(link, 91, 0, 16, 16, linkX, linkY, 16, 16);
                } else if(currentAnimation === 1){
                    ctx.drawImage(link, 91, 30, 16, 16, linkX, linkY, 16, 16)
                }//there are 2 images of link "moving", this if else determains which image to render based on the current state of (currentAnimation)
                if(animationCounter >= 6){
                    currentAnimation++;
                    animationCounter = 0;
                    if(currentAnimation > 1){
                        currentAnimation = 0;
                    }
                }
            } else if(upPressed){ //up movement
                linkY -= speed; //changes the drawing location on the Y axis, negative for up
                if(currentAnimation === 0){
                    ctx.drawImage(link, 62, 0, 16, 16, linkX, linkY, 16, 16); 
                } else if(currentAnimation === 1){
                    ctx.drawImage(link, 62, 30, 16, 16, linkX, linkY, 16, 16)
                }
                if(animationCounter >= 6){
                    currentAnimation++;
                    animationCounter = 0;
                    if(currentAnimation > 1){
                        currentAnimation = 0;
                    }
                }
            } else if(downPressed){ //down movement
                linkY += speed; //changes the drawing location on the Y axis, positive for down
                if(currentAnimation === 0){
                    ctx.drawImage(link, 0, 0, 16, 16, linkX, linkY, 16, 16);
                } else if(currentAnimation === 1){
                    ctx.drawImage(link, 0, 30, 16, 16, linkX, linkY, 16, 16)
                }
                if(animationCounter >= 6){
                    currentAnimation++;
                    animationCounter = 0;
                    if(currentAnimation > 1){
                        currentAnimation = 0;
                    }
                }
            } else {
                if(lastButtonPressed === 'left'){
                    ctx.drawImage(link, 30, 0, 16, 16, linkX, linkY, 16, 16)//retains left facing image of Link
                } else if(lastButtonPressed === 'right'){
                    ctx.drawImage(link, 91, 0, 16, 16, linkX, linkY, 16, 16)//retains right facing image of Link
                } else if(lastButtonPressed === 'up'){
                    ctx.drawImage(link, 62, 0, 16, 16, linkX, linkY, 16, 16)//retains up facing image of Link
                } else if(lastButtonPressed === 'down'){
                    ctx.drawImage(link, 0, 0, 16, 16, linkX, linkY, 16, 16)//retains down facing image of Link
                }
            }
        }

        //Draw's the playfield
        function draw () {
            setTimeout(() => {
                requestAnimationFrame(draw);
                ctx.fillStyle = "rgb(20,20,20)";
                ctx.fillRect(0,0,256,240);
                drawMap(map7_7);
                drawLink();
            },1000/fps);
        }
        draw();
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventLIstener("keyup", keyUpHandler, false);
