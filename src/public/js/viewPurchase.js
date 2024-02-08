//Vista order

let cartProducts;

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
                throw new Error('No se puede obtener la información del carrito');
            }

            return response.json();
        })
        .then(cartData => {
            const cartItemsContainer = document.querySelector('.cart-items');
            cartProducts = cartData.products;
            cartData.products.forEach(cart => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');

                const cartItemInfo = document.createElement('div');
                cartItemInfo.classList.add('cart-item-info');

                const quantity = document.createElement('p');
                quantity.textContent = `Cantidad: ${cart.quantity}`;
            });

            fetch(`/api/carts/info/${cartId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pueden obtener los detalles de los productos');
                    }
                    return response.json();
                })
                .then(productData => {

                    productData.forEach(product => {
                        cartProducts.forEach(data => {
                            if (product._id === data.productId) {
                                product.quantity = data.quantity
                            }
                        })
                    });

                    const productsTableBody = document.querySelector('tbody');
                    productData.forEach(product => {
                        console.log(product)
                        const row = document.createElement('tr');
                        row.innerHTML = `
                    <td>${product.title}</td>
                    <td>${product.price * product.quantity}</td>
                    <td>${product.quantity}</td>
                `      
                productsTableBody.appendChild(row);
                        
                        
                    })

                    const arrayOfAmountByProduct = productData.map(product => product.price * product.quantity)
                    const finalAmount = arrayOfAmountByProduct.reduce((accum, currenteValue) => accum + currenteValue, 0);

                    const finalAmountElement = document.getElementById('final-amount')
                    finalAmount.innerHTML = finalAmount.toString()

                    finalAmountElement.append(finalAmount)

   // Crear un nuevo elemento para mostrar la fecha
            const orderDateElement = document.createElement('p');
                
            // Obtener la fecha actual
            const orderDate = new Date();
            
            // Configurar el contenido del elemento con la fecha
            orderDateElement.textContent = 'Fecha orden: ' + orderDate.toString();
                finalAmountElement.parentNode.insertBefore(orderDateElement, finalAmountElement.nextSibling);
                  

                })
                .catch(error => {
                    console.error('Error al obtener los detalles de los productos:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener la información del carrito:', error);
        });
});