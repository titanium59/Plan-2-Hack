let count = 2;

let setCount  = document.querySelector(".setNo");
let but = document.querySelector('#newlist');
let divToBeAppended = document.querySelector('#xyz');
let y = document.querySelector('.butt');
let h3 = document.querySelector("h3");
h3.addEventListener('click',() => {
    let cont = prompt("Enter exercise");
    if(cont ==='') h3.innerText = "enter exercise"
    else h3.innerText = cont; 
})

function addNewList(x){   
    let newList = document.createElement('div');
    newList.classList.add('container');
    newList.innerHTML = `<div class="row">
                        <div class = "col" id = "count">
                            <label for="" class ="setNo">Set ${count++}</label>
                        </div>
                        <div class="col">
                            <label for="previous" class = "form-label">Previous</label>
                            <input type="text" class = "form-control" id = "previous" placeholder="previous">
                        </div>
                        <div class="col">
                            <label for="kg" class = "form-label">kg</label>
                            <input type="text" class = "form-control" id = "kg">
                        </div>
                        <div class="col">
                            <label for="reps" class = "form-label">reps</label>
                            <input type="text" class = "form-control" id = "reps">
                        </div> 
                        </div>`;
    x.append(newList);
}

but.addEventListener('click',function(){addNewList(divToBeAppended)})
y.addEventListener('click',() => {
    let exerciseName = prompt('enter exercise');
    if(exerciseName === '') return;
    let heading = document.createElement('h3');
    heading.innerText = exerciseName;
    let bdyAppend = document.querySelector('body');
    bdyAppend.append(heading);
    let newDiv = document.createElement('div');
    newDiv.classList.add('newLists')
    bdyAppend.append(newDiv);
    let newButt = document.createElement('button');
    newButt.classList.add('setMar');
    newButt.classList.add('btn-outline-secondary');
    newButt.classList.add('btn');
    newButt.innerText = 'add set';
    console.log(newButt);
    bdyAppend.append(newButt);
   
    newButt.addEventListener('click',function(){addNewList(newDiv)});
    newButt.addEventListener('click',function(){console.log(heading)});
})