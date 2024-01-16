const { Router } = require('express');
const { usersService } = require('../repositories/index.js');
const upload = require('../middlewares/multerMiddleware.js');

const router = Router();

router.post('/:uid/documents/:documentType', upload.array('documents'), async (req, res) => {
    try {
        const { uid } = req.params;

        console.log('UID:', uid);
        console.log('Files:', req.files);

        const user = await usersService.userById(uid);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.documents = req.files.map(file => ({
            name: file.originalname,
            reference: file.path,
        }));

        await user.save();

        return res.json({ message: 'Documentos subidos exitosamente' });
    } catch (error) {
        console.error('Error al subir documentos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.put('/premium/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const { rol } = req.body;

        if (!["user", "premium"].includes(rol)) {
            return res.status(400).json({ message: 'Rol no válido' });
        }

        const user = await usersService.userById(uid);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (
            user.documents.some(doc => doc.name === 'Identificacion.pdf') &&
            user.documents.some(doc => doc.name === 'ComprobanteDeDomicilio.pdf') &&
            user.documents.some(doc => doc.name === 'ComprobanteDeEstadoDeCuenta.pdf')
        ) {
            user.rol = rol;
            await user.save();
            return res.json({ message: `Rol de ${uid} cambiado a ${rol}` });
        } else {
            return res.status(400).json({ message: 'El usuario debe cargar los documentos requeridos' });
        }
    } catch (error) {
        console.error('Error al cambiar el rol del usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router