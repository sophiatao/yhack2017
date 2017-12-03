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
    total: 500000,
}
var url = "http://159.203.2.233/quote"
var mednum = 1;


function getNextForm(param) {
        switch (param) {
            // case (0):
            //     var elem = document.getElementById("zero");
            //     info.firstName = document.getElementById("fname").value;
            //     if (!info.firstName) {
            //         alert("Invalid first name");
            //         return;
            //     }
            //     info.lastName = document.getElementById("lname").value;
            //     if (!info.lastName) {
            //         alert("Invalid last name");
            //         return;
            //     }
            //     info.email = document.getElementById("email").value;
            //     if (!info.email) {
            //         alert("Invalid email");
            //         return;
            //     }
            //     elem.style.display = 'none';
            //     changeTransparency("one");
            //     break;
            case (1):
                var elem = document.getElementById("one");
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
                info.maritalstatus = document.getElementById("mar").value? 1 : 0;
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
                info.height = document.getElementById("height").value; //max is 80
                info.weight = document.getElementById("weight").value; //number between range();
                info.tobacco = document.getElementById("tob").value? 1 : 0;
                elem.style.display = 'none';
                changeTransparency("four");
                break;
            case (4):
                var elem = document.getElementById("four");
                elem.style.display = 'none';
                changeTransparency("five");
                break;
            case (5):
                var elem = document.getElementById("five");
                info.total += document.getElementById("additional").value;
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
    if (mednum >= 5) {
        alert("maximum of 5 rows");
        return;
    }
    mednum++;
    var e = document.getElementById("medical-form");
    var newdiv = document.createElement("input");
     newdiv.name="q";
    newdiv.type="text";
    newdiv.id="med"+mednum;
    newdiv.placeholder="Enter a condition here";
    newdiv.style="color:#fff;width:75%;max-width:600px;outline:0";
    e.insertBefore(newdiv, document.getElementById("addform"));
    var demo = new autoComplete({
            selector: '#med'+mednum,
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = ['ActionScript', 'AppleScript', 'Asp', 'Assembly', 'BASIC', 'Batch', 'C', 'C++', 'CSS', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'PowerShell', 'Python', 'Ruby', 'Scala', 'Scheme', 'SQL', 'TeX', 'XML'];
                var suggestions = [];
                for (i=0;i<choices.length;i++)
                    if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
                suggest(suggestions);
            }
        });
}

// Update the current slider value (each time you drag the slider handle)
function updateSliderValue(value) {
    var output = document.getElementById("slideroutput");
    output.innerHTML = value * 10000;
}
