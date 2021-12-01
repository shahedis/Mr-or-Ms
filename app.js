function submit() {
    var name = document.getElementById('name').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
  
    const url = `https://api.genderize.io/?name=${name}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.gender === null){
            console.log("error");
            showSnackbar();
        }
        else{
            document.getElementById("p-gender").textContent= data.gender;
            document.getElementById("p-percent").textContent= data.probability;
            document.getElementById('prediction').style.display= 'flex' ;
        }
        
    })
    .catch(console.error);
    
}
function save() {
    var name = document.getElementById('name').value;
    document.getElementById('saved').style.display= 'flex' ;
    document.getElementById("s-gender").textContent= name;
}
function clear() {
    alert("clear");
}
function showSnackbar() {
    var snkbr = document.getElementById("snackbar");
    snkbr.className = "show";
    setTimeout(function(){ snkbr.className = snkbr.className.replace("show", ""); }, 8000);
}