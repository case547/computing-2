const ui = Object.create(null);

ui.init = function () {
    const el = (id) => document.getElementById(id);
    const cloneTemplate = (id) => document.importNode(el(id).content, true);

    el("app-head").onclick = function () {

    };

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

    // My Dishes buttons
    el("home").onclick = function () {
        el("my-dishes").hidden = true;
        el("mydishes-foot").hidden = true;
        el("landing").hidden = false;
        el("credits").hidden = false;
    };
    el("create-mydish").onclick = function () {
        el("my-dishes").hidden = true;
        el("mydishes-foot").hidden = true;
        el("dish-editor").hidden = false;
        el("editor-foot").hidden = false;
    };

    // Dish editor buttons
    el("filter-toggle").onclick = function () {
        let field = el("filter-set");
        field.toggleAttribute("hidden");
    };
    el("back-dishes").onclick = function () {
        el("dish-editor").hidden = true;
        el("editor-foot").hidden = true;
        el("my-dishes").hidden = false;
        el("mydishes-foot").hidden = false;
    };
    el("see-info").onclick = function () {
        el("dish-editor").hidden = true;
        el("editor-foot").hidden = true;
        el("nutrition").hidden = false;
        el("nutrition-foot").hidden = false;
    };

    // NI buttons
    el("back-ingredients").onclick = function () {
        el("nutrition").hidden = true;
        el("nutrition-foot").hidden = true;
        el("dish-editor").hidden = false;
        el("editor-foot").hidden = false;
    };
};

export default Object.freeze(ui);
