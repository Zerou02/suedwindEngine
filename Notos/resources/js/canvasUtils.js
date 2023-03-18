export const drawImage = (ctx, imgPath, position, onLoadFn) => {
    let ima = new Image();
    ima.src = imgPath;
    ima.onload = () => {
        ctx.drawImage(ima, position.x, position.y);
        onLoadFn(ima);
    };
};
