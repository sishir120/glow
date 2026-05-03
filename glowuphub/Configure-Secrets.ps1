# Configure-Secrets.ps1
Write-Host "Starting GlowUpHub Deployment..." -ForegroundColor Cyan

$gh = "C:\Program Files\GitHub CLI\gh.exe"

# 1. Login
Write-Host "Checking GitHub Login..."
& $gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login in the browser..." -ForegroundColor Yellow
    & $gh auth login -h GitHub.com -p HTTPS -w
}

# 2. Read Keystore
$kPath = "mobile/android/app/upload-keystore.jks"
if (!(Test-Path $kPath)) {
    Write-Error "Keystore not found!"
    exit 1
}

$bytes = [System.IO.File]::ReadAllBytes($kPath)
$b64 = [Convert]::ToBase64String($bytes)
$len = $b64.Length
Write-Host "Keystore loaded. Size: $len" -ForegroundColor Gray

$props = "c3RvcmVQYXNzd29yZD1HbG93VXBIdWIyMDI2IQprZXlQYXNzd29yZD1HbG93VXBIdWIyMDI2IQprZXlBbGlhcz11cGxvYWQKc3RvcmVGaWxlPXVwbG9hZC1rZXlzdG9yZS5qa3M="

# 3. Set Secrets
Write-Host "Setting Secrets..."
$b64 | & $gh secret set UPLOAD_KEYSTORE
$props | & $gh secret set KEY_PROPERTIES

# 4. Deploy
Write-Host "Triggering Build..."
& $gh workflow run deployment.yml

Write-Host "DONE! Check Actions tab." -ForegroundColor Green
Start-Sleep -Seconds 5
