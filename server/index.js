const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:3000","https://valueplan.myfixtant.com"],
		credentials: true
	})
);

//db connection
const connection = require('./db');

//Routes
app.use('/api/product', require('./routes/api/product'));
app.use('/api/order', require('./routes/api/order'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/code', require('./routes/api/code'));

const PORT = process.env.PORT || process.env.LocalPort;

const server = app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});
