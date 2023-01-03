const express = require('express');
const router = express.Router();
require('dotenv').config();
const AWS = require('aws-sdk');

// Cloud Services Set-up
const bucketName = 'n10776800-assignment';
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
s3.createBucket({ Bucket: bucketName })
    .promise()
    .then(() => console.log(`Created bucket: ${bucketName}`))
    .catch((err) => {
        // Ignore 409 errors which indicate that the bucket already exists
        if (err.statusCode !== 409) {
            console.log(`Error creating bucket: ${err}`);
        }
    });

router.get("/getCounter", (req, res) => {
    // Construct S3 key
    const s3Key = `n10776800`;
    // Check S3
    const params = { Bucket: bucketName, Key: s3Key };
    s3.getObject(params)
        .promise()
        .then((result) => {
            // Serve from S3
            const resultJSON = JSON.parse(result.Body);
            const newcounter = resultJSON.counter + 1;
            const body = JSON.stringify({ counter: newcounter });
            const objectParams = { Bucket: bucketName, Key: s3Key, Body: body };
            s3.putObject(objectParams)
                .promise()
                .then(() => {
                    console.log(
                        `Successfully uploaded data to ${bucketName}/${s3Key}`
                    );
                    res.json(resultJSON);
                });

        })
        .catch((err) => {
            if (err.statusCode === 404) {
                // Create and initalise counter.
                const counter = 0;
                const body = JSON.stringify({ counter: counter });
                const objectParams = { Bucket: bucketName, Key: s3Key, Body: body };
                s3.putObject(objectParams)
                    .promise()
                    .then(() => {
                        console.log(
                            `Successfully uploaded data to ${bucketName}/${s3Key}`
                        );
                        res.json({ counter: counter });
                    });
            }

        })

});


module.exports = router;