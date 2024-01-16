const express = require('express');
const multer = require('multer');
const path = require('path');

const getDestination = (req, file, cb) => {

    const { uid, documentType } = req.params;

    let folder;
    switch (documentType) {
        case 'profile':
            folder = 'profiles';
            break;
        case 'product':
            folder = 'products';
            break;
        case 'document':
            folder = 'documents';
            break;
        default:
            folder = 'unknown';
    }

    const destinationPath = path.join(process.cwd(), 'src/public/uploaded', folder);
    console.log("Ruta de destino:", destinationPath);
    cb(null, destinationPath); 

};

const storage = multer.diskStorage({
    destination: getDestination,
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload