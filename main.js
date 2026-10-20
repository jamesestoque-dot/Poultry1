// FarmFresh Chickens - Main JavaScript
// Product Data (can be moved to database later)
const products = [
    {
        id: 1,
        name: "Whole Fresh Chicken",
        description: "Fresh whole chicken, dressed and ready to cook",
        price: 280.00,
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400"
    },
    {
        id: 2,
        name: "Chicken Breast",
        description: "Boneless, skinless chicken breast fillets",
        price: 350.00,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400"
    },
    {
        id: 3,
        name: "Chicken Wings",
        description: "Fresh chicken wings, perfect for grilling",
        price: 250.00,
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
    },
    {
        id: 4,
        name: "Chicken Thighs",
        description: "Juicy bone-in chicken thighs",
        price: 290.00,
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400"
    },
    {
        id: 5,
        name: "Chicken Legs/Drumsticks",
        description: "Fresh chicken drumsticks",
        price: 230.00,
        image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400"
    },
    {
        id: 6,
        name: "Chicken Liver",
        description: "Fresh chicken liver, nutritious and delicious",
        price: 180.00,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400"
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('farmfreshCart')) || [];

// Update cart count in navigation
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('farmfreshCart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart!');
}

// Format price as Philippine Pesos
function formatPrice(price) {
    return '₱' + price.toFixed(2);
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    // Show first 3 products as featured
    const featured = products.slice(0, 3);
    
    featuredContainer.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadFeaturedProducts();
    initMobileMenu();
});