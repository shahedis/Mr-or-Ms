function submit() {
    var name = document.getElementById('name').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    document.getElementById('prediction').style.display= 'flex' ;
    document.getElementById("p-gender").textContent= "male";
    document.getElementById("pp-percent").textContent= 0.33;
}
function save() {
    var name = document.getElementById('name').value;
    document.getElementById('saved').style.display= 'flex' ;
    document.getElementById("s-gender").textContent= name;
}
function clear() {
    alert("clear");
}