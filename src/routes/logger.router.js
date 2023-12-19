const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    req.logger.debug('Este es un mensaje de debug');
    req.logger.http('Este es un mensaje HTTP');
    req.logger.info('Este es un mensaje informativo');
    req.logger.warn('Este es un mensaje de wanr');
    req.logger.error('Este es un mensaje de error');
    req.logger.silly('Este es un mensaje silly');
    res.send('Logs realizados');
});

module.exports = router