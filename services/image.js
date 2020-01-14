const AWS = require('aws-sdk');
const sharp = require('sharp');

const models = require('../models');

const s3 = new AWS.S3();

const processImage = async (buffer) => {
    const image = sharp(buffer)
        .rotate()
        .jpeg({
            quality: 80,
            progressive: true,
        });

    const normalSize = 500;
    const originalSize = 2048;

    const imageNormal = image.clone().resize(normalSize, normalSize, { fit: 'inside', withoutEnlargement: true });
    const imageOriginal = image.clone().resize(originalSize, originalSize, { fit: 'inside', withoutEnlargement: true });

    const imageNormalBuffer = await imageNormal.toBuffer();
    const imageOriginalBuffer = await imageOriginal.toBuffer();

    const imageNormalInfo = await sharp(imageNormalBuffer).metadata();
    const imageOriginalInfo = await sharp(imageOriginalBuffer).metadata();

    return {
        normal: {
            buffer: imageNormalBuffer,
            width: imageNormalInfo.width,
            height: imageNormalInfo.height,
        },
        original: {
            buffer: imageOriginalBuffer,
            width: imageOriginalInfo.width,
            height: imageOriginalInfo.height,
        },
    };
};

const putToS3 = async (buffer) => {
    const processedImage = await processImage(buffer);

    // Create instance
    const name = Math.random().toString(36).substring(7);
    const path = 'images/';

    const image = models.Image.build({
        normalPath: path,
        normalName: `${name}_n.jpg`,
        normalWidth: processedImage.normal.width,
        normalHeight: processedImage.normal.height,
        originalPath: path,
        originalName: `${name}_o.jpg`,
        originalWidth: processedImage.original.width,
        originalHeight: processedImage.original.height,
    });

    // Put converted file to s3
    const params = {
        Bucket: process.env.AWS_BUCKET,
        ContentType: 'image/jpeg',
    };

    // params.ACL = 'public-read';

    const putNormal = await s3.putObject({
        ...params,
        Body: processedImage.normal.buffer,
        Key: image.normalKey,
    }).promise();

    const putOriginal = await s3.putObject({
        ...params,
        Body: processedImage.original.buffer,
        Key: image.originalKey,
    }).promise();

    if (!putNormal || !putOriginal) {
        return false;
    }

    return image.save();
};

module.exports = {
    process,
    putToS3,
};
