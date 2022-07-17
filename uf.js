class UnionFind {
    constructor(arr) {
        const n = arr.length;
        const node = (obj) => {
            const res = {};
            res.id = obj.id;
            res.obj = obj;
            res.p = res;
            res.size = 1;
            return res;
        };
        const sets = {};
        for (const obj of arr) {
            sets[obj.id] = node(obj);
        }
        let size = n;

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
            --size;
        }
    
        this.find = id => {
            let cur = sets[id];
            while (sets[cur.id] !== sets[cur.id].p) {
                cur = sets[cur.id].p;
            }
            return cur.id;
        }

        this.get = (i) => {
            const mappings = new Array(n).fill(null).map(() => []);
            for (let i = 0; i < n; ++i) {
                mappings[this.find(i)].push(i);
            }
            return i === undefined ? mappings[this.find(i)] : mappings.filter(obj => obj.length !== 0);
        }

        this.size = () => size;
    }
}

export default UnionFind;