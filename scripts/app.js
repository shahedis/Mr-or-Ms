//this function first checks name value(empty or not) and name contains and last call fetch function for send request.
function submit() {
    var name = document.getElementById('name').value;
    if(!name){
        document.getElementById("snackbar").textContent= "Please type your name";
        showSnackbar();
        return
    }
    if(/\d/.test(name)){
        document.getElementById("snackbar").textContent= "Sorry but your name must not contain numbers";
        showSnackbar();
        return
    }
    fetchAPI(name)
}
//this function use fetch api to send request.
function fetchAPI(name){
    const url = `https://api.genderize.io/?name=${name}`
    fetch(url)
    .then(response => response.json())
    //here first we check that the name exists or not, if not show a snackbar and
    //else set gendr and probability and shown them in web page.
    .then(data => {
        if(data.gender === null){
            document.getElementById("snackbar").textContent= "Sorry but this name does not exist";
            showSnackbar();
        }
        else{
            document.getElementById("p-gender").textContent= data.gender;
            document.getElementById("p-percent").textContent= data.probability;
            document.getElementById('prediction').style.display= 'flex' ;
        }
    })
    .catch(console.error);
    //here we iterate in local storage and if before sent name was saved in local storage shows it. 
    if(searchInLocalStorage()){
        document.getElementById("s-gender").textContent= searchInLocalStorage();
        document.getElementById('saved').style.display= 'flex' ;
    }
}
//here iterate in local storage items and if find items that before saved there return it`s value.
function searchInLocalStorage(){
    var name = document.getElementById('name').value;
    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        if(key == name) return value
        else break
    }
}
// here first check that gender is selected or not and next checked that name is exists or not and next
// checked thatname contains numbers or not that if there was any problem in this checking shows a snackbar, else
// if that name there were in local storage first delete last version of that and next save new gender that user wants to save(update)
// and if there wasn`t in lical storage so save gender in local storage. 
function save() {
    if(!document.querySelector('input[name="gender"]:checked')){
        document.getElementById("snackbar").textContent= "Please select a gender";
        showSnackbar();
        return
    }
    var name = document.getElementById('name').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    if(!name){
        document.getElementById("snackbar").textContent= "Please type your name";
        showSnackbar();
        return
    }
    if(/\d/.test(name)){
        document.getElementById("snackbar").textContent= "Sorry but your name must not contain numbers";
        showSnackbar();
        return
    }
    if(searchInLocalStorage()){
        localStorage.removeItem(name);
        localStorage.setItem(name, gender);
        document.getElementById("s-gender").textContent= searchInLocalStorage();
        document.getElementById('saved').style.display= 'flex' ;
    }
    else{
        localStorage.setItem(name, gender);
        document.getElementById('saved').style.display= 'flex' ;
        document.getElementById("s-gender").textContent= gender;
    }
}
//here get name and then delete that from local storage and then chenge saved box display for don`t show it. 
function clean() {
    var name = document.getElementById('name').value;
    localStorage.removeItem(name);
    document.getElementById('saved').style.display= 'none' ;
}
//this function if for showing snackbar, that update last class for it to change it`s visibility from hidden to visible.
function showSnackbar() {
    var snkbr = document.getElementById("snackbar");
    snkbr.className = "show";
    //here replace class name and set duration for showing that.
    setTimeout(function(){ snkbr.className = snkbr.className.replace("show", ""); }, 5000);
}
