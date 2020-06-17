import Ajax from "./ajax.js";

const ui = Object.create(null);

const el = (id) => document.getElementById(id);
const cloneTemplate = (id) => document.importNode(el(id).content, true);

ui.init = function () {
    const root = document.documentElement.style;

    const nameInput = el("dish-namer");
    const dishPortion = el("dish-portioner");
    const editorTitle = el("editor-title");
    const nutriTitle = el("nutri-title");

    const resetFields = function() {
        nameInput.value = "";
        dishPortion.value = "";
        editorTitle.textContent = "";
        nutriTitle.textContent = "";
        root.setProperty("--result-div-height", "375px");
    };


    // BUTTONS

    // Landing page
    el("create-newdish").onclick = function () {
        el("landing").hidden = true;
        el("credits").hidden = true;
        el("dish-editor").hidden = false;
        el("editor-foot").hidden = false;

        resetFields();
        fetchCategories();

        root.setProperty("--banner-height", "100px");
    };
    el("view").onclick = function () {
        el("landing").hidden = true;
        el("credits").hidden = true;
        el("my-dishes").hidden = false;
        el("mydishes-foot").hidden = false;

        root.setProperty("--banner-height", "100px");
    };
    el("browse").onclick = function () {

    };

    // My Dishes
    el("home").onclick = function () {
        el("my-dishes").hidden = true;
        el("mydishes-foot").hidden = true;
        el("landing").hidden = false;
        el("credits").hidden = false;

        root.setProperty("--banner-height", "135px");
    };
    el("create-mydish").onclick = function () {
        el("my-dishes").hidden = true;
        el("mydishes-foot").hidden = true;
        el("dish-editor").hidden = false;
        el("editor-foot").hidden = false;

        resetFields();
        fetchCategories();
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

    const foodBody = el("ingredient-body");
    // const foodRows = foodBody.rows;
    /* const dels = [];

    const delRow = function (i) {
        foodBody.removeChild(foodRows[i]);
    };

    Array.from(foodRows).forEach(function (row) {
        const del = row.cells[2].children[0];
        del.onclick = function () {
            foodBody.removeChild(foodRows[foodRows.indexOf(row)]);
        };
    }); */

    /* for (let i; i < foodRows.length; i++) {
        const del = foodRows[i].cells[2].children[0]
        dels.push(del);
    }

    const delNames = [];
    dels.forEach(function (i) {
        const delName = document.querySelector("[class=delete]")
        delNames.push(delName)

        delName.onclick = function () {
            console.log("click")
            foodRows.removeChild(dels[i])
        };
        if (i === 0) {
            botName.onclick()
        }
    }) */

    /* for (let i; i < foodRows.length; i++) {
        const del = foodRows[i].cells[2].children[0]
        del.onclick = function () {
            console.log("click")
            foodBody.deleteRow(i)
        }
    } */

    /* let i = 0;
    while (true) {
        if (i >= foodRows.length) {
            break;
        }
        const del = foodRows[i].cells[2].firstChild;
        del.onclick = function () {
            foodRows.deleteRow(i);
        };
    } */

    /* const dels = []
    for (let row of foodRows) {
        if (foodRows.length > 0) {
            const del = row.cells[2].children[0]
            del.onclick = function () {
                console.log("click")
                foodRows.deleteRow(
                    (Array.from(foodRows)).indexOf(row)
                )
            }
        }
    } */

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
    const refreshMass = el("mass-refresh");

    refreshMass.onclick = function () {
        refreshMass.className = "col2 rotate-center";

        const revertClass = function () {
            refreshMass.className = "col2";
        };

        setTimeout(revertClass, 600);

        sorter(function (result) {
            totalMass.textContent = result;
        });
    };

    const sorter = function (callback) {
        let rows = foodBody.querySelectorAll("tr");

        let tds = Array.from(
            rows, (row) => row.cells[1].firstChild.valueAsNumber
        );

        const reducer = (a, b) => a + b;
        setTimeout(function () {
            callback(tds.reduce(reducer, 0));
        }, 0);
    };


    // SERVER SCHTUFF

    // Titling the dish
    nameInput.onkeydown = function (event) {
        if (event.key !== "Enter" || nameInput.value === "") {
            return;
        }

        const req = {
            "type": "nameDish",
            "output": nameInput.value
        };

        const resp = Ajax.query(req);
        const respDishName = resp.then((resp) => resp.output);

        respDishName.then(function (name) {
            editorTitle.textContent = name;
            nutriTitle.textContent = name;
            nameInput.setAttribute("value", name);
        });

        root.setProperty("--result-div-height", "300px");

        event.preventDefault();
    };


    // DEATH BY DATABASE

    // Generating food category options
    const fetchCategories = function () {
        const req = {
            "type": "fetchCategories"
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
                catName.setAttribute("value", c);

                catName.onclick = function () {
                    options.forEach(function (cn) {
                        cn.setAttribute("aria-selected", false);
                    });
                    catName.setAttribute("aria-selected", true);

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

            catFilter();
        });
    };

    // Creating table in the search result div
    const catSelect = el("category-select");
    const options = catSelect.getElementsByTagName("option");
    const resultTable = el("result-table");

    const catFilter = function () {
        for (let opt of options) {
            opt.onclick = function () {
                let i = resultTable.rows.length
                // Remove existing rows
                while (true) {
                    if (i < 1) {
                        break
                    }
                    resultTable.deleteRow(0);
                    i -= 1
                }

                // Make a query for foods in selected category
                const req = {
                    "type": "catFilter",
                    "category": opt.value
                };

                const resp = Ajax.query(req);

                resp.then(function (objs) {
                    const vals = objs.map((obj) => Object.values(obj));
                    const results = vals.flat();

                    results.forEach(function (r) {
                        const resultTemplate = cloneTemplate("result-row")
                        const resultName = resultTemplate.querySelector(
                            "[name=result]"
                        )
                        resultName.textContent = r;
                        resultTable.appendChild(resultTemplate);

                        resultName.onclick = function () {
                            resultName.parentElement.cells[0]
                            .firstElementChild.click();
                        }
                    });
                });


            }
        }
    }

    // Filtering results based on searchbar input
    const searchbar = el("add-ingredient")
    const resultRows = resultTable.rows

    searchbar.onkeyup = function () {
        const input = searchbar.value.toLowerCase()

        for (let row of resultRows) {
            if (!row.cells[1].innerHTML.toLowerCase().includes(input)) {
                row.style.display="none"
            } else {
                row.style.display="table-row"
            }
        }
    }

    // Adding selected ingredients
    const addFood = el("add-button");
    addFood.onclick = function () {
        const addedFoods = []

        for (let row of resultRows) {
            if (row.cells[0].firstElementChild.checked === true) {
                addedFoods.push(row.lastElementChild.innerHTML)
            }
        }

        addedFoods.forEach(function (f) {
            const foodTemplate = cloneTemplate("added-ingredient")
            const foodName = foodTemplate.querySelector("[name=food-name]")

            foodName.textContent = f;
            foodBody.appendChild(foodTemplate);
        })
    }
};

export default Object.freeze(ui);
