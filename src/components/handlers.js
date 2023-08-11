import { config } from "./config.js";
import { renderPage } from "./renders.js";
import { repos } from "../data/repos.js";

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

export { search, sort, setPagination, switchPage };