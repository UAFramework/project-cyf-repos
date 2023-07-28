import repos from "/data/repos.js";
import {searchbarMap, tableMap, paginationMap} from "/data/html-map.js";


function htmlByMap(parent, map) {
  map.forEach(function (data) {
    let element = document.createElement(data.tagName);

    if (data.attributes && Object.values(data.attributes).length > 0) {
      for (let attr in data.attributes) {
        element.setAttribute(attr, data.attributes[attr]);
      }
    }

    if (data.innerText) {
      element.innerText = data.innerText;
    }

    if (data.children && data.children.length > 0) {
      htmlByMap(element, data.children);
    }
    parent.appendChild(element);
  });
}

function prepareReposForView(data) {
  var result = [];
  data.forEach(function (data) {
    var children = [];
    for (let key in data) {
      children.push({
        tagName: "td",
        innerText: data[key],
      });
    }

    result.push({
      tagName: "tr",
      children: children,
    });
  });
  return result;
}

function updateTable(data) {
  document.getElementById("result").remove();

  tableMap[0]["children"] = prepareReposForView(data);
  const root = document.querySelector("div#root");

  htmlByMap(root, tableMap);
}

function filter(pageNumber = null) {
  var result = repos;

  var searchString = document.getElementById("search-field").value;
  if (searchString !== "") {
    let tempData = result.filter(function (data) {
      return (
        data.name.indexOf(searchString) !== -1 ||
        (data.description && data.description.indexOf(searchString) !== -1)
      );
    });
    result = tempData;
  }

  var sortString = document.getElementById("sort-by").value;
  if (sortString !== "") {
    if (sortString === "name") {
      result.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }

    if (sortString === "updated_at") {
      result.sort(
        (date1, date2) =>
          new Date(date1.updated_at) - new Date(date2.updated_at)
      );
    }
  }

  var perPageNumber = document.getElementById("per-page").value;
  var offset = pageNumber ? pageNumber*perPageNumber: 0;
  if (perPageNumber !== '') {
    let tempData = result.slice(offset, + perPageNumber + offset);
    result = tempData;
  }

  return result;
}

export {htmlByMap, prepareReposForView, updateTable, filter};
