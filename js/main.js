import { products } from "./products.js";

import {
    searchProducts,
    filterProductsByCategory,
    calculateTotalInventoryValue,
    countLowStockProducts,
    countOutOfStockProducts
} from "./inventoryUtils.js";

import {
    displayProducts,
    displaySummary
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay(productList) {
    displayProducts(productList);

    const totalValue =
        calculateTotalInventoryValue(productList);

    const lowStock =
        countLowStockProducts(productList);

    const outOfStock =
        countOutOfStockProducts(productList);

    displaySummary(
        totalValue,
        lowStock,
        outOfStock
    );
}

function performSearch() {
    const query = searchInput.value;
    const category = categoryFilter.value;

    let filteredProducts =
        searchProducts(products, query);

    filteredProducts =
        filterProductsByCategory(
            filteredProducts,
            category
        );

    updateDisplay(filteredProducts);
}

searchBtn.addEventListener("click", performSearch);

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "All";

    updateDisplay(products);
});

categoryFilter.addEventListener("change", performSearch);

searchInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        performSearch();
    }
});

updateDisplay(products);