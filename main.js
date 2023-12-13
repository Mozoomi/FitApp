const imperialTable = document.getElementById('imperial-weight-height');
const metricTable = document.getElementById('metric-weight-height');
const unitBttns = document.getElementById("impBttn");
const metBttn = document.getElementById("metBttn");
const resultsTable = document.getElementById("results");
var unitType = "Imperial";
var globalGender = "male";
const plainBMRTxt = document.getElementById("plainBMR");

function onLoad() {
   metricTable.style.display = "none";
   resultsTable.style.display = "none";
   impBttn.style.backgroundColor = "#5491c6";
   plainBMRTxt.style.display = "none";
}  

onLoad();

function toggleUnits(type) {
   if (type == "Imperial") {
      // Changes from imperial to metric
      type = "Metric";
      imperialTable.style.display = "none";
      metricTable.style.display = "block";
      metBttn.style.backgroundColor = "#5491c6";  // Change the button color in metric state
      impBttn.style.backgroundColor = "";
    } else {
      // Changes from metric to imperial
      type = "Imperial";
      metricTable.style.display = "none";
      imperialTable.style.display = "block";
      impBttn.style.backgroundColor = "#5491c6";  // Change the button color in imperial state
      metBttn.style.backgroundColor = "";
  }
  unitType = type;
}

function toggleGender(selectedGender) {
   var gender1 = document.getElementById('gender1');
   var gender2 = document.getElementById('gender2');

   if (selectedGender === 'gender1' && gender1.checked) {
      gender2.checked = false;
      globalGender = 'male';
   } else if (selectedGender === 'gender2' && gender2.checked) {
      gender1.checked = false;
      globalGender = 'female';
   }
}

function calculateBMR(event) {
   event.preventDefault();

   var BMR_MifflinStJeor, BMR_HarrisBenedict, BMR_KatchMcArdle;
   var BMR_Oxford, BMR_Cunningham, BMR_WHO, BMR_Average;

   var gender = globalGender;
   var weight = parseFloat(document.getElementById('pounds').value);
   var heightFeet = parseFloat(document.getElementById('height-feet').value);
   var heightInches = parseFloat(document.getElementById('height-inch').value);
   var heightCM = parseFloat(document.getElementById('cm').value);
   var age = parseInt(document.getElementById('age').value);
   var activitySelect = document.getElementById('activity');
   var activity = parseFloat(activitySelect.value);

   var height;
   if (unitType == "Imperial") {
      height = (heightFeet * 12) + heightInches;
   } else {
      height = heightCM;
   }

   // Mifflin-St Jeor Equation
   if (gender == "male") {
      BMR_MifflinStJeor = 10 * weight + 6.25 * height - 5 * age + 5;
   } else {
      BMR_MifflinStJeor = 10 * weight + 6.25 * height - 5 * age - 161;
   }

   // Revised Harris-Benedict Equation
   if (gender == "male") {
      BMR_HarrisBenedict = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
   } else {
      BMR_HarrisBenedict = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
   }

   // Katch-McArdle Formula
   BMR_KatchMcArdle = 370 + 21.6 * (1 - 0.25) * weight;

   // Additional Equations
   // Oxford Equation
   BMR_Oxford = 447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age);

   // Cunningham Equation
   BMR_Cunningham = 500 + (22 * (1 - 0.15) * weight);

   // WHO Equation
   BMR_WHO = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);

   // Calculate average
   BMR_Average = (BMR_MifflinStJeor + BMR_HarrisBenedict + BMR_KatchMcArdle + BMR_Oxford + BMR_Cunningham + BMR_WHO) / 6;
   // Final calories
   let caloriesBMR = Math.round(BMR_Average * activity);

   if(activity ==1.0){
      plainBMRTxt.style.display = "block";
      document.getElementById("BMR-text").textContent = caloriesBMR;
   }
   else{
      plainBMRTxt.style.display = "none";
      resultsTable.style.display = "block";
      document.getElementById("extremeGainTxt").textContent = caloriesBMR + 500;
      document.getElementById("weightGainTxt").textContent = caloriesBMR + 300;
      document.getElementById("mildGainTxt").textContent = caloriesBMR + 150;
      document.getElementById("maintainWeightTxt").textContent = caloriesBMR;
      document.getElementById("mildLossTxt").textContent = caloriesBMR - 150;
      document.getElementById("weightLossTxt").textContent = caloriesBMR - 300;
      document.getElementById("extremeLossTxt").textContent = caloriesBMR - 500;
   }
   

   // Avoid page reloading when getting form
   return false;
}

function setGoal(goalType){
   var calories = parseFloat(document.getElementById(goalType).textContent);

   localStorage.setItem('goalType', goalType);
   localStorage.setItem('daily_calories', calories)
}