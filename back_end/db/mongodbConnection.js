
// import { MongoClient, ServerApiVersion } from 'mongodb';
// import dotenv from 'dotenv';
// dotenv.config();

// const uri = process.env.MONGODB_URI
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version

// let db;

// async function connectToDatabase() {
//     if (db) {
//         return db
//     }
//     try {
//         const client = new MongoClient(uri, {
//             serverApi: {
//                 version: ServerApiVersion.v1,
//                 strict: true,
//                 deprecationErrors: true,
//             }
//         });

//         await client.connect();
//         db = client.db("myTrip");
//         console.log("Connected to MongoDB!");
//         return db

//     } catch (error) {
//         console.error("Failed to connect to MongoDB", error);
//         throw error;
//     }
// }
// // connectToDatabase().catch(console.dir);

// export { db, connectToDatabase };
