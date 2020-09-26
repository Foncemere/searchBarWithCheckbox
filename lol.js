const theList = document.getElementById("myList");
const searchBar = document.querySelector(".searchBar");
const input = document.getElementsByTagName("input");
const checkbox = document.querySelectorAll("input[name='checkboxOne']");
console.log(checkbox.length)
listedActivities = [];
finalList = [];
categoryList = [];

searchBar.addEventListener("keyup", input => {
    searchedInput = input.target.value.toLowerCase();
    let filteredActivity = listedActivities.filter(filter => { 
        return (filter.activity.toLowerCase().includes(searchedInput));
    });
    finalList = filteredActivity;
    filteringProcess(finalList, categoryList);
});

for(i=0;i<checkbox.length;i++){
    checkbox[i].addEventListener("click", (e)=> {
        if(e.target.checked){
            categoryList.push(e.target.value);
        }else{
            let index = categoryList.indexOf(e.target.value)
            if (index > -1){
                categoryList.splice(index,1);
            }
        }
        filteringProcess(finalList, categoryList)
    });
}

const filteringProcess = (e,w=[]) => {
    if(w.length != 0){
        let filtered = listedActivities.filter(filter => { 
            return (filter.category.includes(w));
        });
        display(filtered)
    }else{
        display(e)
    }
}

const loadList = async () => {
    try{
        const response = await fetch('listing.json');
        listedActivities = await response.json();
        display(listedActivities);
        finalList = listedActivities;
        for(i=0;i<checkbox.length;i++){
            checkbox[i].checked = false;
        }
    }
    catch(e){
        console.log(e)
    }
};

const display = (activities) => {
    const toString = activities.map(
        (liActivity) => {
            return `
            <div class = 'character' style = 'background-image:linear-gradient(to right, ${liActivity.color}, #f8f8f8 25%)'>
                <div id = 'activity'> ${liActivity.activity} </div>
                <div id = 'type'> ${liActivity.type} </div>
                <div id = 'category'> ${liActivity.category} </div>
                <div id = 'price'> ${liActivity.price} </div>
            </div>
            `;
        }).join('');
    theList.innerHTML = toString;
};
loadList();