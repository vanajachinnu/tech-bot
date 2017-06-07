var mongoose = require('mongoose');
//Defining Schema
var requestorSchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    count: {
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
    w: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }



});

var request = module.exports = mongoose.model('requestors', requestorSchema); //Binding schema 

module.exports.addRequestor = function (data, callback) {
    request.create(data, callback);
}

module.exports.removeRequestor = function (id, callback) {
    var query = {
        id: id
    };
    request.remove(query, callback);
}
module.exports.addState = function (data, callback) {
    var id = data.id;
    var state = data.state;
    request.update({
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
    request.update({
            id: id
        }, {
            $set: {
                "district": district

            }
        },
        callback
    )


}
module.exports.addW = function (data, callback) { 
var id = data.id;
    var w = data.w;
    request.update({
            id: id
        }, {
            $set: {
                "w": w
                
            }
        },
        callback
    )

}
module.exports.addNumber = function (data, callback) {
    var id = data.id;
    var number = data.number;
    request.update({
            id: id
        }, {
            $set: {
                "number": number
                
            }
        },
        callback
    )


}
module.exports.addCount = function (data, callback) {
    var id = data.id;
    var count= data.count;
    request.update({
            id: id
        }, {
            $set: {
                "count": count

            }
        },
        callback
    )


}
module.exports.addName = function (data, callback) {
    var id = data.id;
    var name = data.name;
    request.update({
            id: id
        }, {
            $set: {
                "name": name

            }
        },
        callback
    )


}
module.exports.addDate = function (data, callback) {
    var id = data.id;
    var date = data.date;
    request.update({
            id: id
        }, {
            $set: {
                "date": date

            }
        },
        callback
    )


}
module.exports.addLocation = function (data, callback) {
    var id = data.id;
    var location = data.location;
    request.update({
            id: id
        }, {
            $set: {
                "location": location

            }
        },
        callback
    )


}

module.exports.addMobile = function (data, callback) {
    var id = data.id;
    var mobile = data.mobile;
    request.update({
            id: id
        }, {
            $set: {
                "mobile": mobile

            }
        },
        callback
    )


}
module.exports.addEmail = function (data, callback) {
    var id = data.id;
    var email = data.email;
    request.update({
            id: id
        }, {
            $set: {
                "email": email

            }
        },
        callback
    )


}

module.exports.addBloodGroup = function (data, callback) {
    var id = data.id;
    var bloodgroup = data.bloodgroup;
    request.update({
            id: id
        }, {
            $set: {
                "bloodgroup": bloodgroup

            }
        },
        callback
    )


}

module.exports.findUser = function (data, callback) {
    var id = data.id;
    request.find({
        id: {
            $eq: id
        }
    }, callback)
}
