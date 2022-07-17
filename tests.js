import assert from 'assert';
import UnionFind from './uf.js';

describe('new UnionFind()', () => {
    const n = 64;
    const arr = new Array(n);
    const ufWrapper = i => ({id: i});
    for (let i = 0; i < n; ++i) {
        arr[i] = ufWrapper(i);
    }
    const uf = new UnionFind(arr);
    
    it('initializes to the correct size', () => {
        assert.equal(n, uf.size());
    });

    describe('find(x)', () => {
        it('initially identifies each item as belonging to its own set', () => {
            for (let i = 0; i < n; ++i) {
                assert.equal(uf.find(i), i);
            }
        });
    });

    describe('union(x, y)', () => {
        it('does nothing when unioning the same obj with itself', () => {
            uf.union(1, 1);
            assert.equal(uf.size(), n);
        });

        it ('correctly updates the set membership and sizes of objects of two merged objects', () => {
            assert.notEqual(uf.find(0), uf.find(1));
            uf.union(0, 1);
            assert.equal(uf.find(0), uf.find(1));
            assert.equal(uf.size(), n - 1);
        });

        it ('does nothing when two objects are in the same set', () => {
            uf.union(0, 1);
            assert.equal(uf.find(0), uf.find(1));
            assert.equal(uf.size(), n - 1);
        });

        it ('can merge everything', () => {
            uf.union(1, 2);
            uf.union(3, 4);
            uf.union(5, 6);
            uf.union(7, 8);
            uf.union(9, 10);
            uf.union(6, 10);
            uf.union(6, 8);
            uf.union(6, 4);
            uf.union(1, 7);
            for (let i = 0; i < 10; ++i) {
                assert.equal(uf.find(i), uf.find(i + 1));
            }
        });
    });
});