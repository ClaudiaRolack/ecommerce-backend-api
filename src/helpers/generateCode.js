function generateOrderCode() {
    const timestamp = Date.now();
    const randomComponent = Math.floor(Math.random() * 10000 + 1);
    return `${timestamp}-${randomComponent}`;
}

module.exports = { generateOrderCode }