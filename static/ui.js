/**
 * Hello Freddie, welcome to my UI code.
 *
 * I've ordered my functions with respect to the aspect of programming
 * that they are related to, so they may seem a little out of order in
 * terms of the sequence in which the user would encounter/use them.
 *
 * Within each main chunk, you will see the name of the block with the block
 * name in capitals - as an example, // NAVIGATION BUTTONS. Additionally, each
 * individual function will have its own annotation. I havealso commented on
 * any weird stuff going on that may be difficult to understand at first glance.
 *
 * The chunks are as follows:
 *
 *  NAVIGATION BUTTONS: for flipping between the app sections, e.g. landing page, dish editor.
 *  FABULOUS FRONT-END (excluing nav buttons): for misc client-side stuff, which include filtering search results, appending selected ingredients to the 'added ingredients' table.
 *  CALC CENTRAL: any calculations that need to be done that aren't directly tied with database operations.
 *  SERVER SCHTUFF: code that interacts with making queries with handler.js, but are unrelated to the database.
 *  DEATH BY DATABASE: death by database.
 */

import Ajax from "./ajax.js";

const ui = Object.create(null);

const el = (id) => document.getElementById(id);
const cloneTemplate = (id) => document.importNode(el(id).content, true);

ui.init = function () {
    const root = document.documentElement.style;

    // Clearing inputs
    const nameInput = el("dish-namer");
    const dishPortion = el("dish-portioner");
    const editorTitle = el("editor-title");
    const nutriTitle = el("nutri-title");

    const resetFields = function() {
        nameInput.value = "";
        dishPortion.value = "1";
        editorTitle.textContent = "";
        nutriTitle.textContent = "";
        root.setProperty("--result-div-height", "375px");
    };


    // NAVIGATION BUTTONS

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

        popTable();
    };

    // Nutrient Info
    el("back-ingredients").onclick = function () {
        el("nutrition").hidden = true;
        el("nutrition-foot").hidden = true;
        el("dish-editor").hidden = false;
        el("editor-foot").hidden = false;
    };


    // FABULUOUS FRONT-END (excluding nav buttons)

    // Filtering results based on searchbar input
    const searchbar = el("add-ingredient");
    const resultTable = el("result-table");
    const resultRows = resultTable.rows;

    searchbar.onkeyup = function () {
        const input = searchbar.value.toLowerCase();

        for (let row of resultRows) {
            // Hide row if row's name cell doesn't have input value
            if (!row.cells[1].innerHTML.toLowerCase().includes(input)) {
                row.style.display="none";
            } else { // Otherwise, maintain original display style
                row.style.display="table-row";
            }
        };
    };

    // Adding selected ingredients
    const addFood = el("add-button");
    const foodBody = el("ingredient-body");
    addFood.onclick = function () {
        const addedFoods = [];

        for (let row of resultRows) {
            // If checked, add content of name cell to the added foods arr
            if (row.cells[0].firstElementChild.checked === true) {
                addedFoods.push(row.lastElementChild.innerHTML);
            }
        }

        addedFoods.forEach(function (f) {
            const foodTemplate = cloneTemplate("added-ingredient");
            const foodName = foodTemplate.querySelector("[name=food-name]");

            // Set text content and add to template
            foodName.textContent = f;
            foodBody.appendChild(foodTemplate);
        });
    };

    // Removing rows in the added ingredients table
    const foodRows = foodBody.rows;

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

    // Switching nutrient view in NI table
    el("toggle").onclick = function () {
        const macroRows = el("macronutrients");
        const microRows = el("micronutrients");

        macroRows.toggleAttribute("hidden");
        microRows.toggleAttribute("hidden");
    };

    // Populate nutrition table
    const popTable = function () {

        // Populate macros tbody of the nutrition table
        const popMacros = function () {
            const req = {
                "type": "fetchMacros"
            };

            const resp = Ajax.query(req);

            resp.then(function (objs) {
                const vals = objs.map((obj) => Object.values(obj));

                // Create obj from new key-value pair subarrays in vals
                const newObj = Object.fromEntries(vals)

                // Get array of keys to be iterated over in the cloning process
                const keys = Object.keys(newObj);

                const macros = el("macronutrients");
                keys.forEach(function (k) {
                    const nutriTemplate = cloneTemplate("my-macro");
                    const nutriName = nutriTemplate.querySelector(
                        "[name=macro]"
                    );
                    nutriName.textContent = newObj[k];
                    macros.appendChild(nutriTemplate);

                    // Give each nutrient an id equal to its tagname (in the DB)
                    nutriName.setAttribute("id", k);
                });
            });
        };

        popMacros()

        // Populate micros tbody of the nutrition table
        const popMicros = function () {
            const req = {
                "type": "fetchMicros"
            };

            const resp = Ajax.query(req);

            resp.then(function (objs) {
                const vals = objs.map((obj) => Object.values(obj));

                // Create obj from new key-value pair subarrays in vals
                const newObj = Object.fromEntries(vals)

                // Get array of keys to be iterated over in the cloning process
                const keys = Object.keys(newObj);

                const micros = el("micronutrients");
                keys.forEach(function (k) {
                    const nutriTemplate = cloneTemplate("my-micro");
                    const nutriName = nutriTemplate.querySelector("[name=micro]");
                    nutriName.textContent = newObj[k];
                    micros.appendChild(nutriTemplate);

                    // Give each nutrient an id equal to its tagname in the database
                    nutriName.setAttribute("id", k);
                });
            });
        };

        popMicros()
    };


    // CALCULATION CENTRAL

    // Setting total mass value
    const totalMass = el("total-mass");
    const refreshMass = el("mass-refresh");

    refreshMass.onclick = function () {
        // When clicked, give button the class that rotates (by CSS animation)
        refreshMass.className = "col2 rotate-center";

        // Remove rotating class after animation duration has elapsed (600ms)
        const revertClass = function () {
            refreshMass.className = "col2";
        };

        setTimeout(revertClass, 600);

        // Call massAdder func to do its thing
        massAdder(function (result) {
            totalMass.textContent = result;
        });
    };

    const massAdder = function (callback) {
        let rows = foodBody.querySelectorAll("tr");

        // Pass in the query selector and make array out of all inputted masses
        let tds = Array.from(
            rows, (row) => row.cells[1].firstChild.valueAsNumber
        );

        // Edge case consideration: replace NaN masses with 0
        tds.forEach(function (td) {
            if (td === NaN) {
                tds = 0;
            }
        });

        // Pass reduce func to task queue in case user adds loads of stuff
        const reducer = (a, b) => a + b;
        setTimeout(function () {
            callback(tds.reduce(reducer, 0));
        }, 0);
    };


    // SERVER SCHTUFF

    // Giving the dish a title
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

        // Reduce table div heights when dish title is generated
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

            // Dynamically generating category options
            const catSelect = el("category-select");
            const options = [];
            cats.forEach(function (c, i) {
                // Generic template stuff
                const catTemplate = cloneTemplate("category-option");
                const catName = catTemplate.querySelector("[name=food-cat]");
                options.push(catName);
                catName.textContent = c;
                catSelect.appendChild(catTemplate);

                // Give each category element a value identical to text content
                catName.setAttribute("value", c);

                // Set clicked category as selected and others as not
                catName.onclick = function () {
                    options.forEach(function (cn) {
                        cn.setAttribute("aria-selected", false);
                    });
                    catName.setAttribute("aria-selected", true);

                };
                if (i === 0) {
                    catName.onclick();
                }

                // For those weird mouse-less people
                catName.onkeydown = function (event) {
                    if (event.key === "Enter") {
                        catName.click();
                    }
                };
            });

            catFilter();
        });
    };

    // Creating search result table
    const catSelect = el("category-select");
    const options = catSelect.getElementsByTagName("option");

    const catFilter = function () {
        for (let opt of options) {
            opt.onclick = function () {

                // Remove existing rows if a category was previously selected
                let i = resultTable.rows.length;
                while (true) {
                    if (i < 1) {
                        break;
                    }
                    resultTable.deleteRow(0);
                    i -= 1;
                }

                // Make a query for foods in selected category
                const req = {
                    "type": "catFilter",
                    "category": opt.value
                };

                const resp = Ajax.query(req);

                resp.then(function (objs) {
                    // Convert response into a useable flat array
                    const vals = objs.map((obj) => Object.values(obj));
                    const results = vals.flat();

                    results.forEach(function (r) {
                        const resultTemplate = cloneTemplate("result-row");
                        const resultName = resultTemplate.querySelector(
                            "[name=result]"
                        );
                        resultName.textContent = r;
                        resultTable.appendChild(resultTemplate);

                        // Clicking name cell now equal to clicking checkbox
                        resultName.onclick = function () {
                            resultName.parentElement.cells[0]
                            .firstElementChild.click();
                        };
                    });
                });
            };
        };
    };


    // Constructing query for nutrient data
    const nutriQuery = function () {
        let nutriTotal = {};

        for (let i = 0; i < foodRows.length; i++) {
            const req = {
                "type": "nutriTable",
                "ingredient": foodRows[i].cells[0].textContent
            };

            const resp = Ajax.query(req);

            resp.then(function (objs) {
                const vals = objs.map((obj) => Object.values(obj));

                // Create obj from new key-value pair subarrays in vals
                const newObj = Object.fromEntries(vals)

                // Ensure values are numbers rather than strings
                for (let key in newObj) {
                    if (!nutriTotal[key]) {
                        nutriTotal[key] = Number(newObj[key]);
                    } else {
                        nutriTotal[key] += Number(newObj[key]);
                    }
                };
            });
        };

        console.log(nutriTotal)
    };
};

export default Object.freeze(ui);
