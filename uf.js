class UnionFind {
    constructor(arr) {
        const n = arr.length;
        const node = (obj) => ({obj, p: this, size: 1});
        const sets = {};
        for (const obj of arr) {
            sets[obj.id] = node(obj);
        }
        let numSets = n;

        this.union = (x, y) => {
            let setX = sets[this.find(x)];
            let setY = sets[this.find(y)];
            if (setX === setY) {
                return;
            }
            if (setX.size >= setY.size) {
                setY.p = setX;
            } else {
                setX.p = setY;
            }
            setX.size += setY.size;
            setY.size += setX.size;
            --numSets;
        }
    
        this.find = id => {
            let cur = sets[id];
            while (sets[id] !== sets[id].p) {
                cur = sets[id].p;
            }
            return cur.id;
        }

        this.numSets = () => numSets;
    }
}

export default UnionFind;