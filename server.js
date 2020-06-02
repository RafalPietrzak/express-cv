const express = require('express');
const path = require('path');

const app = express();
app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/home', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});
const isUser = (req) => {
  return false;
} 
app.use('/user', (req, res, next) => {
  if(isUser(req)) next();
  else res.send('Go away!');
});

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404);
  res.show('404.html');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});