import { search } from "./handlers.js";

function createSearchBar() {
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

export { createSearchBar };