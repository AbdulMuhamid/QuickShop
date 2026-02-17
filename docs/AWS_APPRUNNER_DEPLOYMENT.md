# QuickShop Frontend - AWS App Runner Deployment Guide

## Prerequisites
- AWS CLI configured with your new account credentials (`quickshop-new` profile)
- Docker installed locally
- Node.js 18+ installed

## Deployment Steps

### Step 1: Set Environment Variables
```powershell
$env:AWS_PROFILE = "quickshop-new"
$env:AWS_REGION = "us-east-1"
$env:ACCOUNT_ID = "116933115597"
$env:ECR_REPO_NAME = "quickshop-frontend"
$env:AWS_ECR_REGISTRY = "$env:ACCOUNT_ID.dkr.ecr.$env:AWS_REGION.amazonaws.com"
$env:IMAGE_TAG = "latest"
```

### Step 2: Build Docker Image Locally
```powershell
cd "d:\VK 2026 JAN - MAR\IWU\AI Based Capstone Project\W5\QuickShop\frontend"
docker build -t $env:ECR_REPO_NAME`:$env:IMAGE_TAG .
```

### Step 3: Tag Image for ECR
```powershell
docker tag $env:ECR_REPO_NAME`:$env:IMAGE_TAG $env:AWS_ECR_REGISTRY/$env:ECR_REPO_NAME`:$env:IMAGE_TAG
```

### Step 4: Login Docker to ECR
```powershell
aws ecr get-login-password --region $env:AWS_REGION --profile $env:AWS_PROFILE | docker login --username AWS --password-stdin $env:AWS_ECR_REGISTRY
```

### Step 5: Push Image to ECR
```powershell
docker push $env:AWS_ECR_REGISTRY/$env:ECR_REPO_NAME`:$env:IMAGE_TAG
```

### Step 6: Create App Runner Service (Option A: Using AWS Console)
1. Go to **AWS App Runner Console** → Create Service
2. Choose **Image repository**
   - Repository type: **Amazon ECR**
   - ECR image URI: `116933115597.dkr.ecr.us-east-1.amazonaws.com/quickshop-frontend:latest`
3. Service name: `quickshop-frontend`
4. Port: `3000`
5. Environment variables:
   - `REACT_APP_API_URL`: (keep empty for now, or set backend URL later)
6. Create & Deploy

### Step 6b: Create App Runner Service (Option B: Using AWS CLI)
```powershell
$env:AWS_PROFILE = "quickshop-new"
$env:AWS_REGION = "us-east-1"
$env:ACCOUNT_ID = "116933115597"

aws apprunner create-service `
  --service-name "quickshop-frontend" `
  --source-configuration "ImageRepository={ImageIdentifier='$env:ACCOUNT_ID.dkr.ecr.$env:AWS_REGION.amazonaws.com/quickshop-frontend:latest',ImageConfiguration={Port='3000'}}" `
  --instance-configuration "Cpu=0.25,Memory=512" `
  --region $env:AWS_REGION `
  --profile $env:AWS_PROFILE
```

### Step 7: Monitor Deployment
```powershell
$env:AWS_PROFILE = "quickshop-new"
$env:AWS_REGION = "us-east-1"

# Watch deployment status
aws apprunner describe-service `
  --service-arn "arn:aws:apprunner:$env:AWS_REGION:116933115597:service/quickshop-frontend" `
  --region $env:AWS_REGION `
  --profile $env:AWS_PROFILE `
  --query "Service.{Status:Status,Url:ServiceUrl}"
```

### Step 8: View Application
Once deployment completes (Status: `RUNNING`), the app will be available at the provided **Service URL**.

---

## Troubleshooting

### Docker not installed?
- Install Docker Desktop from: https://www.docker.com/products/docker-desktop
- Ensure Docker daemon is running

### App Runner service not available?
- Ensure your IAM user has AppRunner permissions
- Try a different region (e.g., `us-west-2`)

### ECR authentication failed?
- Re-run: `aws ecr get-caller-identity --profile quickshop-new`
- Verify access key is correct

### Image push failed?
- Check image size: `docker images`
- Ensure Docker has enough disk space

---

## Cost Estimate
- **App Runner**: ~$1/month (always-on minimum)
- **ECR**: ~$0.10/GB stored
- **Data transfer**: Depends on usage

---

## Next Steps
1. Update `REACT_APP_API_URL` environment variable to point to your backend (if deployed separately)
2. Set up CloudFront CDN for faster global access
3. Configure custom domain (Route 53)
4. Enable auto-scaling for production
