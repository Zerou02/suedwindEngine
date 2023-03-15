const pos = {
    new: (x, y) => {
        return {
            x,
            y,
        };
    },
    add: (a, b) => {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
        };
    },
    scale: (a, b) => {
        return {
            x: a * b.x,
            y: a * b.y,
        };
    },
    dist: (a, b) => {
        return Math.abs(pos.y(a, b)) + Math.abs(pos.x(a, b));
    },
    y: (...positions) => {
        return positions.reduce((last, cur, i) => last + (i % 2 === 0 ? 1 : -1) * cur.y, 0);
    },
    x: (...positions) => {
        return positions.reduce((last, cur, i) => last + (i % 2 === 0 ? 1 : -1) * cur.x, 0);
    },
    spread: (p) => Object.values(p),
    string: (p) => `(${p.x},${p.y})`,
};
export default pos;
