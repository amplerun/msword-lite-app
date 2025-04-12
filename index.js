const fs = require('fs');
const path = require('path');

console.log('Current directory:', __dirname);
console.log('Directory contents:');
fs.readdirSync(__dirname).forEach(file => {
  console.log(' - ' + file);
});

// Try to find server directory
const serverPath = path.join(__dirname, 'server');
console.log('Server directory exists:', fs.existsSync(serverPath));
if (fs.existsSync(serverPath)) {
  console.log('Server directory contents:');
  fs.readdirSync(serverPath).forEach(file => {
    console.log(' - ' + file);
  });
}
