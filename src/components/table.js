function createTable() {
    const div = document.createElement("div");
    div.id = "table-container";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
   
    table.append(thead, tbody);
    div.appendChild(table);
    
    return div;
}

export { createTable };