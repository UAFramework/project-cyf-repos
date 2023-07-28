import repos from "/data/repos.js";
import { searchbarMap, tableMap, paginationMap } from "/data/html-map.js";
import { htmlByMap, prepareReposForView, updateTable, filter } from "/data/function.js";

export default function buildPage() {
  const root = document.querySelector("div#root");

  // build page start ---------------------------------
  htmlByMap(root, searchbarMap);

  var pagesNumber =
    document.getElementById("per-page").value !== ""
      ? repos.length / document.getElementById("per-page").value
      : 1;

  paginationMap.children = paginationMap.generatePages(50);
  htmlByMap(root, [paginationMap]);

  tableMap[0]["children"] = prepareReposForView(repos);
  htmlByMap(root, tableMap);
  // build page end ---------------------------------

  // events start ----------------------------------------
  document.getElementById("search-button").addEventListener("click", search);
  document.getElementById("sort-by").addEventListener("change", sort);
  document.getElementById("per-page").addEventListener("change", perPage);
  document
    .getElementById("pagination")
    .addEventListener("click", setPagination);
  // events end   ----------------------------------------
}

function perPage(event) {
  var result = filter();

  updateTable(result);
}

function sort(event) {
  let result = filter();

  updateTable(result);
}

function search(event) {
  var result = filter();

  updateTable(result);
}

function setPagination(event) {
  if (event.target && event.target.nodeName !== "A") {
    return;
  }
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);

  let pageNumber = event.target.innerText;
  var result = filter(pageNumber);

  updateTable(result);
}

export { buildPage, sort, search, setPagination };
