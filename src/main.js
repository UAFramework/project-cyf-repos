import { repos } from "./data/repos.js";

// global `options` objects that stores options
// chosen by the user of the web-page.
const options = {
    filterby: null,
    sortBy: {
        field: null,
        direction: "asc" // "asc" | "desc"
    },
    recordsOnPage: 10
};

function buildPage() {
    const root = document.querySelector("div#root");
    const table = createTable(repos);
    root.appendChild(table);
}

function search(searchTerm) {
    // implement search functionality
    // and use this function in event handlers
    // for input and button elements in Search Component.
}

function sort(field, direction) {
    // implement sort functionality
    // and use this function in event handlers
    // for input and button elements in Sorting Component.
}

function setPagination(recordsOnPage) {
    // implement pagination functionality
    // and use this function in event handler 
    // for Pagination Component
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

    const trows = data
        .map( ({name, updated_at, description, html_url}) => {
            const tr = document.createElement("tr");
            
            const tdName = document.createElement("td")
            tdName.innerText = name;

            const tdDescription = document.createElement("td") 
            tdDescription.innerText = description;

            const tdUrl = document.createElement("td") 
            tdUrl.innerText = html_url;
                                    
            const tdUpdatedAt = document.createElement("td")
            tdUpdatedAt.innerText = updated_at;

            tr.append(tdName, tdDescription, tdUrl, tdUpdatedAt);
            
            return tr;

        });

    tbody.append(...trows);
    return table;
}


export {buildPage};