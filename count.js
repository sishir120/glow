const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', 'Project24', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrl = envContent.match(/DATABASE_URL="(.*)"/)[1];

process.env.DATABASE_URL = dbUrl;

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.waitlist.count();
  console.log(`TOTAL_SIGNUPS:${count}`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
