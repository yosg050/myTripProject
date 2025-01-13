import express from 'express';
import cors from 'cors';


import connectToDatabase from './db/connectToDb.js';
import firebaseConfig from './services/authentication/firebaseConfig.js';
import tokenAuth from './services/authentication/tokenAuth.js';
import cookieParser from 'cookie-parser';


import locationsRoute from './routes/locationsRoute.js';
import user from './routes/usersRoute.js';
import userLocationsRoute from './routes/userLocationsRoute.js';
import userSettingsRoute from './routes/userSettingsRoute.js'


connectToDatabase()
firebaseConfig()

const app = express();
const PORT = 4953 || 5000;
console.log(PORT);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser());

app.use('/login', user)


app.use('/locations',tokenAuth, locationsRoute)
app.use('/userLocations', tokenAuth, userLocationsRoute)
app.use('/userSettings', tokenAuth, userSettingsRoute)

// app.use('/UserLocations',tokenAuth, (req, res) => {
//     res.json({message: "Hello World"})
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



