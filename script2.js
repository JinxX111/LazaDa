// Dữ liệu mẫu: Lịch sử giao dịch
const transactions = [
    {
        id: 'DH001',
        date: '2024-11-05',
        amount: 500000,
        products: [
            { name: 'Áo Thun Nam', price: 250000 },
            { name: 'Quần Jean', price: 250000 },
        ],
    },
    {
        id: 'DH002',
        date: '2024-11-08',
        amount: 200000,
        products: [
            { name: 'Mũ Lưỡi Trai', price: 200000 },
        ],
    },
    {
        id: 'DH003',
        date: '2024-11-12',
        amount: 350000,
        products: [
            { name: 'Áo Khoác Hoodie', price: 350000 },
        ],
    },
    {
        id: 'DH004',
        date: '2024-10-29',
        amount: 400000,
        products: [
            { name: 'Giày Sneaker', price: 400000 },
        ], // Ngoài tháng hiện tại
    },
];

// Hàm lọc giao dịch theo tháng hiện tại
function getTransactionsInCurrentMonth() {
    const now = new Date();
    const currentMonth = now.getMonth(); // Tháng hiện tại (0-11)
    const currentYear = now.getFullYear();

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear
        );
    });
}

// Hiển thị giao dịch
function renderTransactions() {
    const transactionList = document.getElementById('transaction-list');
    const totalOrdersElement = document.getElementById('total-orders');
    const totalAmountElement = document.getElementById('total-amount');

    // Lấy danh sách giao dịch trong tháng
    const currentMonthTransactions = getTransactionsInCurrentMonth();

    // Reset nội dung
    transactionList.innerHTML = '';

    // Biến tổng
    let totalOrders = 0;
    let totalAmount = 0;

    // Duyệt qua các giao dịch và hiển thị
    currentMonthTransactions.forEach(transaction => {
        const row = document.createElement('tr');

        // Tạo danh sách sản phẩm
        const productList = document.createElement('ul');
        productList.classList.add('product-list');
        transaction.products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.classList.add('product-item');
            productItem.textContent = `${product.name} - ${product.price.toLocaleString()} VND`;
            productList.appendChild(productItem);
        });

        // Điền thông tin vào dòng
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.date}</td>
            <td></td>
            <td>${transaction.amount.toLocaleString()}</td>
        `;
        row.children[2].appendChild(productList); // Thêm danh sách sản phẩm vào cột thứ 3

        transactionList.appendChild(row);

        // Cập nhật thống kê
        totalOrders++;
        totalAmount += transaction.amount;
    });

    // Hiển thị thống kê
    totalOrdersElement.textContent = totalOrders;
    totalAmountElement.textContent = totalAmount.toLocaleString();
}

// Gọi hàm render khi trang được tải
document.addEventListener('DOMContentLoaded', renderTransactions);
