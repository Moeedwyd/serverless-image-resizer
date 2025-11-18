const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const sharp = require("sharp");

exports.handler = async (event) => {
    try {
        const bucket = event.bucket;
        const key = event.key;
        const tinyBucket = event.tiny_bucket;

        const image = await s3.getObject({
            Bucket: bucket,
            Key: key
        }).promise();

        const resized = await sharp(image.Body)
            .resize(200)
            .toBuffer();

        const newKey = "thumb-" + key;

        await s3.putObject({
            Bucket: tinyBucket,
            Key: newKey,
            Body: resized,
            ContentType: "image/jpeg"
        }).promise();

        return {
            status: "success",
            message: "Image resized",
            outputKey: newKey
        };

    } catch (err) {
        console.error(err);
        return {
            status: "fail",
            error: err.message
        };
    }
};
