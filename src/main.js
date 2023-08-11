import { repos } from "./data/repos.js";

// global `options` objects that stores options
// chosen by the user of the web-page.
const config = {
    filterby: "",
    sortBy: {
        field: "name",
        direction: "asc" // "asc" | "desc"
    },
    pagination: {
        recordsOnPage: 10,
        currentPage: 1
    }
};

function buildPage() {
    const root = document.querySelector("div#root");
    
    const searchBar = createSearchComponent();
    const table = createTableComponent();
    const sortingAndPagination = buildSortingAndPaginationComponent();
    const pageNav = createPageNavComponent();
    root.append(searchBar, sortingAndPagination, table, pageNav);
    
    renderPage(repos);
}

function search(searchTerm) {
    config.filterby = searchTerm;
    renderPage(repos);
}

function sort({field, direction}) {
    config.sortBy.field = field;
    config.sortBy.direction = direction; 
    renderPage(repos);

}

function setPagination(recordsOnPage) {
    config.pagination.recordsOnPage = Number(recordsOnPage);
    renderPage(repos);
}

function switchPage(newPageNumer) {
    config.pagination.currentPage = newPageNumer;
    renderPage(repos);
}

function renderPage(repos) {
    // prepare data for displaying on table (apply config):
    const filteredRepos = config.filterby === "" ? [...repos] : repos
        .filter(({name, description}) => 
                // condition1 || (condition2.1 && condition2.2)
                name.toLowerCase().includes(config.filterby.toLowerCase() || 
                    (description != null && 
                        description.toLowerCase().includes(config.filterby.toLowerCase()))
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

    let numberOfPages = Math.ceil(filteredRepos.length / config.pagination.recordsOnPage);
    let startIndex = (config.pagination.currentPage - 1) * config.pagination.recordsOnPage;
    let endIndex = startIndex + config.pagination.recordsOnPage;

    const reposToDisplay = filteredRepos.slice(startIndex, endIndex);
    
    renderTable(reposToDisplay);
    renderPageNav(numberOfPages);
}

function renderTable(data) {
    // render Table Head: 
    const thead = document.querySelector("table > thead");
    const headers = ["Name", "Description", "Link", "Updated At"]
        .map(header => {
            const th = document.createElement("th");
            th.innerText = header;
            return th;
        });

    thead.replaceChildren(...headers);

    // render Table Rows:
    const tbody = document.querySelector("table > tbody");
    const trows = data
        .map( ({name, updated_at, description, html_url}) => {
            const tr = document.createElement("tr");
            
            const tdName = document.createElement("td");
            tdName.innerText = name;

            const tdDescription = document.createElement("td");
            tdDescription.innerText = description;

            const tdUrl = document.createElement("td");
            const a = document.createElement("a");
            a.href = html_url;
            a.innerText = html_url.replace("https://github.com/", "");
            tdUrl.appendChild(a);
                                    
            const tdUpdatedAt = document.createElement("td");
            tdUpdatedAt.innerText = new Date(updated_at).toLocaleDateString("fr-ca");

            tr.append(tdName, tdDescription, tdUrl, tdUpdatedAt);
            
            return tr;
        });

    tbody.replaceChildren(...trows);
}


function renderPageNav(numberOfPages) {
    const pageLinks = [];
    for (let i = 1; i <= numberOfPages; i++) {
            const a = document.createElement("a");
            
            a.href = "#";
            a.id = `page-${i}`;
            a.className = i == config.pagination.currentPage ? "current" : "";
            a.innerText = i;
            
            a.onclick = () => switchPage(i);
            pageLinks.push(a);
    }
    
    const pageNav = document.querySelector("#page-nav");
    pageNav.replaceChildren(...pageLinks);
}

function createTableComponent() {
    const div = document.createElement("div");
    div.id = "table-container";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
   
    table.append(thead, tbody);
    div.appendChild(table);
    
    return div;
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

function buildSortingAndPaginationComponent() {
    const div = document.createElement("div");
    div.id = "sorting-and-pagination-container";

    const sortingComponent = createSortingSelector();
    const paginationComponents = createPaginationSelector();
    
    div.append(sortingComponent, paginationComponents);
    return div;

}

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
            value === direction);
        
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

function createPageNavComponent() {
    const div = document.createElement("div");
    div.id = "page-nav";
    return div;
}

export { buildPage };