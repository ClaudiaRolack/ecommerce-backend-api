// //Botón eliminar en vista adminUsers

document.addEventListener('DOMContentLoaded', function () {
    const deleteUserButtons = document.querySelectorAll('.delete-user');

    deleteUserButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const userId = button.getAttribute('data-user-id');
            deleteUser(userId);
        });
    });

    function deleteUser(userId) {

        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log('Usuario eliminado correctamente');
                } else {
                    console.error('Error al eliminar el usuario');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }
});

// Modificar rol

document.addEventListener('DOMContentLoaded', function () {
    const roleSelects = document.querySelectorAll('.role-select');

    roleSelects.forEach(function (select) {
        select.addEventListener('change', function () {
            const userId = select.dataset.userId;
            const newRole = select.value;

            if (newRole === 'premium') {
                fetch(`/api/users/premium/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rol: newRole })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('No se pudo cambiar el rol del usuario');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Rol de usuario actualizado correctamente:', data);
                    })
                    .catch(error => {
                        console.error('Error al cambiar el rol del usuario, debe subir los tres documentos:', error);
                    });
            } else {
                fetch(`/api/users/${userId}/role`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role: newRole })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('No se pudo cambiar el rol del usuario');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Rol de usuario actualizado correctamente:', data);
                    })
                    .catch(error => {
                        console.error('Error al cambiar el rol del usuario:', error);
                    });
            }
        });
    });
});