//Vista de productos
let displayIds = [];

document.addEventListener('DOMContentLoaded', () => {

    fetch('/api/sessions/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pueden los datos');
            }
            return response.json();
        })
        .then(data => {
        
            const cartId = data.cartId;  
            const cartLink = document.getElementById('cartLink');
            cartLink.href = `/api/carts/view/${cartId}`;       
            
            document.getElementById('firstName').textContent = data.firstName;
            document.getElementById('rol').textContent = data.rol;
            document.getElementById('email').textContent = data.email;
       
        })
        .catch(error => console.log(error));
        

});

document.addEventListener('DOMContentLoaded', () => {

    fetch('/api/sessions/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se puede obtener la sesión actual');
            }
            return response.json();
        })
        .then(data => {
            const cartId = data.cartId;

            fetch('/api/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('No se pueden mostrar productos');
                    }
                })
                .then(data => {
                    const productsTableBody = document.querySelector('tbody');

                    data.payload.forEach(product => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.stock}</td>
                    <td>${product.price}</td>
                    <td>
                        <button class="quantity-button" onclick="decreaseQuantity('${product._id}')" id="decrease-button">-</button>
                        <span class="quantity-display" id="${product._id}">0</span>
                        <button class="quantity-button" onclick="increaseQuantity('${product._id}', ${product.stock})" id="increase-button">+</button>
                    </td>
                    <td>
                        <button id="add-cart" class="add-cart" data-product-id="${product._id}" data-cart-id="${cartId}">Agregar al carrito</button>
                    </td>
                `;
                        productsTableBody.appendChild(row);
                    });

                    //Botón agregar al carrito
                    const addCartButtons = document.querySelectorAll('.add-cart');

                    addCartButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            const productId = button.getAttribute('data-product-id');
                            const cartId = button.getAttribute('data-cart-id');
                            const quantityDisplay = document.getElementById(productId);
                            const quantity = parseInt(quantityDisplay.textContent);
                            addCart(cartId, productId, quantity);
                        })
                    })

                    function addCart(cartId, productId, displayIds) {
                        const data = { cartId: cartId, productId: productId, quantity: displayIds };

                        fetch(`/api/carts/${cartId}/products/${productId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Producto agregado al carrito');
                                    return response.json();
                                } else {
                                    console.error('Error al agregar el producto al carrito');
                                    throw new Error('Error al agregar el producto al carrito');
                                }
                            })
                            .then(data => {
                                console.log(data);
                            })
                            .catch(error => {
                                console.error('Error en la solicitud', error);
                            });
                    }

                })
                .catch(error => {
                    console.error('Error en la solicitud de productos', error);
                });
        })
        .catch(error => {
            console.error('Error en la solicitud de sesión', error);
        });
});

//Botón cantidad
function decreaseQuantity(id) {
    const quantityDisplay = document.getElementById(`${id}`);
    let currentQuantity = parseInt(quantityDisplay.textContent);
    if (currentQuantity > 1) {
        currentQuantity--;
        quantityDisplay.textContent = currentQuantity;
    }
}

function increaseQuantity(id, stock) {
    const quantityDisplay = document.getElementById(`${id}`);
    let currentQuantity = parseInt(quantityDisplay.textContent);
    if (currentQuantity < stock)
        currentQuantity++;
    quantityDisplay.textContent = currentQuantity;
}