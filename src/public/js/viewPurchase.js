document.addEventListener('DOMContentLoaded', function () {

    const url = window.location.href;
    const parts = url.split('/');
    const cartId = parts[parts.length - 1];

    fetch(`/api/carts/${cartId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se puede obtener la información de la compra');
            }

            return response.json();
        })
        .then(cartData => {
            console.log('cartData:', cartData)

            cartProducts = cartData.products;
            cartData.products.forEach(cart => {
                const cartItemContainer = document.querySelector('.cart-items');

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');

                const cartItemInfo = document.createElement('div');
                cartItemInfo.classList.add('cart-item-info');

                const titleElement = document.createElement('h3');
                titleElement.classList.add('cart-item-title');
                titleElement.textContent = cart.title;

                const priceElement = document.createElement('p');
                priceElement.classList.add('cart-item-price');
                priceElement.textContent = '$' + cart.price.toFixed(2);

                const quantityElement = document.createElement('p');
                quantityElement.textContent = 'Cantidad: ' + cart.quantity;

                cartItemInfo.appendChild(titleElement);
                cartItemInfo.appendChild(priceElement);
                cartItemInfo.appendChild(quantityElement);

                cartItem.appendChild(cartItemInfo);

                cartItemContainer.appendChild(cartItem);

            })

            fetch(`/api/carts/${cartId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se puede obtener la información del carrito');
                    }
                    return response.json();
                })
                .then(productData => {
                    console.log('productData:', productData)

                    productData.forEach(product => {
                        cartProducts.forEach(data => {
                            if (product._id === data.productId) {
                                product.quantity = data.quantity
                            }
                        })
                    });

                })
        })

        .catch(error => {
            console.error('Error al obtener los detalles de los productos:', error);
        });
});   