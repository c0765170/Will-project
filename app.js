var express = require('express');
var path = require('path');
const databaseConnect = require('./config/db');
const bookRoute = require('./routes/bookRouter');
const issueBookRoute = require('./routes/issueBookRouter');
const userRoute = require('./routes/userRouter');
const viewRoute = require('./routes/viewRouter');
const PORT = process.env.PORT || 9000;
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
databaseConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRoute);
app.use('/api/v1/books', bookRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/issuedBooks', issueBookRoute);
// Start server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
