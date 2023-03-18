export const drawImage = (ctx, imgPath, position, size, onLoadFn) => {
    let ima = new Image();
    ima.src = imgPath;
    ima.onload = () => {
        if (size) {
            ctx.drawImage(ima, position.x, position.y, size.x, size.y);
        }
        else {
            ctx.drawImage(ima, position.x, position.y);
        }
        onLoadFn(ima);
    };
};
