
let education = document.getElementById('education');
let networth = document.getElementById("networth");
let caste = document.getElementById("caste");
let skills = document.getElementsByClassName('skills');
let age = document.getElementsByName('age');
let reputation = document.getElementsByClassName("reputation");

//button
document.getElementById('submit').addEventListener('click', function() {
    let name = document.getElementById('name').value;
    let price = parseFloat(document.getElementById('startingBid').value);

    if (name !== '' && !isNaN(price)) {
        let love_letter = document.getElementById('loveLetter').value;
        let finalprice = calculatePrice(price);

        let person = {
            bride_name: name,
            bride_price: finalprice,
            letter_to_bride: love_letter
        };

        printResult(person);
    } else {
        alert("Please enter a valid name and starting bid.");
    }
});

//calculator
function calculatePrice(price) {
    price = getSelectAddValue(caste, price);
    price = getCheckboxValuesFilterReduce(skills, price);
    price = getCheckboxValuesForLoop(reputation, price);
    price = getSelectMultiplyValue(education, price);
    price = getSelectMultiplyValue(networth, price);
    price = getRadioValue(age, price);

    return price;
}

//functions from examples
const reducer = (accumulator, item) => {
    return accumulator + Number(item.value);
}
const filteration = (item) => {
    return item.checked;
}

const getCheckboxValuesFilterReduce = (html_collection, price) => { 
    let list = Array.from(html_collection).filter(filteration) 
    let result = list.reduce(reducer, price)
    return result;
}

const getRadioValue = (node_list, price) => {  
    node_list.forEach(item => {
        if (item.checked) {
            price = price * Number(item.value)
        }
    })
    return price;
}

const getCheckboxValuesForLoop = (html_collection, price) => { 
	for (let i=0; i < html_collection.length; i++) {  
		if (html_collection[i].checked && Number.isInteger(Number(html_collection[i].value))) {
			price = price + Number(html_collection[i].value)
		}
		else if (html_collection[i].checked && !Number.isInteger(html_collection[i].value)) {
			price = price * Number(html_collection[i].value)
		}
	}
	return price;
}


//funcions for select
const getSelectMultiplyValue=(select,price)=>{
    let a=Number(select.value);
    return price*a;   
}


const getSelectAddValue=(select,price)=>{
    let a=Number(select.value);
    return price+a;   
}

//print function
function printResult(person) {
    document.getElementById("result").innerHTML = `The price for your bride ${person.bride_name} is ${person.bride_price}. Your love letter is "${person.letter_to_bride}"`;
}



