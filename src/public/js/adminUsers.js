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