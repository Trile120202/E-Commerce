import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    name:{
        type: String
    },
    imageBase64: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema,'images');
