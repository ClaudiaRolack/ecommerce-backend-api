//Vista carrito

// document.addEventListener('DOMContentLoaded', function () {

//     const url = window.location.href;
//     const parts = url.split('/');
//     const cartId = parts[parts.length - 1]

//     fetch(`/api/carts/info/${cartId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(response => {
//             if(!response.ok) {
//                 throw new Error('No se pueden traer los datos');
//             } 
//             return response.json();
//         })
//         .then(data => {
//             document.getElementById('cart-item-title').textContent = data.title;
//             document.getElementById('cart-item-price').textContent = data.price;
//         })
//         .catch(error => console.log(error));
// });

// document.addEventListener('DOMContentLoaded', function () {

//     const url = window.location.href;
//     const parts = url.split('/');
//     const cartId = parts[parts.length - 1]

//     fetch(`/api/carts/${cartId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('No se puede ver el carrito');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const cartItemsContainer = document.querySelector('.cart-items');

//             data.products.forEach(product => {
//                 const cartItem = document.createElement('div');
//                 cartItem.classList.add('cart-item');

//                 const cartItemInfo = document.createElement('div');
//                 cartItemInfo.classList.add('cart-item-info');

//                 const title = document.createElement('h3');
//                 title.classList.add('cart-item-title');
//                 title.textContent = product.title;

//                 const price = document.createElement('p');
//                 price.classList.add('cart-item-price');
//                 price.textContent = product.price;

//                 const quantity = document.createElement('p');
//                 quantity.textContent = `Cantidad: ${product.quantity}`;

//                 const removeButton = document.createElement('button');
//                 removeButton.classList.add('remove-item');
//                 removeButton.textContent = 'Eliminar';

//                 cartItemInfo.appendChild(title);
//                 cartItemInfo.appendChild(price);
//                 cartItemInfo.appendChild(quantity);

//                 cartItem.appendChild(cartItemInfo);
//                 cartItem.appendChild(removeButton);

//                 cartItemsContainer.appendChild(cartItem);
//             });
//         })
//         .catch(error => {
//             console.error('Error al obtener el carrito:', error);
//         });

//     const removeButtons = document.querySelectorAll('.remove-item');
//     removeButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const item = this.closest('.cart-item');
//             item.remove();
//             // Aquí podrías realizar otras acciones, como actualizar el total del carrito
//         });
//     });

//     // Manejar el clic en el botón de pago
//     const checkoutButton = document.querySelector('.checkout-button');
//     checkoutButton.addEventListener('click', function () {
//         alert('Gracias por su compra');
//         // Aquí podrías redirigir al usuario a la página de pago o realizar otras acciones relacionadas con el pago
//     });
// });





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
        cartData.forEach(cart => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const cartItemInfo = document.createElement('div');
            cartItemInfo.classList.add('cart-item-info');

            const quantity = document.createElement('p');
            quantity.textContent = `Cantidad: ${cart.quantity}`;

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-item');
            removeButton.textContent = 'Eliminar';

            cartItemInfo.appendChild(title);
            cartItemInfo.appendChild(price);
            cartItemInfo.appendChild(quantity);

            cartItem.appendChild(cartItemInfo);
            cartItem.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItem);
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

            document.getElementById('cart-item-title').textContent = productData.title;
            document.getElementById('cart-item-price').textContent = productData.price;
           
        })
        .catch(error => {
            console.error('Error al obtener los detalles de los productos:', error);
        });
    })
    .catch(error => {
        console.error('Error al obtener la información del carrito:', error);
    });
});

