const ui = Object.create(null);

ui.init = function () {
    const el = (id) => document.getElementById(id);
    const cloneTemplate = (id) => document.importNode(el(id).content, true);

    // Landing page buttons
    el("create-newdish").onclick = function () {
        el("landing").hidden = true;
        el("credits").hidden = true;
        el("dish-editor").hidden = false;
        el("editor-foot").hidden = false;
    };
    el("view").onclick = function () {
        el("landing").hidden = true;
        el("credits").hidden = true;
        el("my-dishes").hidden = false;
        el("mydishes-foot").hidden = false;
    };
    el("browse").onclick = function () {

    };

    // Dish editor buttons
    el("filter-toggle").onclick = function () {
        let field = el("filter-set");
        field.toggleAttribute("hidden");
    };
    el("back-dishes").onclick = function () {
        el("dish-editor").hidden = true;
        el("editor-foot").hidden = true;
        el("landing").hidden = false;
        el("credits").hidden = false;
    };
    el("see-info").onclick = function () {
        el("dish-editor").hidden = true;
        el("editor-foot").hidden = true;
        el("nutrition").hidden = false;
        el("nutrition-foot").hidden = false;
    };
};

export default Object.freeze(ui);
