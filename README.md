# Serverless Image Resizing Pipeline

This project resizes images automatically using AWS S3, Lambda, Step Functions, and API Gateway.

## Architecture
1. User uploads an image to the **original-pics** S3 bucket.
2. S3 triggers the **Lambda function**.
3. Lambda resizes the image using **sharp**.
4. Resized image is stored in the **tiny-pics** bucket.
5. A Step Function orchestrates the workflow.
6. API Gateway allows external triggering.

## Files in this repo
- **index.js** – Lambda function code (Node.js).
- **step-function-definition.json** – Step Functions state machine definition.
- **README.md** – Documentation.

## How to Run
1. Upload your test image to the `original-pics` S3 bucket.
2. Wait for Step Functions to complete.
3. Check `tiny-pics` bucket for the resized image.

## Author
Moeed
