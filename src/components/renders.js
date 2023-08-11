import { config } from "./config.js";
import { switchPage } from "./handlers.js";

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

export { renderPage };