const heightEl = document.getElementById('height');
const weightEl = document.getElementById('weight');
const calculateEl = document.getElementById('calculate');
const outputEl = document.getElementById('output');
const heightUnit = document.getElementById('height-unit');
const weightUnit = document.getElementById('weight-unit');
const inchEl = document.getElementById('inch');
const poundEl = document.getElementById('pound');

calculateEl.addEventListener('click', function() {
    let heightValue = heightEl.value;
    heightEl.value = "";
    let weightValue = weightEl.value;
    weightEl.value = "";
    let inchValue = inchEl.value;
    inchEl.value = "";
    if (isNaN(heightValue) || heightValue === "" || heightValue < 0 || isNaN(weightValue) || weightValue === "" || weightValue < 0) {
        return alert('Please type in correct number');
    }
    if (heightUnit.value === "ftin") {
        if (isNaN(inchValue) || inchValue === "" || inchValue < 0) {
        return alert('Please type in correct number'); 
    }
        let feetInchValue = (heightValue * 12 + inchValue) * 2.54;
        heightValue = feetInchValue;
    }
    if (weightUnit.value === "pound") {
        let poundValue =  (weightValue / 2.20462);
        weightValue = poundValue;
    }
    formula(weightValue, heightValue);
})

function formula(value1, value2) {
    outputEl.classList.remove('underweight', 'normal', 'overweight', 'obese');
    let bmi = value1 / (Math.pow(value2/100, 2));
    let finalBmi = bmi.toFixed(2);
    if (bmi < 18.5) {
        outputEl.textContent = `Your BMI is ${finalBmi}, You are underweight`;
        outputEl.classList.add('underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
        outputEl.textContent = `Your BMI is ${finalBmi}, You are normal`;
        outputEl.classList.add('normal');
    } else if (bmi >= 25 && bmi < 30) {
        outputEl.textContent = `Your BMI is ${finalBmi}, You are overweight`;
        outputEl.classList.add('overweight');
    } else {
        outputEl.textContent = `Your BMI is ${finalBmi}, You are obese`;
        outputEl.classList.add('obese');
    }
}

heightUnit.addEventListener('change', function() {
    if (heightUnit.value === "ftin") {
        inchEl.style.display = "inline";
        heightEl.placeholder = "feet";
    } else {
        inchEl.style.display = "none";
        heightEl.placeholder = "cm";
    }
})

weightUnit.addEventListener('change', function() {
    if (weightUnit.value === "pound") {
        weightEl.placeholder = 'pound';
    } else {
        weightEl.placeholder = 'kg';
    }
})