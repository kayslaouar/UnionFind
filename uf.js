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

        this.add = (x) => {
            sets[x] = node({id: x});
            ++size;
            return x;
        }

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
            if (!(id in sets)) {
                return null;
            }
            let cur = sets[id];
            while (sets[cur.id] !== sets[cur.id].p) {
                cur = sets[cur.id].p;
            }
            return cur.id;
        }

        this.get = wid => {
            const mappings = {};
            for (const id in sets) {
                let gid = this.find(id);
                if (gid in mappings) {
                    mappings[gid].push(id);
                } else {
                    mappings[gid] = [id];
                }
            }
            return wid !== undefined ? mappings[this.find(wid)] : Object.values(mappings);
        }

        this.size = () => size;
    }
}

export default UnionFind;