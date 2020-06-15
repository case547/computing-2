import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./nutri.sqlite");

const handlers = Object.create(null);

const queryPromise = function (query, ...queryParams) {
    // Func executes immediately rather than as callback
    return new Promise(function (resolve, reject) {
        // Setup to promise; want promise to finish quickly
        // Rows to be returned are what the promise comes back with
        db.all(query, queryParams, function (err, rows) {
            // When db.all comes back, will return func with either err or rows
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

const actionPromise = function (query, ...queryParams) {
    return new Promise(function (resolve, reject) {
        //.run because action query rather than row query
        db.run(query, queryParams, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};

const handler = function (obj) {
    return Promise.resolve(handlers[obj.type](obj));
};

handlers.nameDish = function (obj) {
    const dishName = obj.output;
    return Promise.resolve({
        "output": dishName
    });
};

handlers.getCategories = function (obj) {
    const query = ("SELECT category FROM categories");
    return queryPromise(query, obj.category);
};

// handlers.listFoods = function (obj) {
//     const query = (

//     );
// }

export default Object.freeze(handler);
