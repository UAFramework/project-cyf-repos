import repos from "/data/repos.js";

export default function buildPage() {
    const root = document.querySelector("div#root");
    root.innerText = "Hello!";
}

function sort(event) {
    // implement sort functionality
}

function search(event) {
    // implement search functionality
}

function setPagination() {
    // implement pagination functionality
}

export {buildPage, sort, search, setPagination};