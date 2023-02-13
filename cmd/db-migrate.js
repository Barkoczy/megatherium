const execSync = require('child_process').execSync;

const arg = process.argv[2] || '';

// npm run db:migrate -- init
execSync('docker exec -it megatherium-server npx prisma migrate dev --name ' + arg, {stdio:[0, 1, 2]});
