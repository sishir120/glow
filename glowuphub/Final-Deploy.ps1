# Final-Deploy.ps1
$ErrorActionPreference = "Stop"
Write-Host "--- DEBUG START ---" -ForegroundColor Cyan

# 0. Define GH Path
$gh = "C:\Program Files\GitHub CLI\gh.exe"
Write-Host "GH Path: $gh"

# 1. Check Auth Explicitly
Write-Host "Checking Auth Status..."
try {
    & $gh auth status
}
catch {
    Write-Error "GH command failed to run."
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "xxx NOT LOGGED IN xxx" -ForegroundColor Red
    Write-Host "Please run this command first:"
    Write-Host "& '$gh' auth login"
    exit 1
}
Write-Host ">>> Auth OK." -ForegroundColor Green

# 2. Key Path
$kPath = "$PWD\mobile\android\app\upload-keystore.jks"
Write-Host "Keystore Path: $kPath"

if (!(Test-Path $kPath)) {
    Write-Error "File not found at $kPath"
    exit 1
}
Write-Host ">>> File exists." -ForegroundColor Green

# 3. Read File
try {
    $bytes = [System.IO.File]::ReadAllBytes($kPath)
    Write-Host "Read $($bytes.Length) bytes."
    
    $b64 = [Convert]::ToBase64String($bytes)
    Write-Host "Base64 Length: $($b64.Length)"
}
catch {
    Write-Error "Failed to read file: $_"
    exit 1
}

# 4. Set Secrets
Write-Host "Setting UPLOAD_KEYSTORE secret..."
$b64 | & $gh secret set UPLOAD_KEYSTORE
if ($LASTEXITCODE -eq 0) { Write-Host ">>> OK" -ForegroundColor Green } else { Write-Error "Failed to set UPLOAD_KEYSTORE" }

$props = "c3RvcmVQYXNzd29yZD1HbG93VXBIdWIyMDI2IQprZXlQYXNzd29yZD1HbG93VXBIdWIyMDI2IQprZXlBbGlhcz11cGxrYXQKc3RvcmVGaWxlPXVwbG9hZC1rZXlzdG9yZS5qa3M="
Write-Host "Setting KEY_PROPERTIES secret..."
$props | & $gh secret set KEY_PROPERTIES
if ($LASTEXITCODE -eq 0) { Write-Host ">>> OK" -ForegroundColor Green } else { Write-Error "Failed to set KEY_PROPERTIES" }

# 5. Trigger
Write-Host "Triggering Workflow..."
& $gh workflow run deployment.yml
if ($LASTEXITCODE -eq 0) { 
    Write-Host ">>> BUILD STARTED!" -ForegroundColor Green 
}
Write-Host "--- DEBUG END ---" -ForegroundColor Cyan
