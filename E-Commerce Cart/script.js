// Sample product data
const products = [
    { id: 1, name: "macbook air", price: 1062.88, image: "https://external-preview.redd.it/apple-introduces-the-new-macbook-air-with-the-soaring-v0-EuaUZZL5z1OKkD6OpK6p45bmH8w9Oygshypf1gwH_18.jpg?width=640&crop=smart&auto=webp&s=74aa18435d1835f164f0f1c7a1b6f4af717176af" },
    { id: 2, name: "iphone 16 pro max", price: 1589.01, image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-240909-lp.jpg.news_app_ed.jpg" },
    { id: 3, name: "airpords pro", price: 291.14, image: "https://i.gadgets360cdn.com/large/airpods_pro_2nd_generation_1702969555707.jpg" },
    { id: 4, name: "Keyboard", price: 169.57, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQp8XFU7JqGcZd5E0dcrxZNSfGITjryFTwzE6_4J094_97bEtIEqd2pistlWmYQNhUNdeoYdRHrFAKoXaFcxIq4htHMTi3XzDZoVmQ4qYihFlqgi2azJ0h5sA" },
];
 
let cart = [];

// Display products
function displayProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart UI
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartCountElement = document.getElementById("cart-count");

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} (x${item.quantity})</span>
            <span>$${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join("");

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = totalPrice;
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Initialize the app
displayProducts();