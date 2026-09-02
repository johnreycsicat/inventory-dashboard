import { getStockStatus } from "./inventoryUtils.js";

export function displayProducts(products) {
    const productList = document.getElementById("productList");
    const noResultsMessage = document.getElementById("noResultsMessage");

    productList.innerHTML = "";

    if (products.length === 0) {
        noResultsMessage.style.display = "block";
        return;
    }

    noResultsMessage.style.display = "none";

    products.forEach(product => {
        const {
            id,
            name,
            category,
            price,
            stock
        } = product;

        const status = getStockStatus(stock);

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <h2>${name}</h2>
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Price:</strong> ₱${price.toLocaleString()}</p>
            <p><strong>Stock:</strong> ${stock}</p>
            <p class="stock-status">
                <strong>Status:</strong> ${status}
            </p>
        `;

        productList.appendChild(productCard);
    });
}

export function displaySummary(
    totalValue,
    lowStock,
    outOfStock
) {
    const totalInventoryValue =
        document.getElementById("totalInventoryValue");

    const lowStockCount =
        document.getElementById("lowStockCount");

    const outOfStockCount =
        document.getElementById("outOfStockCount");

    totalInventoryValue.textContent =
        `₱${totalValue.toLocaleString()}`;

    lowStockCount.textContent = lowStock;

    outOfStockCount.textContent = outOfStock;
}