var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var obj = require('./donor');
var name = "",
    gender = "",
    location = "",
    dob = "",
    bloodgroup = "",
    mobile = "",
    altmobile = "",
    date = "",
    decision = "";
var tmail = require('./sendemail');
var fb = require('./fbs');

mongoose.connect('mongodb://localhost:27017/donors');


module.exports.donor = function (aiText, sender, temp, tmp) {
    if (aiText === "Dear donor your details are successfully deleted.") {
        obj.removeDonor(sender, function (err, data) {
            if (data)
                console.log("Deleted Donor");
            else
                console.log("error");
        });
    }

    if (aiText === "can you please mention your gender?") {
        var data = {
            id: sender
        }
        obj.findUser(data, function (err, data) { 
            console.log(data.length);
            if (data.length != 0)
                console.log("Already Exists");
            else {
                var dat = {
                    name: tmp.dname,
                    gender: sender,
                    location: sender,
                    mobile: sender,
                    state: sender,
                    district: sender,
                    bloodgroup: sender,
                    dob: sender,
                    decision: sender,
                    date: sender,
                    email: sender,
                    id: sender
                }
                console.log(dat);
                obj.addDonor(dat, function (err, data) {
                    if (data)
                        console.log("data entered successfully");
                    else
                        console.log(err);
                })

            }
        })
    }
    if ((aiText === 'What is your date of birth? (mm-dd-yyyy)' || aiText === 'Can you please provide your date of birth? (mm-dd-yyyy)')) {
        obj.find({
            "gender": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    gender = tmp.dgender;
                    gender = gender.toLowerCase();
                    var da = {
                        gender: gender,
                        id: sender
                    }
                    obj.addGender(da, function (err, data) {
                        if (data)
                            console.log("gender entered successfully");
                        else
                            console.log("error");
                    })
                });
                
            }
        });

    }
    if(aiText === 'Please enter the name of state in which you are living.'){
        obj.find({
            "dob": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    dob = temp;
                    var da = {
                        dob: dob,
                        id: sender
                    }
                    obj.addDob(da, function (err, data) {
                        if (data)
                            console.log("dob entered successfully");
                        else
                            console.log("error");
                    })
                });
                
            }
        });
    }
    if(aiText === 'Please enter the name of district in which you are in.'){
        obj.find({
            "state": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    state = temp;
                    var da = {
                        state: state,
                        id: sender
                    }
                    obj.addState(da, function (err, data) {
                        if (data)
                            console.log("state entered successfully");
                        else
                            console.log("error");
                    })
                });
                
            }
        });
    }
    if ((aiText === "where are you from?" || aiText === 'can you please mention your location?' || aiText === 'can you please tell me your location?' || aiText === 'could you tell me where you live?')) {
        obj.find({
            "district": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    district = temp;
                    var da = {
                        district: district,
                        id: sender
                    }
                    obj.addDistrict(da, function (err, data) {
                        if (data)
                            console.log("district entered successfully");
                        else
                            console.log("error");
                    })
                });
                
            }
        });

    }
    if ((aiText === "What's your Blood Group?" || aiText === 'Can you please mention your Blood Group?')) {
        obj.find({
            "location": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    location = tmp.dlocation;
                    location = location.toLowerCase();
                    var da = {
                        location: location,
                        id: sender
                    }
                    obj.addLocation(da, function (err, data) {
                        if (data)
                            console.log("location entered successfully");
                        else
                            console.log("error");
                    })
                });
                
            }
        });
    }
    if (aiText === "please enter the last date on which you had donated blood? (mm-dd-yyyy)") {
        obj.find({
            "bloodgroup": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    bloodgroup = tmp.dbloodgroup;
                    bloodgroup = bloodgroup.toLowerCase();
                    var da = {
                        bloodgroup: bloodgroup,
                        id: sender
                    }
                    obj.addBloodGroup(da, function (err, data) {
                        if (data)
                            console.log("bloodgroup entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }
    if ((aiText === "what is your mobile number?" || aiText === 'can you please tell your mobile number?')) {
        obj.find({
            "date": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    date = temp;
                    var da = {
                        date: date,
                        id: sender
                    }
                    obj.addDate(da, function (err, data) {
                        if (data)
                            console.log("date entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }
    if (aiText === "please mention your email!") {
                obj.find({
            "mobile": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    mobile = tmp.dmobile;
                    var da = {
                        mobile: mobile,
                        id: sender
                    }
                    obj.addMobile(da, function (err, data) {
                        if (data)
                            console.log("mobile entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }


    if (aiText === 'Thank you for your social concern, we will inform you if we need your service. If you want to delete your details please enter "delete me"') {
     obj.find({
            "email": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    email = tmp.demail;
                    var da = {
                        email: email,
                        id: sender
                    }
                    obj.addEmail(da, function (err, data) {
                        if (data) {
                            console.log("email entered successfully");
                            tmail.mail(email, 'Thankyou for becoming a blood donator through miracle blood bot let us make this world a better place. Have a great day :)');

                        } else
                            console.log("error");
                    })
                });
            }
        });
    }

    if (aiText === "your updated date will be added to our database, thank you for your service.") {
        obj.find({
            "id": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    date = temp;
                    var da = {
                        date: date,
                        id: sender
                    }
                    obj.addDate(da, function (err, data) {
                        if (data)
                            console.log("date entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }
}
