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
    root.innerText = "Hello!";
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

export {buildPage};