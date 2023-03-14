type Position = {
  x: number;
  y: number;
};

const posToString = (pos: Position): string => {
  return `(${pos.x},${pos.y})`;
};

const pos = {
  new: (x: number, y: number): Position => {
    return {
      x,
      y,
    };
  },
  add: (a: Position, b: Position): Position => {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
    };
  },
  scale: (a: number, b: Position): Position => {
    return {
      x: a * b.x,
      y: a * b.y,
    };
  },
  dist: (a: Position, b: Position): number => {
    return Math.abs(pos.y(a, b)) + Math.abs(pos.x(a, b));
  },
  y: (...positions: Position[]): number => {
    return positions.reduce(
      (last, cur, i) => last + (i % 2 === 0 ? 1 : -1) * cur.y,
      0
    );
  },
  x: (...positions: Position[]): number => {
    return positions.reduce(
      (last, cur, i) => last + (i % 2 === 0 ? 1 : -1) * cur.x,
      0
    );
  },
};

export default pos;
export { Position, posToString };
