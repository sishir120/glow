$env:DATABASE_URL = (Get-Content ..\Project24\.env | Select-String "DATABASE_URL=" | ForEach-Object { $_.ToString().Split('=', 2)[1].Trim('"') })
npx prisma@6 db pull --schema ..\Project24\prisma\schema.prisma # Just to be sure
$count = (powershell -Command "$env:DATABASE_URL = '$env:DATABASE_URL'; npx prisma@6 query --schema ..\Project24\prisma\schema.prisma 'SELECT count(*) FROM \"Waitlist\"'").Trim()
Write-Host "Current Signup Count: $count" -ForegroundColor Green
