const handler = function (obj) {
    const dishName = obj.output;
    return {
        "output": dishName
    };
};

export default Object.freeze(handler);
