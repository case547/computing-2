const F = Object.create(null);

F.compose = (...fs) => (x) => fs.reduceRight((a, f) => f(a), x);

F.curry = (f) => (...first) => (...second) => f(...first, ...second);

F.filter = (f) => (array) => array.filter(f);

F.identity = (x) => x;

F.map = (f) => (array) => array.map(f);

F.pipe = (...fs) => (x) => fs.reduce((a, f) => f(a), x);

F.reduce = (f, initialValue) => (array) => array.reduce(f, initialValue);

export default Object.freeze(F);
