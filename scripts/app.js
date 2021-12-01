function submit() {
    var name = document.getElementById('name').value;
    if(/\d/.test(name)){
        document.getElementById("snackbar").textContent= "Sorry but your name must not contain numbers";
        showSnackbar();
        return
    }
    fetchAPI(name)
}
function fetchAPI(name){
    const url = `https://api.genderize.io/?name=${name}`
    fetch(url)
    .then(response => response.json())
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
    if(searchInLocalStorage()){
        document.getElementById("s-gender").textContent= searchInLocalStorage();
        document.getElementById('saved').style.display= 'flex' ;
    }
}

function searchInLocalStorage(){
    var name = document.getElementById('name').value;
    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        if(key == name) return value
        else break
    }
}

function save() {
    var name = document.getElementById('name').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
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

function clean() {
    var name = document.getElementById('name').value;
    localStorage.removeItem(name);
    document.getElementById('saved').style.display= 'none' ;
}

function showSnackbar() {
    var snkbr = document.getElementById("snackbar");
    snkbr.className = "show";
    setTimeout(function(){ snkbr.className = snkbr.className.replace("show", ""); }, 8000);
}