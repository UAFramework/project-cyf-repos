const tableMap = [
  {
    tagName: "table",
    attributes: { id: "result" },
    children: [],
  },
];

const paginationMap = {
  tagName: "div",
  attributes: { id: "pagination" },
  children: [],
  generatePages: function (pagesNumber) {
    var result = [];
    for (let i = 1; i <= pagesNumber; i++) {
      result.push({
        tagName: "a",
        attributes: { href: "#" },
        innerText: i
      });
    }
    return result;
  },
};

const searchbarMap = [
  {
    tagName: "div",
    attributes: { id: "filters-panel" },
    children: [
      {
        tagName: "div",
        attributes: { id: "search" },
        children: [
          {
            tagName: "input",
            attributes: {
              type: "text",
              placeholder: "Search",
              id: "search-field",
            },
          },
          {
            tagName: "input",
            attributes: { type: "submit", id: "search-button" },
          },
        ],
      },

      {
        tagName: "div",
        attributes: { id: "filters" },
        children: [
          {
            tagName: "select",
            attributes: { type: "select", id: "sort-by" },
            children: [
              {
                tagName: "option",
                attributes: {
                  value: "",
                  disabled: "disabled",
                  selected: "selected",
                },
                innerText: "sort by",
              },
              {
                tagName: "option",
                attributes: { value: "name" },
                innerText: "name",
              },
              {
                tagName: "option",
                attributes: { value: "updated_at" },
                innerText: "updated at",
              },
            ],
          },
          {
            tagName: "select",
            attributes: { type: "select", id: "per-page" },
            children: [
              {
                tagName: "option",
                attributes: {
                  value: "",
                  disabled: "disabled",
                  selected: "selected",
                },
                innerText: "per page",
              },
              {
                tagName: "option",
                attributes: { value: "10" },
                innerText: "10",
              },
              {
                tagName: "option",
                attributes: { value: "20" },
                innerText: "20",
              },
              {
                tagName: "option",
                attributes: { value: "50" },
                innerText: "50",
              },
              {
                tagName: "option",
                attributes: { value: "100" },
                innerText: "100",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    tagName: "div",
    attributes: { id: "table" },
    children: [],
  },
];

export {searchbarMap, tableMap, paginationMap};
