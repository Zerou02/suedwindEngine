let _idCounter = -1;
export const assignID = () => {
  _idCounter++;
  return _idCounter;
};

export const sortPoints = (x1: number, x2: number, y1: number, y2: number) => {
  return {
    lowerX: x1 < x2 ? x1 : x2,
    higherX: x1 > x2 ? x1 : x2,
    lowerY: y1 < y2 ? y1 : y2,
    higherY: y1 > y2 ? y1 : y2,
  };
};
