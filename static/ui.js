import Ajax from "./ajax.js";

const ui = Object.create(null);

const el = (id) => document.getElementById(id);
const cloneTemplate = (id) => document.importNode(el(id).content, true);

ui.init = function () {
    // el("app-head").onclick = function () {

    // };

    // BUTTONS

    // Landing page
    el("create-newdish").onclick = function () {
        el("landing").hidden = true;
        el("credits").hidden = true;
        el("dish-editor").hidden = false;
        el("editor-foot").hidden = false;

        getCategories();
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

        getCategories();
    };

    // Dish editor
    el("filter-toggle").onclick = function () {
        const field = el("filter-set");
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

    // Nutrient Info
    el("back-ingredients").onclick = function () {
        el("nutrition").hidden = true;
        el("nutrition-foot").hidden = true;
        el("dish-editor").hidden = false;
        el("editor-foot").hidden = false;
    };


    // CALC CENTRAL

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
            callback(tds.reduce(reducer));
        }, 0);
    };


    // SERVER SCHTUFF

    // Dish titler
    const editorTitle = el("editor-title");
    const nutriTitle = el("nutri-title");
    const nameInput = el("dish-namer");

    nameInput.onkeydown = function (event) {
        if (event.key !== "Enter") {
            return;
        }

        const req = {
            "type": "nameDish",
            "output": nameInput.value
        };

        const reqString = JSON.stringify(req);
        console.log(reqString);

        const resp = Ajax.query(req);
        const respDishName = resp.then((resp) => resp.output);

        respDishName.then(function (name) {
            editorTitle.textContent = name;
            nutriTitle.textContent = name;
            nameInput.setAttribute("value", name);
        });

        event.preventDefault();
    };


    // DEATH BY DATABASE

    // Generating options for food categories
    const getCategories = function () {
        const req = {
            "type": "getCategories"
        };

        const resp = Ajax.query(req);

        resp.then(function (objs) {
            const vals = objs.map((obj) => Object.values(obj));
            const cats = vals.flat();

            const catSelect = el("category-select");
            const options = [];
            cats.forEach(function (c, i) {
                const catTemplate = cloneTemplate("category-option");
                const catName = catTemplate.querySelector("[name=food-cat]");
                options.push(catName);
                catName.textContent = c;
                catSelect.appendChild(catTemplate);

                catName.onclick = function () {
                    options.forEach(function (cn) {
                        cn.setAttribute("aria-selected", false);
                    });
                    catName.setAttribute("aria-selected", true);

                    searchResults();
                };
                if (i === 0) {
                    catName.onclick();
                }

                catName.onkeydown = function (event) {
                    if (event.key === "Enter") {
                        catName.click();
                    }
                };
            });
        });
    };

    // Creating table in ingredient search
    // function searchResults (resp) {
    //     return;
    // };
};

export default Object.freeze(ui);
