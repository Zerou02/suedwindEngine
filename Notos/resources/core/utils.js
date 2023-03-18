let _idCounter = -1;
export const assignID = () => {
    _idCounter++;
    return _idCounter;
};
