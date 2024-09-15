import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
    name:{
        type: String
    },
    imageBase64: {
        type: String,
        required: true,
    },
    url:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Image || mongoose.model('Banner', BannerSchema,'banners');
