const mongoose = require('mongoose');

const operationSchema = mongoose.Schema({
    idOperation: Number,
    nameOperation: String,
    state: Boolean,
    operationType: String,
    people: [{
        idPerson: Number,
        namePerson: String,
        aka: String,
        picsLinks: [{img:{data:String,contentType:String}}],
        address: String,
        addressLink: String,
        addressPic: [{img:{data:String,contentType:String}}],
        vehicles: [{
            idVehicle: Number,
            brand: String,
            model: String,
            vehicleType: String,
            plate: String,
            frame: String,
            pic: [{img:{data:String,contentType:String}}],
        }],
        companies: [{
            idCompany: Number,
            nameCompany: String,
            cif: String,
            address: String,
            map: String,
        }],
        rutines: [String],
        links: [String],
        familiars: [{
            idFamiliar: Number,
            nameFamiliar: String,
            familiarPics: [{img:{data:String,contentType:String}}],
            familiarAddress: String,
            addressLink: String,
            related: String,
        }],
    }],

})

module.exports = mongoose.model('operations', operationSchema);

 