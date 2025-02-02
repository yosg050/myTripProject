import storage from "./storage.js";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import axios from "axios";
import putUserDetails from "../db/services/users/putUserDetails.js";
dotenv.config();

const bucketName = process.env.GOOGLE_CLOUD_PROJECT_NUMBER;

const uploadFile = async (filePath, fileName, userId) => {

    // create copy of file

    try {


        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const tempFilePath = path.resolve(`./temp/${fileName}.jpg`);

        // const tempFilePath = path.join(__dirname, ` ${fileName}.jpg`);
        const writer = fs.createWriteStream(tempFilePath);

        const response = await axios({ url: filePath, responseType: 'stream' });
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        //upload file to storage
        const newfileName = `user-photos/${fileName}.jpg`;
        const bucket = storage.bucket(bucketName);
        await bucket.upload(tempFilePath, {
            destination: newfileName,
        });

        console.log(`${filePath} uploaded to ${bucketName}/${fileName}.jpg`);

        fs.unlinkSync(tempFilePath);
        const photoUrlNew = `https://storage.cloud.google.com/${bucketName}/${newfileName}`;

        putUserDetails(userId, { photoUrl: photoUrlNew });
        return ;
    }

    catch (error) {
        console.log("error", error);
    }


}

export default uploadFile;