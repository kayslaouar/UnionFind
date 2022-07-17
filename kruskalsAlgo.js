import UnionFind from './uf.js';
import PriorityQueue from '../heaps/pq.js';

// LeetCode 1584

function generateEdges(points) {
    const n = points.length;
    const weightF = (from, to) => Math.abs(points[to][0] - points[from][0]) + Math.abs(points[to][1] - points[from][1]);
    const edge = (from, to, weight) => ({from, to, weight});
    const edges = [];
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            edges.push(edge(i, j, weightF(i, j)));
        }
    }
    return edges;
}

function minCostConnectPoints(points) {
    const n = points.length;
    const ufWrapper = id => ({id});
    const arr = new Array(n);
    for (let i = 0; i < n; ++i) {
        arr[i] = ufWrapper(i);
    }
    const uf = new UnionFind(arr);
    const edges = generateEdges(points);
    const pq = new PriorityQueue({arr: edges});
    let minCost = 0;
    while (uf.size() > 1) {
        let cur = pq.peek();
        while (uf.find(cur.from) === uf.find(cur.to))  {
            pq.remove();
            cur = pq.peek();
        }
        pq.remove();
        uf.union(cur.from, cur.to);
        minCost += cur.weight;
    }
    return minCost;
}