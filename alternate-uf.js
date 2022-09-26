// LeetCode 721

function intersection(A, B) {
	const table = {};
	const intersection = [];
	for (let i = 1; i < A.length; ++i) {
		table[A[i]] = true;
	}
	for (let i = 1; i < B.length; ++i) {
		if (B[i] in table) {
			intersection.push(B[i]);
		}
	}
	return intersection;
}

function union(sets) {
	const union = {};
	for (const set of sets) {
		for (const e of set) {
			union[e] = true;
		}
	}
	return Object.keys(union);
}

function initUFLookupTable(n) {
	const uf = new Array(n);
	for (let i = 0; i < n; ++i) {
		uf[i] = i;
	}
	return uf;
}

function accountsMerge(accounts) {
	const n = accounts.length;
	const uf = initUFLookupTable(n);
	for (let i = 0; i < accounts.length; ++i) {
		for (let j = 0; j < accounts.length; ++j) {
			if (intersection(accounts[i], accounts[j]).length > 0) {
				accounts[i] = union([accounts[i], accounts[j]]);
				accounts[j] = accounts[i];
				let set = Math.min(uf[i], uf[j]);
				uf[i] = set;
				uf[j] = set;
			}
		}
	}
	const groups = {};
	const results = [];
	for (let i = 0; i < n; ++i) {
		if (!(uf[i] in groups)) {
			groups[uf[i]] = true;
			results.push(accounts[i]);
		}
	}
	const comparator = (a, b) => {
		if (!a.includes('@')) {
			return -1;
		} else if (!b.includes('@')) {
			return 1;
		} else {
			for (let i = 0; i < Math.min(a.length, b.length); ++i) {
				if (a.charCodeAt(i) < b.charCodeAt(i)) {
					return -1;
				} else if (b.charCodeAt(i) < a.charCodeAt(i)) {
					return 1;
				}
			}
			return a.length < b.length ? -1 : 1;
		}
	};
	results.forEach(arr => arr.sort(comparator));
	return results;
}

function union(sets) {
	const union = {};
	for (const set of sets) {
		for (const e of set) {
			union[e] = true;
		}
	}
	return Object.keys(union);
}

function comparator(a, b) {
	if (!a.includes('@')) {
		return -1;
	} else if (!b.includes('@')) {
		return 1;
	} else {
		for (let i = 0; i < Math.min(a.length, b.length); ++i) {
			if (a.charCodeAt(i) < b.charCodeAt(i)) {
				return -1;
			} else if (b.charCodeAt(i) < a.charCodeAt(i)) {
				return 1;
			}
		}
		return a.length < b.length ? -1 : 1;
	}
}

function initUF(n) {
	const arr = [];
	const ufWrapper = id => ({ id });
	for (let i = 0; i < n; ++i) {
		arr.push(ufWrapper(i));
	}
	return new UnionFind(arr);
}

function accountsMerge(accounts) {
	const n = accounts.length;
	const uf = initUF(n);
	for (const account of accounts) {
        for (let i = 1; i < account.length; ++i) {
            
        }
    }
	return uf.get().map(set => union(set.map(i => accounts[i])).sort(comparator));
}
