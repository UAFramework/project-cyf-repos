import { repos } from "./data/repos.js";
import { createSearchBar } from "./components/searchbar.js";
import { createTable } from "./components/table.js";
import { createPageNav } from "./components/pagenav.js";
import { createPaginationSelector, createSortingSelector } from "./components/selectors.js";
import { renderPage } from "./components/renders.js";

function buildPage() {
    const root = document.querySelector("div#root");
    
    const searchBar = createSearchBar();
    const table = createTable();
    const sortingAndPagination = buildSortingAndPaginationComponent();
    const pageNav = createPageNav();
    root.append(searchBar, sortingAndPagination, table, pageNav);
    
    renderPage(repos);
}

function buildSortingAndPaginationComponent() {
    const div = document.createElement("div");
    div.id = "sorting-and-pagination-container";

    const sortingComponent = createSortingSelector();
    const paginationComponents = createPaginationSelector();
    
    div.append(sortingComponent, paginationComponents);
    return div;

}

export { buildPage };