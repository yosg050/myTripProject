import { PlacesTypes } from "../../schemas.js";


const placesTypesServer = async (req, res) => {
    const value = req.query.value;
    // console.log(value);

    try {
        const result = await PlacesTypes.find({
            hebrew: { $regex: value, $options: 'i' }
        });
        if (!result) {
            res.status(404).send('No places types found');
        }
        // console.log(result);
        
        res.status(200).json(result);
    } catch (error) {
        // console.log(error);
        
        res.status(400).json({ error: 'Error processing request' });
    }

}
export default placesTypesServer;