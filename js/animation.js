var info = {
    firstName: null,
    lastname: null,
    email: null,
    city: null,
    longitude: null,
    latitude: null,
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
    medical: [],
    total: 500000,
}
var url = "http://159.203.2.233/quote"
var mednum = 0;


function getNextForm(param) {
        switch (param) {
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
                    alert("Invalid city");
                    return;
                }
                $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?address="+info.city, function(val) {
                    if(val.results.length) {
                        console.log("query success");
                      var location = val.results[0].geometry.location;
                      info.latitude = location.lat;
                      info.longitude = location.lng;
                    }
                    else alert("Invalid city");
                    return;
                })
                info.state = document.getElementById("state").value; //selecting
                if (!info.state) {
                    alert("Invalid state");
                    return;
                }
                animatenone(elem);
                changeTransparency("two");
                break;
            case (2):
                var elem = document.getElementById("two");
                info.maritalstatus = document.getElementById("mar").value? 1 : 0;
                info.employmentstatus = document.getElementById("emp").value? 1 : 0;
                info.annualincome = document.getElementById("ann").value; //number between range
                if (info.annualincome < 0 || info.annualincome > 1000000) {
                    alert("Please enter income in range 0-1000000");
                    return;
                }
                info.dependents = document.getElementById("dep").value; //1, 2, 3, 4
                // if (maritalstatus == null)
                animatenone(elem);
                changeTransparency("three");
                break;
            case (3):
                var elem = document.getElementById("three");
                info.age = document.getElementById("age").value; //selecting
                info.sex = document.getElementById("sex").value; //'M' or 'F' m is 0, F is 1
                info.height = document.getElementById("height").value; //max is 80
                info.weight = document.getElementById("weight").value; //number between range();
                info.tobacco = document.getElementById("tob").value? 1 : 0;
                animatenone(elem);
                changeTransparency("four");
                break;
            case (4):
                var elem = document.getElementById("four");
                animatenone(elem);
                changeTransparency("five");
                break;
            case (5):
                var elem = document.getElementById("five");
                info.total += document.getElementById("additional").value;
                for (var i = 0; i <= mednum; i++) {
                    var med = document.getElementById("med"+i).value.split(" ")[0];
                    var risk = document.getElementById("risk"+i).value;
                    info.medical.push({"ICD_CODE": med, "Risk_factor": risk});
                }
                animatenone(elem);
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
    console.log(xhr.status);
    console.log(xhr.responseText);

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
    // var e = document.getElementById("medical-form");
    $("#med0").clone().prop({ id: "med"+ mednum }).appendTo("#med-container");
    $("#risk0").clone().prop({ id: "risk"+ mednum }).appendTo("#med-container");
    var demo = new autoComplete({
            selector: '#med'+mednum,
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = ["A15-A19 Tuberculosis","B20-B20 Human immunodeficiency virus [HIV] disease","D50-D53 Nutritional anemias","E08-E13 Diabetes mellitus","E65-E68 Overweight, obesity and other hyperalimentation","E73 Lactose intolerance","E84 Cystic fibrosis","F20-F29 Schizophrenia, schizotypal, delusional, and other non-mood psychotic disorders","F70-F79 Intellectual disabilities","G10 Huntington's disease","G11 Hereditary ataxia","G20 Parkinson's disease","G30 Alzheimer's disease","G35 Multiple sclerosis","G40 Epilepsy and recurrent seizures","G43 Migraine","G47 Sleep disorders","G80 Cerebral palsy","G91 Hydrocephalus","G92 Toxic encephalopathy","H40-H42 Glaucoma","H80 Otosclerosis","I10-I16 Hypertensive diseases","I20-I25 Ischemic heart diseases","I26 Pulmonary embolism","I30 Acute pericarditis","I40 Acute myocarditis","I46 Cardiac arrest","I50 Heart failure","I63 Cerebral infarction","I95 Hypotension","J09-J18 Influenza and pneumonia","J81 Pulmonary edema","K35 Acute appendicitis","K40-K46 Hernia","K50 Crohn's disease [regional enteritis]","K51 Ulcerative colitis","K65 Peritonitis","K70 Alcoholic liver disease","K74 Fibrosis and cirrhosis of liver","K85 Acute pancreatitis","L20 Atopic dermatitis","L21 Seborrheic dermatitis","L22 Diaper dermatitis","L23 Allergic contact dermatitis","L24 Irritant contact dermatitis","L40 Psoriasis","L41 Parapsoriasis","L60 Nail disorders","L70 Acne","L71 Rosacea","L80 Vitiligo","L89 Pressure ulcer","M08 Juvenile arthritis","M10 Gout","M1A Chronic gout","M15-M19 Osteoarthritis","N17 Acute kidney failure","N18 Chronic kidney disease (CKD)","N46 Male infertility","N52 Male erectile dysfunction","N91 Absent, scanty and rare menstruation","N92 Excessive, frequent and irregular menstruation","N96 Recurrent pregnancy loss","N97 Female infertility","Q02 Microcephaly","Q05 Spina bifida","Q35-Q37 Cleft lip and/or cleft palate","Q61 Cystic kidney disease","Q90 Down syndrome","Q91 Trisomy 18 and Trisomy 13","Q96 Turner's syndrome","R17 Unspecified jaundice","S00-S09 Injuries to the head","S10-S19 Injuries to the neck","T33-T34 Frostbite","Z66-Z66 Do not resuscitate status","Z68-Z68 Body mass index (BMI)"];
                var suggestions = [];
                for (i=0;i<choices.length;i++)
                    if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
                suggest(suggestions);
            }
        });
}

