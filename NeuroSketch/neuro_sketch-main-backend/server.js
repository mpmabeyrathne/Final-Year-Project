const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./src/routes/user.routes')

app.use('/api/v1/neuro_sketch', userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT || 5000, () => {
    console.log(`Server is Starting !!! | PORT ${PORT}`)
});
