const products = [
    { id: 1, name: "Ethiopian Yirgacheffe", price: 75.00, inStock: true },
    { id: 2, name: "Colombia Pink Bourbon", price: 120.00, inStock: false },
    { id: 3, name: "Panama Geisha Reserve", price: 185.00, inStock: false },
    { id: 4, name: "Brazil Santos Micro-lot", price: 65.00, inStock: true },
    { id: 5, name: "Guatemala Huehuetenango", price: 85.00, inStock: true },
    { id: 6, name: "El Salvador Santa Ana", price: 95.00, inStock: true },
    { id: 7, name: "Costa Rica Tarrazu", price: 90.00, inStock: false },
    { id: 8, name: "Kenya AA Nyeri", price: 110.00, inStock: true }
];

const productGrid = document.getElementById('product-grid');
const showingCountEl = document.getElementById('showing-count');
const totalCountEl = document.getElementById('total-count');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

// Şəkildəki yarpaq/dairəvi simvolu əvəz edən SVG ikonu
const leafSvgIcon = `
    <svg class="product-logo-icon" viewBox="0 0 100 100" fill="none" stroke="#526149" stroke-width="2">
        <circle cx="50" cy="50" r="40" stroke="#526149" stroke-dasharray="3 3"/>
        <circle cx="50" cy="50" r="28"/>
        <path d="M50 22 V78 M50 50 C38 38 38 62 50 50 C62 38 62 62 50 50"/>
    </svg>
`;

function renderProducts(items) {
    productGrid.innerHTML = '';
    showingCountEl.textContent = items.length;
    totalCountEl.textContent = products.length;

    if (items.length === 0) {
        productGrid.innerHTML = `<div class="col-12 py-5 text-center text-muted">Axtarışa uyğun qəhvə tapılmadı.</div>`;
        return;
    }

    items.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col';

        const stockBadge = !product.inStock 
            ? `<span class="badge-out-stock">Out of Stock</span>` 
            : ``;

        col.innerHTML = `
            <div class="dune-card">
                <div class="card-image-box">
                    ${stockBadge}
                    ${leafSvgIcon}
                </div>
                <div class="product-info-box">
                    <div class="card-product-title">${product.name}</div>
                    <div class="card-product-price">${product.price.toFixed(2)} AED</div>
                </div>
            </div>
        `;

        productGrid.appendChild(col);
    });
}

function filterAndSort() {
    let result = [...products];

    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        result = result.filter(p => p.name.toLowerCase().includes(query));
    }

    const sortVal = sortSelect.value;
    if (sortVal === 'low-high') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'high-low') {
        result.sort((a, b) => b.price - a.price);
    }

    renderProducts(result);
}

searchInput.addEventListener('input', filterAndSort);
sortSelect.addEventListener('change', filterAndSort);

renderProducts(products);