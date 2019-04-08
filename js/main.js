const inpkey = document.querySelector("#inputkey");
const inpvalue = document.querySelector("#inputvalue");
const button = document.querySelector("#btn-one");
const incomeOut = document.querySelector(".income");
const expanseOut = document.querySelector(".expanse");
const selectInput = document.querySelector("select");

function mydate() {
  let mydate = new Date();
  let myday = mydate.getDate();
  let mymonth = mydate.getMonth() + 1;
  let myyear = mydate.getFullYear();
  let mytime = mydate.getHours();
  let mymin = mydate.getMinutes();
  return `${myday}.${mymonth}.${myyear} ${mytime}:${mymin}`;
}
mydate();
console.log(mydate());

const income = [];
const expanse = [];


const dataList=(id,title,num,time)=>{
    let listItem=
   ` <li>
        <span>
            ${title}
        </span>
            <span>
                ${num}
            </span>
            <span>
                ${time}
            </span>
            </li>`
           if(id=='Icome'){
    incomeOut.insertAdjacentHTML('beforeend',listItem);
           }else if(id=='Expense'){
               expanseOut.insertAdjacentHTML('beforeend',listItem);
           }            
}

function Data(){
    const data=JSON.parse(localStorage.getItem('storedData'));
    if(data){
        data.forEach(storedData => {
            return storedData=(listItem.id,storedData.title,storedData.num,storedData.time);
        });
    }else{
        return data;
    }
}
Data();

button.onclick = function() {
    const key = inpkey.value;
    const value = inpvalue.value;
    const select = selectInput.value;
    if (key && value) {
        if (select == "Income") {
            income.push({ [key]: value });
        } else {
            expanse.push({ [key]: value });
        }
        //  localStorage.setItem(key, value);
        // location.reload();
    }
    console.log(income, expanse);
    let strigifiedAccount = JSON.stringify({ income: income, expanse: expanse });

    localStorage.setItem("account", strigifiedAccount);
    console.log(localStorage);

    let data = {
        id: select.value,
        title: description.value,
        num: amount.value,
        time: mydate()}
    let {
        title,
        num,
        time
    } = data;
    // create UI
    listItem(data.id, title, num, time);
    // Store to localStorage
    let Data;
    if (localStorage.getItem('storedData') === null) {
        Data = []
    } else {
        Data = JSON.parse(localStorage.getItem('storedData'))
    }
    storedData.push(data);
    const storedDataStringify = JSON.stringify(storedData);
    localStorage.setItem('storedData', storedDataStringify);

    // Reset input UI
    description.value = '';
    amount.value = '';

 



const parsedAcount = JSON.parse(localStorage.getItem("account"));
console.log(parsedAcount);

for (let i = 0; i < parsedAcount.income.length; i++) {
    const arrayIncome = Object.entries(parsedAcount.income[i]);
    console.log(arrayIncome);
    
    incomeOut.innerHTML += `${arrayIncome[0]}:${arrayIncome[1]}:${mydate()}`;
        
}

    }


