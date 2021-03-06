        const canvas = document.getElementById("myCanvas");
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        let ctx = canvas.getContext("2d");
        document.body.style.zoom = "375%";
        document.body.style.marginTop = "2%"
        const fps = 60;
        const worldTiles = new Image();
        worldTiles.src = "images/overworld/tiles-overworld.png";
        const link = new Image();
        link.src = "images/Characters/link/link.png"
        const hud = new Image();
        hud.src = "images/overworld/pause-screen.png";
        const characterFront = new Image();
        characterFront.src = "images/Characters/peaceful/peaceful.png"
        const characterBack = new Image();
        characterBack.src = "images/Characters/peaceful/peaceful-backs.png";
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
        let gameObjects = [];
        const maps = [];
        let gameMap = null;
        let lastPickUpItem = 0;
        let playPickupItemAnimation = false;
        

            //classes
        class GameObject {
            constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            }
        }
        class Portal extends GameObject {
            constructor(x, y, width, height, newMap, newLinkX, newLinkY, isPortal){
            super(x, y, width, height);
            this.newMap = newMap;  //This property is used to select the array for the map which will be loaded upon zoning
            this.newLinkX = newLinkX;
            this.newLinkY = newLinkY;
            this.isPortal = isPortal;
            }
        }
        class EverythingElse extends GameObject {
            constructor(x, y, width, height){
            super(x, y, width, height);
            this.isOldMan = false;
            this.isOldWoman = false;
            this.counter = 0;
            this.imageNum = 0;
            this.isPickUpItem = false;
            this.pickUpItemNum = 0;
            this.isFlame = false;
            }
        }
        class TextClass {
            constructor(isText){
            this.isText = isText;
            this.line1Full = "";
            this.line2Full = "";
            this.line1Current = "";
            this.line2Current = "";
            this.line1X = 0;
            this.line1Y = 0;
            this.line1X = 0;
            this.line1Y = 0;
            this.counter = 0;
        } 
    }
        
        class MapBundler {
            constructor(m, o){
                this.map = m;
                this.gameObjects = o;
            }
        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////Map bundle setup
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
                let objects7_7 = [];

                let gO = new Portal(72, 72, 8, 16, 1, 120, 220, true); //Location of sprite(28), creates an object to detect link on that tile
                objects7_7.push(gO);//pushes the portal object into an array with the same name as the map-tile-board

                let bundle = new MapBundler(map7_7, objects7_7); //creates an object for the map tile, with each portal location[map7_7, objects7_7]
                maps.push(bundle);

//////////////////////////////////////////////////////////////////////////////////////////////////////////this is as dry as I think these can be, Create tileset array => creat new GameObject class for portals, and object locations? Bundle them together into an array of objects for access
        const mapWoodSword = [
                [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                [ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
                [ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
                [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
                [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
                [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
                [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
                [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
                [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
                [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
                [ 55, 55, 37, 37, 37, 37, 37, 28, 28, 37, 37, 37, 37, 37, 55, 55],
                [ 55, 55, 55, 55, 55, 55, 55, 28, 28, 55, 55, 55, 55, 55, 55, 55]];
        let gameObjectsWoodSword = [];
            //left Flame
        gO = new EverythingElse((10*16+8), (8*16), 16, 16);
        gO.isFlame = true;
        gameObjectsWoodSword.push(gO);
            //oldMan
        gO = new EverythingElse((7*16+8), (8*16), 16, 16);
        gO.isOldMan = true;
        gameObjectsWoodSword.push(gO);
            //right Flame
        gO = new EverythingElse((4*16+8), (8*16), 16, 16);
        gO.isFlame = true;
        gameObjectsWoodSword.push(gO);
            //sword
        gO = new EverythingElse((8*16-4), (9.5*16), 8, 16)
        gO.isPickUpItem = true;
        gO.pickUpItemNum = 14; 
        gameObjectsWoodSword.push(gO);
            //cave text
        gO = new TextClass(true);
        gO.line1Full = "IT'S DANGEROUS TO GO";
        gO.line2Full = "ALONE! TAKE THIS.";
        gO.line1X = 3*16; //results in 3 16x16 squares down
        gO.line1Y = 7*16; //results in 7 16x16 squres across
        gO.line2X = 4*16;
        gO.line2Y = 8*16-6;//He said he played with this to get it centered, that's why it has the minus 6
        gameObjectsWoodSword.push(gO);
        
        gO = new Portal(112, 240, 16, 16, 0, 68, 96, true); //location of portal out of map 1(mapWoodSword);
        gameObjectsWoodSword.push(gO);
        gO = new Portal(128, 240, 16, 16, 0, 68, 96, true); //location of portal out of map 1(mapWoodSword);
        gameObjectsWoodSword.push(gO);
        bundle = new MapBundler(mapWoodSword, gameObjectsWoodSword);
        maps.push(bundle);

        //Is this good practice to use let gO to make new objects to push them into an array then change the gO value to push again?
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


        gameMap = maps[0].map;
        gameObjects = maps[0].gameObjects;

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

        const playSound = source => {
            let sound = new Audio();
            sound.src = source;
            sound.play();
        }


        const drawMap = level => {
            for(let i = 0; i < level.length; i++){
                for(let j = 0; j < level[i].length; j++){
                    ctx.drawImage(worldTiles,((level[i][j]%18) * 17) + 1, (Math.floor(level[i][j]/18) * 17) + 1, 16, 16, j *16, i *16, 16, 16);
                               /* Source image,      (^sx) + sy = top left courner of image on source (sy^),   sWidth = 16(The width of the sub-rectangle of the source image 16 pixels to right of sprite), sHeight = 16(The hight same as previous paramater - stets the bottom location), 
                                dx, dy(these two paramaters locate the destination on the html to render (so because it's a nested array, it will start at location 
                                x = 0 * 16 or 0, y = 0 * 16 also 0, resulting in the top left courner of the screen), 
                                these final 2 paramaters dictate the pixel size of the image, dWidth=>dHeight respectivly rendering the 16x16 pixel image captured from the source onto the html) 
                                Seeing as the game field is set to a 256x240 pixels, 240 16x16 pixel blocks, rows of 16, columns of 15  */
                                
                }
            }
        }
        //draws game objects into the game
        const drawGameObjects = () => {
            for(let i = 0; i < gameObjects.length; i++){
                if(gameObjects[i].isPickUpItem){
                    //0 - boomerang
                    // 1= bomb
                    //2= bow and arrow
                    //3 = candle
                    //4 = flute
                    //5 = meat
                    //6 potion(red or blue)
                    //7 magic rod
                    //8 raft
                    //9 book of magic
                    //10 ring
                    //11 ladder
                    //12 key
                    //13 bracelet
                    //14 wood sword
                    //where da hearts, magic refils
                    switch(gameObjects[i].pickUpItemNum){
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                        case 6:
                            break;
                        case 7:
                            break;
                        case 8:
                            break;
                        case 9:
                            break;
                        case 10:
                            break;
                        case 11:
                            break;
                        case 12:
                            break;
                        case 13:
                            break;
                        case 14:
                            ctx.drawImage(hud, 555, 137, 8, 16, gameObjects[i].x, gameObjects[i].y, 8, 16);
                            break;
                    }
                }
                if(gameObjects[i].isText){
                    gameObjects[i].counter += 1;
                    if(gameObjects[i].counter%5 === 0){//counter and modulo controll the speed of the text
                        if(gameObjects[i].line1Full.length != gameObjects[i].line1Current.length){
                            gameObjects[i].line1Current = gameObjects[i].line1Full.substring(0, gameObjects[i].line1Current.length + 1);
                            playSound('./sounds/LOZ_Text_Slow.wav');//SOUND

                        } else if(gameObjects[i].line2Full.length != gameObjects[i].line2Current.length){
                            gameObjects[i].line2Current = gameObjects[i].line2Full.substring(0, gameObjects[i].line2Current.length + 1);
                            playSound('./sounds/LOZ_Text_Slow.wav');
                        }//Every pass is adding a letter to current line, which increases the lenght, which add's a letterfor the next iteration.
                    }
                    ctx.fillStyle = "white";
                    ctx.font = "12px Arial";
                    // console.log(gameObjects[i].line1Current, 'line1current');
                    // console.log(gameObjects[i].line2Current, 'line2current');
                    ctx.fillText(gameObjects[i].line1Current, gameObjects[i].line1X, gameObjects[i].line1Y);//research this
                    ctx.fillText(gameObjects[i].line2Current, gameObjects[i].line2X, gameObjects[i].line2Y);
                                //Pulls the text from the object, x-position for draw, y-position for draw. 
                }
                if(gameObjects[i].isFlame){
                    gameObjects[i].counter++;
                    if(gameObjects[i].counter%5 === 0){
                        gameObjects[i].imageNum++;
                    }
                    if(gameObjects[i].imageNum>1){
                        gameObjects[i].imageNum = 1;
                    }
                    if(gameObjects[i].imageNum === 0){
                        ctx.drawImage(characterBack, 158, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
                    }
                    if(gameObjects[i].imageNum === 1){
                        ctx.drawImage(characterFront, 52, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
                    }
                }
                if(gameObjects[i].isOldMan){
                    ctx.drawImage(characterFront, 1, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
                }
                if(gameObjects[i].isOldWoman){
                    ctx.drawImage(characterFront, 35, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
                }
            }
        }

        //draw's link into the game
        const drawLink = () => {
            let speed = 2;
            animationCounter++;
            if(playPickupItemAnimation){
                if(animationCounter < 150){
                    ctx.drawImage(link, 1, 150, 16, 16, linkX, linkY, 16, 16);
                } else {
                    playPickupItemAnimation = false;
                }
                switch(lastPickUpItem){
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    case 6:
                        break;
                    case 7:
                        break;
                    case 8:
                        break;
                    case 9:
                        break;
                    case 10:
                        break;
                    case 11:
                        break;
                    case 12:
                        break;
                    case 13:
                        break;
                    case 14:
                        ctx.drawImage(hud, 555, 137, 8, 16, linkX-2, linkY-14, 8, 16);
                        break;
                }

            } else {
                if(leftPressed && !collision(linkX - speed, linkY, gameMap)){ //left movement
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
                } else if(rightPressed && !collision(linkX + speed, linkY, gameMap)){ //right movement
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
                } else if(upPressed && !collision(linkX, linkY - speed, gameMap)){ //up movement
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
                } else if(downPressed && !collision(linkX, linkY + speed, gameMap)){ //down movement
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
        }
        //collision detection function
        const collision = (x, y, map) => {  //x and y are linkX and linkY, map is the map, sent from keyDownHandler
            for(let i = 0; i < map.length; i++){ //this is "rectangle rectangle collision" formula
                for(let j = 0; j < map[i].length; j++){
                    if(map[i][j] != 2 && map[i][j] != 28){ //2 is the number associated with the sprite location for link to move on
        // console.log(`${x} <= ${j*16+6} && ${x+12} >= ${j*16} && ${y+10} <= ${i*16+16} && ${y+16} >= ${i*16}out`)
                        if(x <= j*16+6 && x >= j*16 && y <= i*16+16 && y >= i*16){
        // console.log(`${x} <= ${j*16+6} && ${x+12} >= ${j*16} && ${y+10} <= ${i*16+16} && ${y+16} >= ${i*16}in`)
                            //The idea of doing 12 or 10 rather than 16(links sprite size) 
                            return true;                                                    //is to give him some leway to make moving around tarrain easier
                        } 
                    }
                }
            }
            return false;
        }

        //game object collision
        const gameObjectCollision = (x, y, objects, isLink) => {
            if(isLink){
                for(let i = 0; i < objects.length; i++){
                    if(x <= objects[i].x + objects[i].width && x + 16 >= objects[i].x && y <= objects[i].y + objects[i].height && y + 16 >= objects[i].y){
                        //This checks link's location (x,y) and compares it to the(x location, width ** y location, height)
                        //x <= objects[i]x location value + it's width && x+16 for link's hitbox location greaterORequal objectXlocation AND the same principal for Y
                        //note to self::Study this logic more
                        if(objects[i].isPortal){
                            gameMap = maps[objects[i].newMap].map; //changes global variable gameMap if link runs into a portal object names are int's, objects[i].newMap selects the map label int value
                            gameObjects = maps[objects[i].newMap].gameObjects;//selects the same index of maps, and grabs the gameObjects to render
                            linkX = objects[i].newLinkX;
                            linkY = objects[i].newLinkY;
                        } 
                        if(gameObjects[i].isPickUpItem){
                            playPickupItemAnimation = true;
                            //0 - boomerang
                            // 1= bomb
                            //2= bow and arrow
                            //3 = candle
                            //4 = flute
                            //5 = meat
                            //6 potion(red or blue)
                            //7 magic rod
                            //8 raft
                            //9 book of magic
                            //10 ring
                            //11 ladder
                            //12 key
                            //13 bracelet
                            //14 wood sword
                            //where da hearts, magic refils
                            switch(gameObjects[i].pickUpItemNum){
                                case 0:
                                    break;
                                case 1:
                                    break;
                                case 2:
                                    break;
                                case 3:
                                    break;
                                case 4:
                                    break;
                                case 5:
                                    break;
                                case 6:
                                    break;
                                case 7:
                                    break;
                                case 8:
                                    break;
                                case 9:
                                    break;
                                case 10:
                                    break;
                                case 11:
                                    break;
                                case 12:
                                    break;
                                case 13:
                                    break;
                                case 14:
                                    
                                    lastPickUpItem = 14;
                                    swordEquipped = 1;
                                    playSound("./sounds/Item.mp3");
                                    break;
                            }
                            objects.splice(i, 1);
                            animationCounter = 0;
                        }
                    }
                }
            }
        }



        //event listeners + game loop
        //Draw's the playfield
        function draw () {
            setTimeout(() => {
                requestAnimationFrame(draw);
                ctx.fillStyle = "rgb(20,20,20)";
                ctx.fillRect(0,0,256,240);
                drawMap(gameMap);
                drawLink();
                gameObjectCollision(linkX, linkY, gameObjects, true);
                drawGameObjects();
            },1000/fps);
        }
        console.log(gameObjects);
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        draw();





