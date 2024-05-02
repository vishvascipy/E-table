const Restaurant = require("../models/Company")

module.exports = {
    createRestaurant: async (req, res) => {
        try {
            const { name, img, location, operation, tables } = req.body;
            let existingRestaurant = await Restaurant.findOne({ name });

            if (existingRestaurant) {
                existingRestaurant.operation = { ...existingRestaurant.operation, ...operation };
                existingRestaurant.tables = { ...existingRestaurant.tables, ...tables };

                const updatedRestaurant = await existingRestaurant.save();
                res.status(200).json(updatedRestaurant);
            } else {
                const newRestaurant = new Restaurant({
                    name, img, location,
                    operation,
                    tables
                });

                const createdRestaurant = await newRestaurant.save();
                res.status(201).json(createdRestaurant);
            }
        } catch (error) {
            console.error('Error creating/updating restaurant:', error);
            res.status(500).json({ error: 'An error occurred while creating/updating the restaurant.' });
        }
    },
    viewrestaurant: async (req, res) => {
        try {
            const result = await Restaurant.find()
            res.status(200).json(result)
        }
        catch (err) {
            res.status(400).json(err)
        }
    },
    deleterestaurant: async (req, res) => {
        const id = req.params.id
        try {
            const deleted = await Restaurant.findByIdAndDelete(id)
            res.status(200).json(deleted)
        }
        catch (err) {
            res.status(400).json(err)
        }
    }
}