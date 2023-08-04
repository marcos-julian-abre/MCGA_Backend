const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors');

connectDB()

const app = express()

const corsOptions = {
    origin: 'https://abremernmcga.onrender.com'
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}else {
    app.get('/', (req, res) => res.send('Cambia a produccion'))
}


app.use(errorHandler)

app.listen(port, () => console.log(`Server Inicializado en servidor ${port}`))
