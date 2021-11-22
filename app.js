const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/', (req, res ,next) => {
    res.render('index', {title : 'Sum of 15 Game'});
});

app.listen(9090, () => console.log('http://localhost:9090'))