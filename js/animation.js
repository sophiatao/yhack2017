var info = {
    firstName: null,
    lastname: null,
    email: null,
    city: null,
    address: null,
    state: null,
    maritalstatus: null,
    employmentstatus: null,
    annualincome: null,
    dependents: null,
    age: null,
    sex: null,
    height: null,
    weight: null,
    tobacco: null,
    medical: null,
}
var url = "http://159.203.2.233/quote"


function getNextForm(param) {
        switch (param) {
            case (0):
                var elem = document.getElementById("zero");
                info.firstName = document.getElementById("fname").value;
                if (!info.firstName) {
                    alert("Invalid first name");
                    return;
                }
                info.lastName = document.getElementById("lname").value;
                if (!info.lastName) {
                    alert("Invalid last name");
                    return;
                }
                info.email = document.getElementById("email").value;
                if (!info.email) {
                    alert("Invalid email");
                    return;
                }
                changeTransparency("one");
                break;
            case (1):
                var elem = document.getElementById("one");
                info.address = document.getElementById("address").value;
                if (!info.address) {
                    alert("Invalid address");
                    return;
                }
                info.city = document.getElementById("city").value; //selecting
                if (!info.city) {
                    alert("Invalid address");
                    return;
                }
                info.state = document.getElementById("state").value; //selecting
                if (!info.state) {
                    alert("Invalid state");
                    return;
                }

                elem.style.display = 'none';
                changeTransparency("two");
                break;
            case (2):
                var elem = document.getElementById("two");
                info.maritalstatus = document.getElementById("mar").value;
                info.employmentstatus = document.getElementById("emp").value;
                info.annualincome = document.getElementById("ann").value; //number between range
                info.dependents = document.getElementById("dep").value; //1, 2, 3, 4
                // if (maritalstatus == null)
                elem.style.display = 'none';
                changeTransparency("three");
                break;
            case (3):
                var elem = document.getElementById("three");
                info.age = document.getElementById("age").value; //selecting
                info.sex = document.getElementById("sex").value; //'M' or 'F' m is 0, F is 1
                info.height = document.getElementById("height").value; //number between range();
                info.weight = document.getElementById("weight").value; //number between range();
                info.tobacco = document.getElementById("tob").value;
                elem.style.display = 'none';
                changeTransparency("four");
                break;
            case (4):
                var elem = document.getElementById("four");
                elem.style.display = 'none';
                console.log(info);
                submit();
                break;
    }
}

function submit() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(info);
    xhr.onload = function() {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }

}

function changeTransparency(elem, transparency) {
    var e = document.getElementById(elem);
    e.classList.remove("semitransparent");
}


function changeTransparencyWithBorder(elem, transparency) {
    var e = document.getElementsByClassName(elem);
    e.style.color = "rgba(255,255,255,"+transparency+")";
    e.style.borderBottomColor = "rgba(255,255,255,"+transparency+")";
}

function addForm() {
    var e = document.getElementById("medical-form");
}