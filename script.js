// Fruit data
const fruits = [
    {
        id: 1,
        name: "Apple",
        price: 1.99,
        category: "everyday",
        image: "img/apple.jpg",
        description: "Fresh and crisp apples from local orchards."
    },
    {
        id: 2,
        name: "Banana",
        price: 0.99,
        category: "everyday",
        image: "img/banana.jpg",
        description: "Perfectly ripe and sweet bananas."
    },
    {
        id: 3,
        name: "Orange",
        price: 1.49,
        category: "citrus",
        image: "img/orange.jpg",
        description: "Juicy oranges packed with vitamin C."
    },
    {
        id: 4,
        name: "Strawberry",
        price: 3.99,
        category: "berries",
        image: "img/strawberry.webp",
        description: "Sweet and succulent strawberries."
    },
    {
        id: 5,
        name: "Mango",
        price: 2.99,
        category: "tropical",
        image: "img/mango.jpg",
        description: "Exotic mangoes with a rich, sweet flavor."
    },
    {
        id: 6,
        name: "Blueberry",
        price: 4.99,
        category: "berries",
        image: "img/blueberry.jpeg",
        description: "Antioxidant-rich blueberries."
    },
    {
        id: 7,
        name: "Pineapple",
        price: 3.49,
        category: "tropical",
        image: "img/pineapple.jpg",
        description: "Sweet and tangy pineapples."
    },
    {
        id: 8,
        name: "Lemon",
        price: 0.79,
        category: "citrus",
        image: "img/lemon.jpg",
        description: "Zesty lemons perfect for cooking and drinks."
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize the fruit grid
    displayFruits('all');
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and display fruits
            const category = this.getAttribute('data-category');
            displayFruits(category);
        });
    });
    
    // Cart functionality
    const cartIcon = document.getElementById('cart-icon');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const continueShopping = document.getElementById('continue-shopping');
    const continueShoppingLink = document.getElementById('continue-shopping-link');
    
    cartIcon.addEventListener('click', function() {
        cartOverlay.style.display = 'block';
        updateCartDisplay();
    });
    
    closeCart.addEventListener('click', function() {
        cartOverlay.style.display = 'none';
    });
    
    continueShopping.addEventListener('click', function() {
        cartOverlay.style.display = 'none';
    });
    
    continueShoppingLink.addEventListener('click', function() {
        cartOverlay.style.display = 'none';
    });
    
    // Close cart when clicking outside
    cartOverlay.addEventListener('click', function(e) {
        if (e.target === cartOverlay) {
            cartOverlay.style.display = 'none';
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Cart data
let cart = [];

// Display fruits based on category
function displayFruits(category) {
    const fruitsGrid = document.getElementById('fruits-grid');
    fruitsGrid.innerHTML = '';
    
    const filteredFruits = category === 'all' ? fruits : fruits.filter(fruit => fruit.category === category);
    
    filteredFruits.forEach(fruit => {
        const fruitCard = document.createElement('div');
        fruitCard.className = 'fruit-card';
        
        fruitCard.innerHTML = `
            <div class="fruit-image">
                <img src="${fruit.image}" alt="${fruit.name}" onerror="this.src='https://via.placeholder.com/200x200?text=${fruit.name}'">
                <div class="fruit-price">$${fruit.price.toFixed(2)}</div>
            </div>
            <div class="fruit-info">
                <div class="fruit-header">
                    <h3 class="fruit-name">${fruit.name}</h3>
                    <span class="fruit-category">${fruit.category}</span>
                </div>
                <p class="fruit-description">${fruit.description}</p>
                <button class="btn add-to-cart" data-id="${fruit.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        fruitsGrid.appendChild(fruitCard);
        
        // Add event listener to the Add to Cart button
        const addToCartBtn = fruitCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', function() {
            const fruitId = parseInt(this.getAttribute('data-id'));
            addToCart(fruitId);
        });
    });
}

// Add to cart function
function addToCart(fruitId) {
    const fruit = fruits.find(f => f.id === fruitId);
    
    if (fruit) {
        const existingItem = cart.find(item => item.id === fruitId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: fruit.id,
                name: fruit.name,
                price: fruit.price,
                image: fruit.image,
                quantity: 1
            });
        }
        
        updateCartCount();
        updateCartDisplay();
        
        // Show cart
        document.getElementById('cart-overlay').style.display = 'block';
    }
}

// Remove from cart function
function removeFromCart(fruitId) {
    cart = cart.filter(item => item.id !== fruitId);
    updateCartCount();
    updateCartDisplay();
}

// Update cart item quantity
function updateQuantity(fruitId, quantity) {
    const cartItem = cart.find(item => item.id === fruitId);
    
    if (cartItem) {
        if (quantity <= 0) {
            removeFromCart(fruitId);
        } else {
            cartItem.quantity = quantity;
            updateCartDisplay();
        }
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';
    
    // Add cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80?text=${item.name}'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-header">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
        
        // Add event listeners
        const removeBtn = cartItem.querySelector('.cart-item-remove');
        removeBtn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
        });
        
        const decreaseBtn = cartItem.querySelector('.decrease');
        decreaseBtn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const cartItem = cart.find(item => item.id === id);
            if (cartItem) {
                updateQuantity(id, cartItem.quantity - 1);
            }
        });
        
        const increaseBtn = cartItem.querySelector('.increase');
        increaseBtn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const cartItem = cart.find(item => item.id === id);
            if (cartItem) {
                updateQuantity(id, cartItem.quantity + 1);
            }
        });
    });
    
    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Create placeholder images for fruits that don't have images
function createPlaceholderImage(name) {
    return `https://via.placeholder.com/200x200?text=${name}`;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.getElementById('mobile-menu').style.display = 'none';
        }
    });
});