function removeForm() {
    if (mednum <= 0) {
        return;
    }
    mednum++;
    // var e = document.getElementById("medical-form");
    $("#med0").clone().prop({ id: "med"+ mednum }).appendTo("#med-container");
    $("#risk0").clone().prop({ id: "risk"+ mednum }).appendTo("#med-container");
    var demo = new autoComplete({
            selector: '#med'+mednum,
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = ["A15-A19 Tuberculosis","B20-B20 Human immunodeficiency virus [HIV] disease","D50-D53 Nutritional anemias","E08-E13 Diabetes mellitus","E65-E68 Overweight, obesity and other hyperalimentation","E73 Lactose intolerance","E84 Cystic fibrosis","F20-F29 Schizophrenia, schizotypal, delusional, and other non-mood psychotic disorders","F70-F79 Intellectual disabilities","G10 Huntington's disease","G11 Hereditary ataxia","G20 Parkinson's disease","G30 Alzheimer's disease","G35 Multiple sclerosis","G40 Epilepsy and recurrent seizures","G43 Migraine","G47 Sleep disorders","G80 Cerebral palsy","G91 Hydrocephalus","G92 Toxic encephalopathy","H40-H42 Glaucoma","H80 Otosclerosis","I10-I16 Hypertensive diseases","I20-I25 Ischemic heart diseases","I26 Pulmonary embolism","I30 Acute pericarditis","I40 Acute myocarditis","I46 Cardiac arrest","I50 Heart failure","I63 Cerebral infarction","I95 Hypotension","J09-J18 Influenza and pneumonia","J81 Pulmonary edema","K35 Acute appendicitis","K40-K46 Hernia","K50 Crohn's disease [regional enteritis]","K51 Ulcerative colitis","K65 Peritonitis","K70 Alcoholic liver disease","K74 Fibrosis and cirrhosis of liver","K85 Acute pancreatitis","L20 Atopic dermatitis","L21 Seborrheic dermatitis","L22 Diaper dermatitis","L23 Allergic contact dermatitis","L24 Irritant contact dermatitis","L40 Psoriasis","L41 Parapsoriasis","L60 Nail disorders","L70 Acne","L71 Rosacea","L80 Vitiligo","L89 Pressure ulcer","M08 Juvenile arthritis","M10 Gout","M1A Chronic gout","M15-M19 Osteoarthritis","N17 Acute kidney failure","N18 Chronic kidney disease (CKD)","N46 Male infertility","N52 Male erectile dysfunction","N91 Absent, scanty and rare menstruation","N92 Excessive, frequent and irregular menstruation","N96 Recurrent pregnancy loss","N97 Female infertility","Q02 Microcephaly","Q05 Spina bifida","Q35-Q37 Cleft lip and/or cleft palate","Q61 Cystic kidney disease","Q90 Down syndrome","Q91 Trisomy 18 and Trisomy 13","Q96 Turner's syndrome","R17 Unspecified jaundice","S00-S09 Injuries to the head","S10-S19 Injuries to the neck","T33-T34 Frostbite","Z66-Z66 Do not resuscitate status","Z68-Z68 Body mass index (BMI)"];
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

function animatenone(element) {
    transition.begin(element, ["opacity", "1", "0", "500ms", "linear"], {onTransitionEnd: function() {element.style.display = 'none';}});
}

