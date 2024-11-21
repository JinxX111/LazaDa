const confirmOrderButton = document.getElementById('confirm-order-button');
const payOnlineButton = document.getElementById('pay-online-button');
const paymentMethods = document.getElementsByName('payment-method');

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
