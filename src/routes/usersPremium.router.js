const { Router } = require("express");
const { usersService } = require('../repositories/index.js');

const router = Router();

router.put('/premium/:uid', async (req, res) => {
    try {

        const { uid } = req.params;
        const { rol } = req.body;

        if (!["user", "premium"].includes(rol)) {
            return res.status(400).json({ message: 'Rol no válido' });
        }

        const user = await usersService.userById(id);
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.rol = rol;

        await user.save();

        return res.json({ message: `Rol de ${uid} cambiado a ${rol}` });

    } catch (error) {
        console.error('Error al cambiar el rol del usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
})

router.post('/:uid/documents', async (req, res) => {

})

module.exports = router