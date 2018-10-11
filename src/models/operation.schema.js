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
        picsLinks: [{img:{data:Buffer,contentType:String}}],
        address: String,
        addressLink: String,
        addressPic: [{img:{data:Buffer,contentType:String}}],
        vehicles: [{
            idVehicle: Number,
            brand: String,
            model: String,
            vehicleType: String,
            plate: String,
            frame: String,
            pic: [{img:{data:Buffer,contentType:String}}],
        }],
        companies: [{
            idCompany: Number,
            nameCompany: String,
            cif: String,
            address: String,
            map: String,
        }],
        rutine: [String],
        links: [String],
        familiars: [{
            idFamiliar: Number,
            nameFamiliar: String,
            familiarPics: [{img:{data:Buffer,contentType:String}}],
            familiarAddress: String,
            addressLink: String,
            related: String,
        }],
    }],

})

module.exports = mongoose.model('operations', operationSchema);

 