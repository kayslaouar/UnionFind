import assert from 'assert';
import UnionFind from './uf.js';

describe('new UnionFind()', () => {
    it('initializes inputs to individual sets each with self loops', () => {
        const arr = [1, 2, 3];
        const ufWrapper = (x, i) => ({id: id, obj: x});
        const uf = new UnionFind(arr.map((x, i) => ufWrapper(x, i)));
        for (const set of uf.sets) {
            assert.equal(set.p, set);
        }
    });

    it('', () => {

    });
});