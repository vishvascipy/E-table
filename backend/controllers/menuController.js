const Menu = require("../models/menu")

module.exports = {
    postmenu: async (req, res) => {
        const { Name, menu } = req.body;
        try {
            let existingRestaurant = await Menu.findOne({ Name });

            if (!existingRestaurant) {

                existingRestaurant = await Menu.create({ Name });
            }
            for (const menuItem of menu) {
                existingRestaurant.menu.push({
                    img: menuItem.img,
                    Title: menuItem.Title,
                    Price: menuItem.Price,
                    Description: menuItem.Description
                });
            }
            await existingRestaurant.save();

            res.status(200).json({ restaurant: existingRestaurant });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    menudetails: async (req, res) => {
        try {
            const details = await Menu.find()
            res.status(200).json({ details })
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    getMenu: async (req, res) => {
        try {
            let { companyName } = req.query
            companyName = decodeURIComponent(companyName);
            console.log("com", companyName)
            const restaurant = await Menu.findOne({ Name: companyName });
            console.log("hi", restaurant)
            if (!restaurant) {
                return res.status(404).json({ error: 'Restaurant not found' });
            }
            const menuDetails = restaurant.menu;

            res.status(200).json({ restaurant })

        }
        catch (err) {
            res.status(400).json({ err })
        }
    },
    getmenuid: async (req, res) => {
        try {
            const { id } = req.params;
            const restaurant = await Menu.findOne({ "menu._id": id });
            if (!restaurant) {
                return res.status(404).json({ error: 'Menu item not found' });
            }

            const menuItem = restaurant.menu.find(item => item._id.toString() === id);
            if (!menuItem) {
                return res.status(404).json({ error: 'Menu item not found' });
            }

            res.status(200).json({ menuItem });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

}