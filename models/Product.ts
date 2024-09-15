import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
    image_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    }],
    description: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema,'products');

export default Product;
