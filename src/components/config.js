// global `options` objects that stores options
// chosen by the user of the web-page.
const config = {
    filterby: "",
    sortBy: {
        field: "name",
        direction: "asc" // "asc" | "desc"
    },
    pagination: {
        recordsOnPage: 10,
        currentPage: 1
    }
};

export { config }; 