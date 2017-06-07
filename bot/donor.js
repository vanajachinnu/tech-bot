var mongoose = require('mongoose');
//Defining Schema
var donorSchema = mongoose.Schema({


 
    name: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
      type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    bloodgroup: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }



});

var donor = module.exports = mongoose.model('donors', donorSchema); //Binding schema 

module.exports.addDonor = function (data, callback) {
    donor.create(data, callback);
}

module.exports.removeDonor = function (id, callback) {
    var query = {
        id: id
    };
    donor.remove(query, callback);
}


module.exports.addState = function (data, callback) {
    var id = data.id;
    var state = data.state;
    donor.update({
            id: id
        }, {
            $set: {
                "state": state
                
            }
        },
        callback
    )


}
module.exports.addDistrict = function (data, callback) {
    var id = data.id;
    var district = data.district;
    donor.update({
            id: id
        }, {
            $set: {
                "district": district

            }
        },
        callback
    )


}
module.exports.addName = function (data, callback) {
    var id = data.id;
    var name = data.name;
    donor.update({
            id: id
        }, {
            $set: {
                "name": name

            }
        },
        callback
    )


}
module.exports.addGender = function (data, callback) {
    var id = data.id;
    var gender = data.gender;
    donor.update({
            id: id
        }, {
            $set: {
                "gender": gender

            }
        },
        callback
    )


}
module.exports.addLocation = function (data, callback) {
    var id = data.id;
    var location = data.location;
    donor.update({
            id: id
        }, {
            $set: {
                "location": location

            }
        },
        callback
    )


}
module.exports.addDob = function (data, callback) {
    var id = data.id;
    var dob = data.dob;
    donor.update({
            id: id
        }, {
            $set: {
                "dob": dob

            }
        },
        callback
    )


}
module.exports.addMobile = function (data, callback) {
    var id = data.id;
    var mobile = data.mobile;
    donor.update({
            id: id
        }, {
            $set: {
                "mobile": mobile

            }
        },
        callback
    )


}
module.exports.addBloodGroup = function (data, callback) {
    var id = data.id;
    var bloodgroup = data.bloodgroup;
    donor.update({
            id: id
        }, {
            $set: {
                "bloodgroup": bloodgroup

            }
        },
        callback
    )


}
module.exports.addDate = function (data, callback) {
    var id = data.id;
    var date = data.date;
    donor.update({
            id: id
        }, {
            $set: {
                "date": date

            }
        },
        callback
    )


}
module.exports.addEmail = function (data, callback) {
    var id = data.id;
    var email = data.email;
    donor.update({
            id: id
        }, {
            $set: {
                "email": email

            }
        },
        callback
    )


}




module.exports.findUser = function (data, callback) {
    var id = data.id;
    donor.find({
        id: {
            $eq: id
        }
    }, callback)
}
