//Vista carrito

window.addEventListener('DOMContentLoaded', () => {
    const cartId = "{{ cartId }}";
    fetch(`/api/carts/view/${cartId}`)
        .then(response => response.json())
        .then(data => {
            const cartDetailsContainer = document.getElementById('tbody');
            data.products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                            <td>${product.title}</td>
                            <td>Precio: ${product.price}</td>
                            <td>Cantidad: ${product.quantity}</td>
                            <td>Total: ${product.amount}</td>
                            <td>
                            <button class="buy-cart" data-product-id="${product._id}" data-cart-id="${product.cartId}">Comprar</button>
                            </td>
                        `;
                cartDetailsContainer.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar detalles del carrito:', error));
});