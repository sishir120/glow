$env:DATABASE_URL = (Get-Content ..\Project24\.env | Select-String "DATABASE_URL=" | ForEach-Object { $_.ToString().Split('=', 2)[1].Trim('"') })
npx prisma@6 db push --schema ..\Project24\prisma\schema.prisma
