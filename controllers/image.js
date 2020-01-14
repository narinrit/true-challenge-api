const express = require('express');
const multer = require('multer');
const requireJWTAuth = require('../middlewares/requireJWTAuth');
const ImageService = require('../services/image');

const router = express.Router();
const upload = multer();

function responseError(res, error, status = 500) {
    return res.status(status).json({
        status,
        error: error.name,
        message: error.message,
    });
}

router.post('/upload', [
    requireJWTAuth,
    upload.single('file'),
], async (req, res) => {
    if (!req.file) {
        responseError(res, {
            name: 'NoFileUpload',
            message: 'No file upload.',
        }, 422);
        return;
    }

    try {
        ImageService.putToS3(req.file.buffer).then((image) => {
            res.json(image);
        }).catch((saveError) => {
            responseError(res, saveError);
        });
    } catch (e) {
        responseError(res, e);
        throw e;
    }
});

module.exports = router;
