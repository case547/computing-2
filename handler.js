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
            resolve(this.changes); // sorry Mr Crockford
        });
    });
};

const handler = function (obj) {
    // handlers.[any] corresponding with value of "type" key in reqs in ui.js
    return Promise.resolve(handlers[obj.type](obj));
};

handlers.nameDish = function (obj) {
    const dishName = obj.output; // where output is a key
    return Promise.resolve({
        "output": dishName
    });
};

handlers.fetchCategories = function (obj) {
    const query = ("SELECT category FROM categories");
    return queryPromise(query);
};

handlers.catFilter = function (obj) {
    const query = (
        "SELECT foods.long_desc " +
        "FROM foods LEFT JOIN categories " +
        "ON foods.fkCategory = categories.pkCategories " +
        "WHERE category = ?"
    );

    return queryPromise(query, obj.category);
};

handlers.nutriTable = function (obj) {
    const query = (
        "SELECT nutrients.tagname, nutrientData.nutri_val " +
        "FROM nutrientData " +
        "LEFT JOIN nutrients ON nutrients.pkNutrients = fkNutrient " +
        "LEFT JOIN foods ON foods.pkFoods = nutrientData.fkFood " +
        "WHERE include = 1 AND long_desc = ?"
    );

    return queryPromise(query, obj.ingredient);
};

handlers.fetchMacros = function (obj) {
    const query = (
        "SELECT tagname, nutrient FROM nutrients " +
        "WHERE include = 1 AND units = 'g'"
    );

    return queryPromise(query);
};

handlers.fetchMicros = function (obj) {
    const query = (
        "SELECT tagname, nutrient FROM nutrients " +
        "WHERE include = 1 AND units = 'mg'"
    );

    return queryPromise(query);
};

export default Object.freeze(handler);
