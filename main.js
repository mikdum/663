let users = [];

window.onload = function () {
};

function createNew() {
    console.log("Button was pressed")
    window.open("newusers.html");
}


function addelement(nimi) {

    var orderedlist = document.getElementById('ordered_list');
    var li = document.createElement("li");
    li.innerHTML = nimi
    orderedlist.appendChild(li);

}

function addUser() {
    var username = document.getElementById("formUsername").value;
    var formUserpassword = document.getElementById("formUserpassword").value;
    var checkSuperUser = document.getElementById("checkSuperUser").checked;

    var user = { 'name': username, 'password': formUserpassword, 'superuser': checkSuperUser };
    users.push(user)

    // Find a <table> element with id="myTable":
    var table = document.getElementById("usersTable");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow();

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    // Add some text to the new cells:
    cell1.innerHTML = users.length;
    cell2.innerHTML = username;
    if (checkSuperUser) {

        cell3.innerHTML = "<input type=\"checkbox\" checked/>";
    }
    else {

        cell3.innerHTML = "<input type=\"checkbox\" />";
    }

}