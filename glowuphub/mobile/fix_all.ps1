# Fix all withValues to withOpacity in Flutter Dart files
$libDir = "c:\Users\sishi\OneDrive\Documents\Antigravity\GlowupHub\glowuphub\mobile\lib"

Get-ChildItem -Path $libDir -Recurse -Filter "*.dart" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $original = $content
    
    # Replace .withValues(alpha: X) with .withOpacity(X)
    $content = $content -replace '\.withValues\s*\(\s*alpha\s*:\s*([0-9.]+)\s*\)', '.withOpacity($1)'
    
    if ($content -ne $original) {
        Write-Host "Fixed: $($_.Name)"
        Set-Content -Path $_.FullName -Value $content
    }
}

Write-Host "All withValues calls have been fixed!"
