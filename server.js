const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer')
const upload = multer({ dest: 'public/' })

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/home', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.post('/contact/send-message', upload.single('avatar'), (req, res) => {
  const { author, sender, title, message} = req.body;
  if(author && sender && title && message && req.file) {
    res.render('contact', {
      isSent: true, 
      fileName: req.file.originalname,
      filePath: '/' + req.file.filename,
    });
  }
  else {
    res.render('contact', { isError: true });
  }
});
app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
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
  res.render('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});