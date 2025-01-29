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
import placesTypesServer from './db/services/placesType/placesTypesServer.js';
console.log("turns ", Date.now());



const app = express();
const PORT = 4953;
console.log(PORT);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser());

connectToDatabase()
console.log("connectToDatabase", Date.now());
firebaseConfig()
console.log("firebaseConfig", Date.now());


app.use('/login', user)


app.use('/locations', tokenAuth, locationsRoute)
app.use('/userLocations', tokenAuth, userLocationsRoute)
app.use('/userSettings', tokenAuth, userSettingsRoute)
app.use('/user', tokenAuth, user)
app.use('/placesTypes', tokenAuth, placesTypesServer)


// app.use('/UserLocations',tokenAuth, (req, res) => {
//     res.json({message: "Hello World"})
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



