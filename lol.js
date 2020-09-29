const theList = document.getElementById("myList");
const searchID= document.getElementById("searchID");
const searchBar = document.querySelector(".searchBar");
const input = document.getElementsByTagName("input");
const checkbox = document.querySelectorAll("input[name='checkboxOne']");
const activityLabel = document.querySelector(".activityLabel");
const catLabel = document.querySelector(".catLabel");

listedActivities = [];
finalList = [];
categoryList = [];
bool = false;
bool2 = false;

for(i=0;i<checkbox.length;i++){
    checkbox[i].addEventListener("click", (e)=> {
        console.log(e);
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

const arrangeActivity = () =>{
    bool = !bool;
    if (bool){    
        finalList.sort((a,b) => (a.activity > b.activity) ? 1 : -1);
        activityLabel.style.borderTop = "#eeeeee solid 3px";
        activityLabel.style.borderBottom = "white solid 3px";
        catLabel.style.border = "white solid 3px";
        bool2 = false;
    }else{
        finalList.sort((a,b) => (a.activity > b.activity) ? -1 : 1);
        activityLabel.style.borderBottom = "#eeeeee solid 3px";
        activityLabel.style.borderTop = "white solid 3px";
        catLabel.style.border = "white solid 3px";
        bool2 = false;
    }
    filteringProcess(finalList, categoryList)
}

const arrangeCat = () =>{
    bool2 = !bool2;
    if (bool2){    
        finalList.sort((a,b) => (a.category > b.category) ? 1 : -1);
        catLabel.style.borderTop = "#eeeeee solid 3px";
        catLabel.style.borderBottom = "white solid 3px";
        activityLabel.style.border = "white solid 3px";
        bool = false;

    }else{
        finalList.sort((a,b) => (a.category > b.category) ? -1 : 1);
        catLabel.style.borderBottom = "#eeeeee solid 3px";
        catLabel.style.borderTop = "white solid 3px";
        activityLabel.style.border = "white solid 3px";
        bool = false;

    }
    filteringProcess(finalList, categoryList)
}

searchBar.addEventListener("keyup", e => {
    searchedInput = e.target.value.toLowerCase();
    let filteredActivity = listedActivities.filter(filter => { 
        return (filter.activity.toLowerCase().includes(searchedInput));
    });
    finalList = filteredActivity;
    filteringProcess(finalList, categoryList);
});

const filteringProcess = (e,w=[]) => {
    if(w.length != 0){
        let filtered = finalList.filter(filter => { 
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
        searchID.value = "";
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