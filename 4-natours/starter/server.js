const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.config.env' });

console.log('=========================================');
console.log(process.env);
console.log('=========================================');

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log('=========================================');
  console.log('Listen port: ', port);
  console.log('=========================================');
});
