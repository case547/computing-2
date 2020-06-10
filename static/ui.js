import F from "./functional.js";

const ui = Object.create(null);

const el = (id) => document.getElementById(id);
const cloneTemplate = (id) => document.importNode(el(id).content, true);

ui.init = function () {
    el("app-head").onclick = function () {

    };

    // Landing page
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

    // My Dishes
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


    // DISH EDITOR SECTION

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


    // Setting total mass value

    const totalMass = el("total-mass");
    const addFood = el("add-food");

    addFood.onclick = function () {
        sorter(function (result) {
            totalMass.textContent = result;
        });
    };

    const sorter = function (callback) {
        let table = document.querySelector("[name=ingredient-table]");
        let rows = table.querySelectorAll("tr");

        let tds = Array.from(rows, (row) => row.cells[3]);

        const reducer = (a, b) => a + b;
        setTimeout(function () {
            callback(tds.reduce(reducer, 0));
        }, 0);
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
