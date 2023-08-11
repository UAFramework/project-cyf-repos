import { config } from "./config.js";
import { sort, setPagination } from "./handlers.js";

function createSortingSelector() {
    const label = document.createElement("label");
    
    const select = document.createElement("select");
    select.name = "sort-by";

    const button = document.createElement("button");

    const directions = [{value: "asc", html: "A-Z &darr;"}, {value: "desc", html: "Z-A &uarr;"}];

    const options = [{value: "name", text: "Name"}, {value: "updated_at", text: "Updated At"}]
        .map(({value, text}) => {
            const option = document.createElement("option");
            option.value = value;
            option.innerText = text;

            return option;
        });

    select.append(...options);

    button.value = config.sortBy.direction;
    button.innerHTML = config.sortBy.direction === "asc" ? "A-Z &darr;" : "Z-A &uarr;";

    label.append("Sort by: ", select, button);

    select.addEventListener("change", event => {
        let field = event.target.value;
        let direction = button.value;
        sort({field, direction});
    });
    
    button.addEventListener("click", event => {
        let field = select.value;
        
        let direction = event.target.value === "asc" ? "desc" : "asc";
        
        const {value, html} = directions.find(({value}) => 
            value === direction
        );
        
        button.value = value;
        button.innerHTML = html;

        sort({field, direction});
    });

    return label;
}

function createPaginationSelector() {
    const label = document.createElement("label");
    const select = document.createElement("select");
    select.name = "pagination";

    const options = [
            {value: "10", text: "10"}, 
            {value: "20", text: "20"},
            {value: "50", text: "50"},
            {value: "100", text: "100"}
        ]
        .map(({value, text}) => {
            const option = document.createElement("option");
            option.value = value;
            option.innerText = text;

            return option;
        });
    
    select.append(...options);
    label.append("Records on the page: ", select);

    select.addEventListener("change", event => {
        setPagination(event.target.value);
    });

    return label;
}

export { createSortingSelector, createPaginationSelector };