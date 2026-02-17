# QuickShop Frontend - Automated AWS App Runner Deployment Script
# Usage: .\deploy-to-apprunner.ps1

param(
    [string]$Environment = "quickshop-new",
    [string]$Region = "us-east-1",
    [string]$ServiceName = "quickshop-frontend"
)

$ErrorActionPreference = "Stop"

# Colors
$Green = "`e[32m"
$Red = "`e[31m"
$Yellow = "`e[33m"
$Reset = "`e[0m"

function Write-Status {
    Write-Host "$Green[✓]$Reset $args"
}

function Write-Error-Custom {
    Write-Host "$Red[✗]$Reset $args" -ForegroundColor Red
}

function Write-Warning-Custom {
    Write-Host "$Yellow[!]$Reset $args" -ForegroundColor Yellow
}

# Step 1: Verify Prerequisites
Write-Host "`n$Yellow=== Verifying Prerequisites ===$Reset`n"

# Check Docker
try {
    $dockerVersion = docker --version
    Write-Status "Docker found: $dockerVersion"
} catch {
    Write-Error-Custom "Docker not found. Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    exit 1
}

# Check AWS CLI
try {
    $awsVersion = aws --version
    Write-Status "AWS CLI found: $awsVersion"
} catch {
    Write-Error-Custom "AWS CLI not found. Please install from https://aws.amazon.com/cli/"
    exit 1
}

# Verify AWS credentials
Write-Host "`nVerifying AWS credentials..."
$awsIdentity = aws sts get-caller-identity --profile $Environment --region $Region 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error-Custom "Failed to authenticate with AWS profile '$Environment'"
    exit 1
}

$accountInfo = $awsIdentity | ConvertFrom-Json
$accountId = $accountInfo.Account
Write-Status "Connected to AWS Account: $accountId"

# Step 2: Build Docker Image
Write-Host "`n$Yellow=== Building Docker Image ===$Reset`n"
$frontendPath = "d:\VK 2026 JAN - MAR\IWU\AI Based Capstone Project\W5\QuickShop\frontend"
$imageTag = "latest"
$imageName = $ServiceName

try {
    Push-Location $frontendPath
    Write-Host "Building image: $imageName`:$imageTag"
    docker build -t "$imageName`:$imageTag" .
    Write-Status "Docker image built successfully"
} catch {
    Write-Error-Custom "Failed to build Docker image: $_"
    exit 1
} finally {
    Pop-Location
}

# Step 3: Login to ECR
Write-Host "`n$Yellow=== Logging in to ECR ===$Reset`n"
$ecrRegistry = "$accountId.dkr.ecr.$Region.amazonaws.com"

try {
    Write-Host "Authenticating Docker with ECR..."
    aws ecr get-login-password --region $Region --profile $Environment | docker login --username AWS --password-stdin $ecrRegistry
    Write-Status "Successfully logged in to ECR"
} catch {
    Write-Error-Custom "Failed to login to ECR: $_"
    exit 1
}

# Step 4: Tag Image for ECR
Write-Host "`n$Yellow=== Tagging Image for ECR ===$Reset`n"
$ecrImageUri = "$ecrRegistry/$imageName`:$imageTag"

try {
    Write-Host "Tagging image as: $ecrImageUri"
    docker tag "$imageName`:$imageTag" $ecrImageUri
    Write-Status "Image tagged successfully"
} catch {
    Write-Error-Custom "Failed to tag image: $_"
    exit 1
}

# Step 5: Push Image to ECR
Write-Host "`n$Yellow=== Pushing Image to ECR ===$Reset`n"

try {
    Write-Host "Pushing image to ECR..."
    docker push $ecrImageUri
    Write-Status "Image pushed successfully to ECR"
} catch {
    Write-Error-Custom "Failed to push image: $_"
    exit 1
}

# Step 6: Create or Update App Runner Service
Write-Host "`n$Yellow=== Creating/Updating App Runner Service ===$Reset`n"

$serviceArn = "arn:aws:apprunner:$Region`:$accountId:service/$ServiceName"

try {
    # Check if service exists
    $existingService = aws apprunner describe-service --service-arn $serviceArn --region $Region --profile $Environment 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Warning-Custom "Service already exists. Updating..."
        
        # Update service with new image
        aws apprunner update-service `
            --service-arn $serviceArn `
            --source-configuration "ImageRepository={ImageIdentifier='$ecrImageUri',ImageConfiguration={Port=3000}}" `
            --region $Region `
            --profile $Environment | Out-Null
            
        Write-Status "Service updated successfully"
    } else {
        Write-Host "Creating new App Runner service..."
        
        aws apprunner create-service `
            --service-name $ServiceName `
            --source-configuration "ImageRepository={ImageIdentifier='$ecrImageUri',ImageConfiguration={Port=3000}}" `
            --instance-configuration "Cpu=0.25,Memory=512" `
            --region $Region `
            --profile $Environment | Out-Null
            
        Write-Status "Service created successfully"
    }
} catch {
    Write-Error-Custom "Failed to create/update service: $_"
    exit 1
}

# Step 7: Wait for Service and Get URL
Write-Host "`n$Yellow=== Waiting for Deployment ===$Reset`n"
Write-Host "Checking service status..."

$maxAttempts = 60
$attempt = 0
$serviceUrl = $null

while ($attempt -lt $maxAttempts) {
    try {
        $service = aws apprunner describe-service --service-arn $serviceArn --region $Region --profile $Environment | ConvertFrom-Json
        $status = $service.Service.Status
        
        Write-Host "Status: $status (attempt $($attempt + 1)/$maxAttempts)" -NoNewline
        
        if ($status -eq "RUNNING") {
            $serviceUrl = $service.Service.ServiceUrl
            Write-Host "`n"
            Write-Status "Service is RUNNING! ✓"
            break
        } elseif ($status -eq "FAILED") {
            Write-Error-Custom "Service deployment FAILED"
            exit 1
        } else {
            Write-Host "`r" -NoNewline
            Start-Sleep -Seconds 5
            $attempt++
        }
    } catch {
        Write-Host "`r" -NoNewline
        Start-Sleep -Seconds 5
        $attempt++
    }
}

# Final Summary
Write-Host "`n$Yellow=== Deployment Complete ===$Reset`n"

if ($serviceUrl) {
    Write-Status "Application URL: $serviceUrl"
    Write-Host "`nYour React app is now live! 🚀`n"
} else {
    Write-Warning-Custom "Service took too long to start. Check AWS Console for status."
    Write-Host "Service ARN: $serviceArn`n"
}

Write-Host "Next Steps:"
Write-Host "1. Update backend API URL in frontend env variables if needed"
Write-Host "2. Configure custom domain in Route 53"
Write-Host "3. Enable auto-scaling for production"
Write-Host "`n"
