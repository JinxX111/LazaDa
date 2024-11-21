const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.getElementById('total-price');
const addItemButton = document.getElementById('add-item-button');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const payNowButton = document.getElementById('pay-now-button');
const confirmPaymentButton = document.getElementById('confirm-payment-button');
const paymentMethods = document.getElementsByName('payment-method');

// Giỏ hàng mẫu
const cart = [];

// Hiển thị giỏ hàng
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price.toLocaleString()} VND</span>
        `;

        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice.toLocaleString();
}

// Thêm sản phẩm vào giỏ
addItemButton.addEventListener('click', () => {
    const name = productNameInput.value.trim();
    const price = parseInt(productPriceInput.value, 10);

    if (!name || price <= 0) {
        alert('Vui lòng nhập tên sản phẩm và giá hợp lệ!');
        return;
    }

    cart.push({ name, price });
    renderCart();

    productNameInput.value = '';
    productPriceInput.value = '';
});

// Xử lý thanh toán
paymentMethods.forEach(method => {
    method.addEventListener('change', () => {
        payNowButton.style.display = method.value === 'online' ? 'block' : 'none';
    });
});

payNowButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart }),
        });

        const session = await response.json();
        const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Thay bằng khóa công khai Stripe
        await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        alert('Có lỗi xảy ra trong quá trình thanh toán!');
    }
});

confirmPaymentButton.addEventListener('click', () => {
    alert('Đặt hàng thành công!');
});


// Hiển thị nút thanh toán phù hợp với phương thức
paymentMethods.forEach(method => {
    method.addEventListener('change', () => {
        if (method.value === 'online') {
            payOnlineButton.style.display = 'block';
            confirmOrderButton.style.display = 'none';
        } else {
            payOnlineButton.style.display = 'none';
            confirmOrderButton.style.display = 'block';
        }
    });
});

// Xác nhận đặt hàng COD
confirmOrderButton.addEventListener('click', () => {
    const name = document.getElementById('customer-name').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();

    if (!name || !address || !phone) {
        alert('Vui lòng nhập đầy đủ thông tin giao hàng!');
        return;
    }

    alert('Đặt hàng thành công! Chúng tôi sẽ giao hàng đến địa chỉ của bạn.');
});

// Thanh toán trực tuyến
payOnlineButton.addEventListener('click', async () => {
    const name = document.getElementById('customer-name').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();

    if (!name || !address || !phone) {
        alert('Vui lòng nhập đầy đủ thông tin giao hàng!');
        return;
    }

    try {
        // Gửi thông tin đặt hàng đến backend để tạo phiên thanh toán Stripe
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer: { name, address, phone },
                items: [
                    { name: 'Sản phẩm A', price: 100000 },
                    { name: 'Sản phẩm B', price: 200000 }
                ]
            })
        });

        const session = await response.json();
        const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Thay bằng khóa công khai Stripe
        await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        alert('Thanh toán trực tuyến thất bại!');
    }
});


