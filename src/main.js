import { repos } from "./data/repos.js";

// global `options` objects that stores options
// chosen by the user of the web-page.
const config = {
    filterby: null,
    sortBy: {
        field: "name",
        direction: "asc" // "asc" | "desc"
    },
    recordsOnPage: 10
};

function buildPage() {
    const root = document.querySelector("div#root");
    
    const table = createTable(repos);
    const searchBar = createSearchComponent();
    const sortComponent = createSortComponent()

    root.append(searchBar, sortComponent, table);
}

function search(searchTerm) {
    
    if (searchTerm === "") {
        alert("Please give me searching criteria!");
        return;
    }

    config.filterby = searchTerm;

    // refresh/ubdate table
    const trows = convertReposToTableRows(repos)
    const tbody = document.querySelector("table > tbody");
    tbody.replaceChildren(...trows);
    
}

function sort({field, direction}) {
    // implement sort functionality
    // and use this function in event handlers
    // for input and button elements in Sorting Component.

    config.sortBy.field = field;
    config.sortBy.direction = direction;
    
    const trows = convertReposToTableRows(repos);
    const tbody = document.querySelector("table > tbody");
    tbody.replaceChildren(...trows);
}

function setPagination(recordsOnPage) {
    // implement pagination functionality
    // and use this function in event handler 
    // for Pagination Component
}


function convertReposToTableRows(repos) {

    const filteredRepos = config.filterby == null ? [...repos] :
        repos.filter(({name, description}) => 
                // condition1 || (condition2.1 && condition2.2)
                name.includes(config.filterby || 
                    (description != null && description.includes(config.filterby))
        ));

    filteredRepos.sort((repo1, repo2) => {
        let a = null;
        let b = null;

        if (config.sortBy.field === "name") {                
            a = repo1.name;
            b = repo2.name;
        }

        if (config.sortBy.field === "updated_at") {
            a = new Date(repo1.updated_at);
            b = new Date(repo2.updated_at);
        }

        if (a > b) {
            return config.sortBy.direction === "asc" ? 1 : -1;
        };

        if (a < b) {
            return config.sortBy.direction === "asc" ? -1 : 1;
        };

        return 0;

    });
    
    return filteredRepos
        .map( ({name, updated_at, description, html_url}) => {
            const tr = document.createElement("tr");
            
            const tdName = document.createElement("td");
            tdName.innerText = name;

            const tdDescription = document.createElement("td");
            tdDescription.innerText = description;

            const tdUrl = document.createElement("td");
            const a = document.createElement("a");
            a.href = html_url;
            a.innerText = html_url;
            tdUrl.appendChild(a);
                                    
            const tdUpdatedAt = document.createElement("td");
            tdUpdatedAt.innerText = new Date(updated_at).toLocaleDateString("fr-ca");

            tr.append(tdName, tdDescription, tdUrl, tdUpdatedAt);
            
            return tr;
        });
}

function createTable(data) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
   
    table.append(thead, tbody);
    
    const headers = ["Name", "Description", "Link", "Updated At"]
        .map(header => {
            const th = document.createElement("th");
            th.innerText = header;
            return th;
        });

    thead.append(...headers);
    const trows = convertReposToTableRows(data);
    

    tbody.append(...trows);
    return table;
}

function createSearchComponent() {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const button = document.createElement("button");

    div.id = "search-container";
    div.append(input, button);

    input.placeholder = "Type search parameter here";
    button.innerText = "Search";

    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            search(event.target.value);
        }
    });

    button.addEventListener("click", event => {
        search(input.value);
    });
    
    return div;
}

function createSortComponent() {
    const div = document.createElement("div");
    const select = document.createElement("select");
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

    div.id = "sort-container";
    div.append(select, button);

    select.addEventListener("change", event => {
        let field = event.target.value;
        let direction = document.querySelector("#sort-container > button").value;
        sort({field, direction});
    });
    
    button.addEventListener("click", event => {
        let field = document.querySelector("#sort-container > select").value;
        let direction = event.target.value === "asc" ? "desc" : "asc";
        
        const {value, html} = directions.find(({value}) => 
            value === direction);
        
        button.value = value;
        button.innerHTML = html;

        sort({field, direction});
    });

    return div;
}

export { buildPage };