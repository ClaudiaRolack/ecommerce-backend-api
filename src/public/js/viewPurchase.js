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
});   