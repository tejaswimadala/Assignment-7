require('dotenv').config();
const express = require('express');
const path = require('path');  
const connectDB = require('./config/dbconfig');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const apiRoutes = require('./routes/apiRoutes');
const errorHandler = require('./middlewares/errorMiddleware');  

const app = express();

connectDB();

app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');


app.use(authRoutes);       
app.use(profileRoutes);  
app.use(apiRoutes);         

app.use(errorHandler);


app.use((req, res) => {
    res.status(404).send('Page not found');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
