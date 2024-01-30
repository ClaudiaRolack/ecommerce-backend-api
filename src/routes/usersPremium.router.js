const { Router } = require('express');
const { usersService } = require('../repositories/index.js');
const { authorizationMiddleware } = require('../auth/authMiddleware.js');
const { passportCall } = require('../auth/passport.config.js');
const jwt = require('jsonwebtoken');
const upload = require('../middlewares/multerMiddleware.js');

const router = Router();

// router.get('/', authorizationMiddleware(['admin']), async (req, res) => {

//     const allUsers = await usersService.getAllUsers(user => ({
//         name: user.name,
//         email: user.email,
//         role: user.role,
//     }));

//     res.json(allUsers);
// });


// passportCall('jwt'), authorizationMiddleware(['admin']),


router.get('/', async (req, res) => {
    try {

        const user = await usersService.getAllUsers(user => ({
            name: user.name,
            email: user.email,
            role: user.role,
        }));

        const isAdmin = true;

        res.render('adminUsers', {
            users: user,
            admin: isAdmin
        });


    } catch (error) {
        console.error('Error al cargar la página de administración de usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
});

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

router.delete('/', async (req, res) => {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const inactiveUsers = await usersService.getCandidatesForDeletion(twoDaysAgo);

        const deletedUsers = await Promise.all(inactiveUsers.map(async user => {
            await usersService.sendDeletionEmail(user.email);
            return usersService.deleteUser(user._id);
        }));

        res.json({ deletedUsers });
    } catch (error) {
        console.error('Error al realizar la limpieza de usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        
        const deletedUser = await usersService.deleteUser(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado exitosamente', deletedUser });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error interno al eliminar usuario' });
    }
});

module.exports = router