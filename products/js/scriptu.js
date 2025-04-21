// Function to escape HTML characters
function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[m]));
}

// Function to render the list of products in the table
function renderProducts(products) {
    const tableBody = document.getElementById('products-table');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHTML(product.id)}</td>
            <td>${escapeHTML(product.title)}</td>
            <td>${escapeHTML(product.kol)}</td>
            <td>${escapeHTML(product.price)}</td>
            <td>${escapeHTML(product.ed)}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to load the list of products from the server
function loadProducts(query = '') {
    const url = query 
        ? `vendor/read.php?query=${encodeURIComponent(query)}`
        : 'vendor/read.php';

    console.log(`Loading products from URL: ${url}`);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            console.log("Received data from server:", products);
            if (!Array.isArray(products)) {
                throw new Error('Invalid data format: Expected an array');
            }
            renderProducts(products);
        })
        .catch(error => {
            console.error('Error loading products:', error);
            alert(`Error loading products: ${error.message}`);
        });
}

// Function to search products by name
function searchProducts() {
    const query = document.getElementById('search-input').value.trim();
    loadProducts(query);
}

// Initialize the product list when the page loads
window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});