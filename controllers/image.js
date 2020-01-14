const express = require('express');
const multer = require('multer');
const requireJWTAuth = require('../middlewares/requireJWTAuth');
const ImageService = require('../services/image');

const router = express.Router();
const upload = multer();


router.post('/upload', [
    requireJWTAuth,
    upload.single('file'),
], async (req, res) => {
    if (!req.file) {
        return res.status(500).json({
            error: 'NoFileUpload',
            message: 'No file upload.',
        });
    }

    try {
        const image = await ImageService.putToS3(req.file.buffer);
        return res.json(image);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({
            error: error.name,
            message: error.message,
        });
    }
});

module.exports = router;
