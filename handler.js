const handler = function (obj) {
    const dishName = obj.output;
    return Promise.resolve({
        "output": dishName
    });
};

export default Object.freeze(handler);
