var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var obj = require('./donor');
var obj1 = require('./requestor');
var count = 0;
var tmail = require('./sendemail');
var fb = require('./fbs');
var reqw = "";
mongoose.connect('mongodb://localhost:27017/donors');
var location = "",
    state = "",
    district = "",
    nod = "";
//This function works only when the date is given in mm-dd-yyyy format
var diffdate = function (a, b) {
    var date1 = new Date(a);
    var date2 = new Date(b);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (diffDays);
}



function namePresent(name) {
    return name === this.toString();
}

var checkCont = function (cont) {
    var str = cont.substring(cont.length, cont.length - 1);
    var nid = cont.substring(0, cont.length - 1);
    if (str === ",") {
        console.log(str, nid);
        cont = nid;
    }
    return cont;
}

module.exports.requestor = function (aiText, sender, temp, ok, tmp) {

    if (aiText === "On which date do you want Blood? (mm-dd-yyyy)") {

        var data = {
            id: sender
        }
        obj1.findUser(data, function (err, data) {
            console.log(data.length);
            if (data.length != 0)
                console.log("Already Exists");
            else {

                var dat = {
                    name: tmp.rname,
                    location: sender,
                    date: sender,
                    mobile: sender,
                    email: sender,
                    bloodgroup: sender,
                    id: sender,
                    w: sender,
                    district: sender,
                    state: sender,
                    number: sender,
                    count: sender
                }
                console.log(dat);
                obj1.addRequestor(dat, function (err, data) {
                    if (data)
                        console.log("data entered successfully");
                    else
                        console.log(err);
                })

            }
        })


    }

    if ((aiText === "Can you please enter your state name?"))

    {
        obj1.find({
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
                    obj1.addDate(da, function (err, data) {
                        if (data)
                            console.log("date entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }
    if ((aiText === "Can you please mention the name of your district?")) {
        obj1.find({
            "state": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    state = tmp.rstate;
                    state = state.toLowerCase();
                    var da = {
                        state: state,
                        id: sender
                    }
                    obj1.addState(da, function (err, data) {
                        if (data)
                            console.log("state entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }
    if (aiText === "Which Location are you in?") {
        obj1.find({
            "district": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    district = tmp.rdistrict;
                    district = district.toLowerCase();
                    var da = {
                        district: district,
                        id: sender
                    }
                    obj1.addDistrict(da, function (err, data) {
                        if (data)
                            console.log("district entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }
    if ((aiText === "what is your contact number?")) {
        obj1.find({
            "location": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    location = tmp.rlocation;
                    location = location.toLowerCase();
                    var da = {
                        location: location,
                        id: sender
                    }
                    obj1.addLocation(da, function (err, data) {
                        if (data)
                            console.log("location entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }

    if (aiText === "How many number of donators do you need?") {
        obj1.find({
            "mobile": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    mobile = tmp.rnumber;
                    var da = {
                        mobile: mobile,
                        id: sender
                    }
                    obj1.addMobile(da, function (err, data) {
                        if (data)
                            console.log("mobile entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });
    }
    if (aiText === "Which Blood Group Do you need?") {
        obj1.find({
            "id": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    number = tmp.rnod;
                    var da = {
                        number: number,
                        id: sender
                    }
                    obj1.addNumber(da, function (err, data) {
                        if (data)
                            console.log("nod entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });

    }
    if ((aiText === "please enter your mail id!")) {
        obj1.find({
            "bloodgroup": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    bloodgroup = tmp.rbloodgroup;
                    bloodgroup = bloodgroup.toLowerCase();
                    var da = {
                        bloodgroup: bloodgroup,
                        id: sender
                    }
                    obj1.addBloodGroup(da, function (err, data) {
                        if (data)
                            console.log("bloodgroup entered successfully");
                        else
                            console.log("error");
                    })
                });
            }
        });


    }
    if (aiText === "Thank you for using our application.") {
        obj1.find({
            "email": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    email = tmp.remail;
                    email = email.toLowerCase();
                    var da = {
                        email: email,
                        id: sender
                    }
                    obj1.addEmail(da, function (err, data) {
                        if (data) {
                            console.log("email entered successfully");
                            tmail.mail(email, 'Thankyou for requesting blood through Miracle BloodBot hope you receive a donor as soon as possible');

                            obj.find({
                                "location": location,
                                "bloodgroup": bloodgroup

                            }, (err, data) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    count = 0;
                                    data.forEach(donor => {
                                        var age = `${parseInt(diffdate(donor.dob,date)/365)} years ${diffdate(donor.dob,date)%365} days`;
                                        console.log(age);

                                        ddif = diffdate(donor.date, date);
                                        console.log(ddif);
                                        if ((ddif >= 90) && (donor.id != sender)) {

                                            count = count + 1;


                                        }

                                        obj1.find({
                                            "id": sender
                                        }, (err, data) => {
                                            if (err) {
                                                console.error(err);
                                            } else {
                                                data.forEach(req => {

                                                    donorid = donor.id;
                                                    var str1 = `Requestor: name: ${req.name}, mobile: ${req.mobile}, Location: ${req.location}, Email: ${req.email} \r\n`;

                                                    if ((ddif >= 90) && (donorid != sender)) {

                                                        fb.send(donorid, str1);
                                                        fb.senda(donorid, req.id);
                                                    }
                                                })
                                            }
                                        });


                                    })
                                    if (count == 0) {
                                        var strk = `We are sorry , there are no donors available yet if there exists any they will contact you as soon as possible\r\n`;
                                        fb.send(sender, strk);
                                        obj1.removeRequestor(sender, function (err, data) {
                                            if (data)
                                                console.log("Deleted Requestor");
                                            else
                                                console.log("error");
                                        });

                                    }
                                }

                            });

                        } else
                            console.log("error");
                    })
                });
            }

        });
    }
    if (aiText === "Oh it's great to hear dear user , have a good day :)") {
        obj1.find({
            "id": sender
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data.forEach(don => {
                    obj.find({
                        "bloodgroup": don.bloodgroup
                    }, (err, data) => {
                        if (err) {
                            console.error(err);
                        } else {
                            data.forEach(donor => {

                                var str2 = `Requestor named ${don.name} who needs ${don.bloodgroup} had got help so please ignore previous message`;
                                donorid = donor.id;
                                fb.send(donorid, str2);


                            });

                            obj1.removeRequestor(sender, function (err, data) {
                                if (data)
                                    console.log("Deleted Requestor");
                                else
                                    console.log("error");
                            });
                        }
                    });
                })
            }
        });

    }




}
module.exports.intim = function (donat, reque) {
    obj.find({
        "id": donat

    }, (err, data) => {
        if (err) {
            console.error(err);
        } else {

            data.forEach(donor => {
                //                                   

                obj1.find({
                    "id": reque
                }, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        data.forEach(req => {
                            date = req.date;
                            var cont = req.count;
                            var wtemp = req.w;
                            if (cont === reque || cont === "") {
                                cont = donat;
                                cont.toString();
                                var da = {
                                    count: cont,
                                    id: reque
                                }
                                obj1.addCount(da, function (err, data) {
                                    if (data)
                                        console.log("count entered successfully");
                                    else
                                        console.log("error");
                                })

                            } else {

                                var num = req.number;
                                num = parseInt(num);
                                var ar1 = cont.split(',');
                                if (ar1.length < num) {
                                    cont = cont + ',' + donat;

                                    console.log(cont);
                                    cont.toString();
                                    var da = {
                                        count: cont,
                                        id: reque
                                    }
                                    obj1.addCount(da, function (err, data) {
                                        if (data)
                                            console.log("count entered successfully");
                                        else
                                            console.log("error");
                                    })
                                } else if (wtemp === reque || wtemp === "") {
                                    var arrValues = cont.split(',');
                                    var nav = arrValues.some(namePresent, donat);
                                    if (nav === false) {
                                        wtemp = donat;
                                        console.log(wtemp);
                                        cont.toString();
                                        var da = {
                                            w: wtemp,
                                            id: reque
                                        }
                                        obj1.addW(da, function (err, data) {
                                            if (data)
                                                console.log("w entered successfully");
                                            else
                                                console.log("error");
                                        })
                                    }
                                } else {
                                    var arrValues = cont.split(',');
                                    var nav1 = arrValues.some(namePresent, donat);
                                    arrValues = wtemp.split(',');
                                    var nav = arrValues.some(namePresent, donat);
                                    if (nav === false && nav1 === false) {
                                        wtemp = wtemp + ',' + donat;
                                        console.log(wtemp);
                                        wtemp.toString();
                                        var da = {
                                            w: wtemp,
                                            id: reque
                                        }
                                        obj1.addW(da, function (err, data) {
                                            if (data)
                                                console.log("w entered successfully");
                                            else
                                                console.log("error");
                                        })
                                    }
                                }
                            }


                            var arrValues = cont.split(',');
                            var nav = arrValues.some(namePresent, donat);
                            if (nav === true) {
                                var age = `${parseInt(diffdate(donor.dob,date)/365)} years ${diffdate(donor.dob,date)%365} days`;
                                var str = `This person is wiling to give you blood  name: ${donor.name}, age: ${age}, mobile: ${donor.mobile}, Email: ${donor.email}, Location: ${donor.location} \r\n`;
                                var ar = cont.split(',');

                                fb.send(req.id, str);
                                fb.send(donor.id, `Dear donor we gave your details to the requestor named "${req.name}" since you are willing to give blood`);

                            } else {
                                fb.send(donor.id, `Dear donor we will let you know once we need your sevice.`);
                            }

                        })
                    }
                });


            })

        }

    });



}
module.exports.intim1 = function (donat, reque) {
    obj.find({
        "id": donat

    }, (err, data) => {
        if (err) {
            console.error(err);
        } else {

            data.forEach(donor => {


                obj1.find({
                    "id": reque
                }, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {

                        data.forEach(req => {
                            fb.send(req.id, `Dear requestor the donor named "${donor.name}" is unfortunately busy so that person may not be able to donate blood to "${req.name}", please forgive us `);
                            fb.send(donat, `Dear donor we had informed to the requestor named "${req.name}" that you are unable to give blood`);
                            var cont = req.count;
                            var wtemp = req.w;

                            console.log(cont);
                            var arrValues = cont.split(',');
                            var nav1 = arrValues.some(namePresent, donat);
                            arrValues = wtemp.split(',');
                            var nav = arrValues.some(namePresent, donat);

                            console.log(cont);
                            if (nav1) {

                                var ary = cont.split(',');
                                var aryWithoutdonor = ary.filter(function (value) {
                                    return value != donat
                                });
                                console.log(aryWithoutdonor);
                                cont = aryWithoutdonor;
                                cont = cont.join();


                                cont = checkCont(cont);

                                var da = {
                                    count: cont,
                                    id: reque
                                }
                                obj1.addCount(da, function (err, data) {
                                    if (data)
                                        console.log("count entered successfully");
                                    else
                                        console.log("error");
                                })
                                var num = req.number;
                                num = parseInt(num);


                                var conta = cont.split(',');
                                var wtempa = wtemp.split(',');
                                var nd = wtempa.pop();
                                console.log(conta.length + "happy dog");

                                if (conta.length < num && nd !== reque) {
                                    console.log('inside');
                                    var wstr = req.w;
                                    console.log(wstr);
                                    var arr = wstr.split(',');
                                    var b = arr.pop();
                                    var s = arr.join();
                                    s=checkCont(s);
                                    var da = {
                                        w: s,
                                        id: reque
                                    }
                                    obj1.addW(da, function (err, data) {
                                        if (data)
                                            console.log("w entered successfully");
                                        else
                                            console.log("error");
                                    })
                                    if (cont === "") {
                                        cont = b;
                                    } else
                                        cont = cont + ',' + b;
                                    cont=checkCont(cont);
                                    var da = {
                                        count: cont,
                                        id: reque
                                    }
                                    obj1.addCount(da, function (err, data) {
                                        if (data)
                                            console.log("count entered successfully");
                                        else
                                            console.log("error");
                                    })


                                    obj.find({
                                        "id": b

                                    }, (err, data) => {
                                        if (err) {
                                            console.error(err);
                                        } else {


                                            data.forEach(donor1 => {

                                                date = req.date;
                                                var age = `${parseInt(diffdate(donor1.dob,date)/365)} years ${diffdate(donor1.dob,date)%365} days`;
                                                var str = `This person is wiling to give you blood  name: ${donor1.name}, age: ${age}, mobile: ${donor1.mobile}, Email: ${donor1.email}, Location: ${donor1.location} \r\n`;
                                                fb.send(req.id, str);
                                                fb.send(donor1.id, `Dear donor we gave your details to the requestor named "${req.name}" since you are willing to give blood`);




                                            })
                                        }
                                    });








                                }

                            }
                            if (nav) {

                                var ary = wtemp.split(',');
                                var aryWithoutdonor = ary.filter(function (value) {
                                    return value != donat
                                });
                                console.log(aryWithoutdonor);
                                wtemp = aryWithoutdonor;

                                var da = {
                                    w: wtemp,
                                    id: reque
                                }
                                obj1.addW(da, function (err, data) {
                                    if (data)
                                        console.log("w entered successfully");
                                    else
                                        console.log("error");
                                })

                            }

                        })
                    }
                });


            })

        }

    });



}
module.exports.intim2 = function (donat, reque) {
    obj.find({
        "id": donat

    }, (err, data) => {
        if (err) {
            console.error(err);
        } else {

            data.forEach(donor => {


                obj1.find({
                    "id": reque
                }, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        data.forEach(req => {
                            fb.send(req.id, `Dear requestor the donor named "${donor.name}" is unfortunately busy so that person may not be able to donate blood to "${req.name}", please forgive us `);
                            fb.send(donat, `Dear donor we had informed to the requestor named "${req.name}" that you are unable to give blood`);
                            var cont = req.count;
                            var wtemp = req.w;
                            var conta = cont.split(',');
                            var wtempa = wtemp.split(',');
                            var nd = wtempa.pop();
                            console.log(cont);
                            var arrValues = cont.split(',');
                            var nav1 = arrValues.some(namePresent, donat);
                            arrValues = wtemp.split(',');
                            var nav = arrValues.some(namePresent, donat);
                            if (nav1 === true) {
                                var ary = cont.split(',');
                                var aryWithoutdonor = ary.filter(function (value) {
                                    return value != donat
                                });
                                console.log(aryWithoutdonor);
                                cont = aryWithoutdonor;
                                cont = cont.join();
                                cont=checkCont(cont);

                                var da = {
                                    count: cont,
                                    id: reque
                                }
                                obj1.addCount(da, function (err, data) {
                                    if (data)
                                        console.log("count entered successfully");
                                    else
                                        console.log("error");
                                })
                                if (conta.length < num && nd !== reque) {
                                    console.log('inside');
                                    var wstr = req.w;
                                    console.log(wstr);
                                    var arr = wstr.split(',');
                                    var b = arr.pop();
                                    var s = arr.join();
                                    var da = {
                                        w: s,
                                        id: reque
                                    }
                                    obj1.addW(da, function (err, data) {
                                        if (data)
                                            console.log("w entered successfully");
                                        else
                                            console.log("error");
                                    })
                                    if (cont === "") {
                                        cont = b;
                                    } else
                                        cont = cont + ',' + b;
                                    cont=checkCont(cont);
                                    cont.toString();
                                    var da = {
                                        count: cont,
                                        id: reque
                                    }
                                    obj1.addCount(da, function (err, data) {
                                        if (data)
                                            console.log("count entered successfully");
                                        else
                                            console.log("error");
                                    })


                                    obj.find({
                                        "id": b

                                    }, (err, data) => {
                                        if (err) {
                                            console.error(err);
                                        } else {


                                            data.forEach(donor1 => {

                                                date = req.date;
                                                var age = `${parseInt(diffdate(donor1.dob,date)/365)} years ${diffdate(donor1.dob,date)%365} days`;
                                                var str = `This person is wiling to give you blood  name: ${donor1.name}, age: ${age}, mobile: ${donor1.mobile}, Email: ${donor1.email}, Location: ${donor1.location} \r\n`;
                                                fb.send(req.id, str);
                                                fb.send(donor1.id, `Dear donor we gave your details to the requestor named "${req.name}" since you are willing to give blood`);




                                            })
                                        }
                                    });








                                }

                            } else if (nav === true) {
                                var ary = wtemp.split(',');
                                var aryWithoutdonor = ary.filter(function (value) {
                                    return value != donat
                                });
                                console.log(aryWithoutdonor);
                                wtemp = aryWithoutdonor;
                                wtemp.toString();
                                var da = {
                                    w: wtemp,
                                    id: reque
                                }
                                obj1.addW(da, function (err, data) {
                                    if (data)
                                        console.log("w entered successfully");
                                    else
                                        console.log("error");
                                })
                            }

                            fb.send(donat, `Thankyou dear donor we consider that you are unavailable at this time.`);

                        })
                    }
                });


            })

        }

    });



}
