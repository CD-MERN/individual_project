const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    products: [
        {
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                min: 1
            },
        }
    ],
},
    { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;