const { Schema, model } = require('mongoose');

const featuresSchema = new Schema({
    camp: {
        type: Schema.Types.ObjectId,
        ref: 'CampGround',
        required: true
      },
    power:{
        type:Boolean, 
        required:false
    },
    water:{
        type:Boolean,
        required:false
    },
    canteen:{
        type:Boolean, 
        required:false
    }, 
    campfire:{
        type:String,
        required:false
    }
})
const Features = model('Features', featuresSchema);

module.exports = Features;