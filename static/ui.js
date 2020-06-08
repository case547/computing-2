const ui = Object.create(null);

ui.init = function (bots) {
    const el = (id) => document.getElementById(id);
    const cloneTemplate = (id) => document.importNode(el(id).content, true);
}

export default Object.freeze(ui);
