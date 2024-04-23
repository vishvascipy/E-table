const CartSchema = require("../models/Cart")

module.exports = {
    addcart: async (req, res) => {
        const { RestaurantName, userid, TotalAmount, cart } = req.body
        try {
            const result = await CartSchema.create({
                RestaurantName, userid, TotalAmount, cart
            })
            await result.save()
            res.status(200).json({ result })
        }
        catch (err) {
            res.status(400).json({ err })
        }
    }
}