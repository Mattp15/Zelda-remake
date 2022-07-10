const canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        document.body.style.zoom = "400%";
        //document.addEventListener("keydown", keyDownHandler, false);
        // document.addEventLIstener("keyup", keyUPHandler, false);
        const fps = 60;
        let worldTiles = new Image();
        worldTiles.src = "images/overworld/tiles-overworld.png";

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


        const drawMap = level => {
            for(let i = 0; i < level.length; i++){
                for(let j = 0; j < level[i].length; j++){
                    ctx.drawImage(worldTiles, ((level[i][j]%18) * 17) + 1,//x-axis of the sprite image
                    (Math.floor(level[i][j]/18) * 17) + 1, //y-axis of the sprite image
                    16, 16, j *16, i *16, 16, 16);//width, height, x-position(columns), y-position(rows), map size 16x16
                }
            }
        }

        function draw () {
            setTimeout(() => {
                requestAnimationFrame(draw);
                ctx.fillStyle = "rgb(20,20,20)";
                ctx.fillRect(0,0,256,240);
                drawMap(map7_7);
            },1000/fps);
        }
        draw();
