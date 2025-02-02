import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
dotenv.config();

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILENAME,
});


export default storage;
