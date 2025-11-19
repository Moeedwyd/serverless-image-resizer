Serverless Image Resizer (AWS Capstone Project)

This project is a simple serverless image-processing system built with AWS Lambda, Amazon S3, and AWS Step Functions.
When an image is uploaded to the original images bucket, the Lambda function can be triggered (manually or via Step Functions) to resize the image and save a thumbnail to another S3 bucket.

2. Architecture Overview

2.1 Services Used
Amazon S3 – Stores original images and resized thumbnails
AWS Lambda – Resizes images using Python + Pillow
AWS Step Functions – Runs the resize workflow
CloudWatch Logs – Monitoring and debugging

(Optional) API Gateway – Used to externally trigger Step Functions

3. How the System Works

3.1 Workflow Steps
User uploads an image to the S3 bucket original-pics
A Step Function (or manual Lambda test) invokes the Lambda function
The Lambda function:
downloads the image from S3
resizes it
uploads the thumbnail to tiny-pics
The Lambda returns a structured response:
{
  "status": "SUCCESS",
  "source_bucket": "original-pics",
  "dest_bucket": "tiny-pics",
  "width": 128,
  "height": 128"
}

4. Lambda Function (Python + Pillow)
The Lambda function performs the following steps:
Reads the input event
Downloads the image from S3
Loads the image using Pillow
Resizes it to the given width and height
Saves it in memory
Uploads the resized thumbnail to tiny-pics
Full code is included in the repository (lambda_function.py).

5. Step Function Definition
The Step Function includes:
A Task state that invokes the Lambda
A Choice state to check whether "status": "SUCCESS"
A final Success or Fail state
Full specification is in step-function-definition.json.

6. How to Test the System

6.1 Option 1 — Test Lambda Directly
Use this JSON event:
{
  "bucket": "original-pics",
  "key": "yourImage.jpg",
  "dest_bucket": "tiny-pics",
  "width": 128,
  "height": 128"
}

6.2 Option 2 — Run the Step Function
Start an execution with the same JSON input.
Step Functions will invoke Lambda and return either Success or Fail.
