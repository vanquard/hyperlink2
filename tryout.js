let cart = [];

function addToCart(id, name, price) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCart();
}

function changeQuantity(id, change) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        }
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
    })
}