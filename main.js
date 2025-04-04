let users = [];
let currentuser = null;
let polls = [];



class Poll {
    constructor(title) {
        this.title = title;
        this.answers = [];
        this.users = [];
        this.totalcount = 0;
    }
    addAnswer(answer, testcount = 0) {
        this.answers.push({ 'answer': answer, count: testcount });

    }
}

function testPart() {
    // test part
    currentuser = { 'name': "username", 'password': "formUserpassword", 'superuser': true };

    var poll = new Poll("1 question");
    poll.totalcount = 10;

    poll.addAnswer("1 answer", 3);
    poll.addAnswer("2 answer", 2);
    poll.addAnswer("3 answer", 1);
    poll.addAnswer("4 answer", 4);


    polls.push(poll);

    poll = new Poll("2 question1111111111111111111111111111111111111111111");
    poll.totalcount = 18;
    poll.addAnswer("1/2 answer", 3);
    poll.addAnswer("2/2 answer", 15);

    polls.push(poll);

    users.push({ 'name': `user`, 'password': `user`, 'superuser': false })
    users.push({ 'name': `admin`, 'password': `admin`, 'superuser': true })
    // test part

}

window.onload = function () {
    testPart();


    users.forEach(function (item, i) {
        row = updaterowonScrine(item.name, i + 1, "usersTable");
        var cell3 = row.insertCell(2);
        cell3.innerHTML = item.superuser
    });
    

};
function addpollonscrine(poll, i) {
    row = updaterowonScrine(poll.title, i, "pollsTable");
    var cell3 = row.insertCell(2);
    cell3.innerHTML = "<a class='btn btn-primary' >Katso</a>";
    cell3.setAttribute('onclick', "updatepollonscrine(\"" + poll.title + "\")")

}


function deleteRow(row, tablediscription) {
    //let row =buttonelement.parentElement;

    var table = document.getElementById(tablediscription);

    table.deleteRow(row.rowIndex);
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i;
    }


}
function forgotpasswordpressed() {
    document.getElementById("forgotPasswordModal").setAttribute("aria-hidden", "false");

}

function addUser() {
    document.getElementById("createNewUserModal").setAttribute("aria-hidden", "false");

    var username = document.getElementById("formUsername").value;
    var formUserpassword = document.getElementById("formUserpassword").value;
    var superuser = document.getElementById("checksuperuser").checked;

    if (username.length > 0 && (users.length == 0 || users.filter((user) => user.name == username).length == 0)) {
        var user = { 'name': username, 'password': formUserpassword, 'superuser': superuser };
        users.push(user)

        row = updaterowonScrine(username, users.length, "usersTable");
        var cell = row.insertCell(2);
        cell.innerHTML = superuser;


    }

}
function updaterowonScrine(textstring, counter, tablediscription) {
    var table = document.getElementById(tablediscription);
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = counter;
    cell2.innerHTML = textstring;

    if ('usersTable' === tablediscription || currentuser.superuser) {
        var cell3 = row.insertCell(2);
        cell3.innerHTML = "<a class='btn btn-light' href='#' onclick=deleteRow(this.parentNode.parentNode,\"" + tablediscription + "\") ><img src='./images/crest.png' style=\"width: 20%; height: 20%;\"></a>";
    
    }
    return row;
}


function loginUser() {
    var username = document.getElementById("userlogin").value;
    var userpassword = document.getElementById("userpassword").value;
    var currentusers = users.filter((user) => user.name == username && user.password == userpassword)
    if (currentusers.length > 0) {
        currentuser = currentusers[0];
        var element = document.getElementById("loginform");
        element.classList.add("d-none");

        element = document.getElementById("quizform");
        element.classList.remove("d-none");

        polls.forEach(function (item, i) {
            addpollonscrine(item, i + 1)
   
        });
    
        if (currentuser.superuser) {
            document.getElementById("addPollbutton").classList.remove("d-none")
        }
        else {

            document.getElementById("addPollbutton").classList.add("d-none")
        }

    }
    else {
        alert("incorrect password");
    }
}
function lisäävaihtoehto() {
    row = updaterowonScrine("", vaihtoehtoTable.rows.length, "vaihtoehtoTable");
    row.cells[1].innerHTML = "<input type=\"text\" class=\"form-control\" id=\"inputVaihtoehto\"></input>"

}

function logout() {
    var element = document.getElementById("quizform");
    element.classList.add("d-none");

    element = document.getElementById("loginform");
    loginform.classList.remove("d-none");
    currentuser = null;

    var panelinputpoll = document.getElementById("panelinputpoll");
    var paneloutputpoll = document.getElementById("paneloutputpoll");
    panelinputpoll.classList.add("d-none");
    paneloutputpoll.classList.add("d-none");
    
    var pollsTable = document.getElementById("pollsTable");
    while (pollsTable.rows.length > 1) {
        pollsTable.deleteRow(1);

    }

}

function addPoll() {
    document.getElementById("addPollModal").setAttribute("aria-hidden", "false");

    var table = document.getElementById("vaihtoehtoTable");
    var title = document.getElementById("title");
    if (title.value === "") {
        return;
    }

    var poll = new Poll(title.value);
    const list = document.querySelectorAll('[id=inputVaihtoehto]')

    list.forEach(function (currentValue, currentIndex, listObj) {
        if (currentValue.value !== "") {
            // strValue was not an empty string
            this.addAnswer(currentValue.value)
        }
    }, poll);

    polls.push(poll);
    while (table.rows.length > 1) {
        table.deleteRow(1);

    }
    title.value = "";
    addpollonscrine(poll, polls.length)
    closepanels()
}

function updatepollonscrine(title) {

    var poll = polls.filter((poll) => poll.title == title)[0]
    document.querySelectorAll("#formcheckradio").forEach((e, i) => {
        if (i > 0) { e.remove() }
        else {
            e.children[0].checked = true

        }
    });
    document.querySelectorAll("#containerprogress").forEach((e, i) => {
        if (i > 0) { e.remove() }

    });

    closepanels();

    if (poll.users.filter(e => e == currentuser.name).length > 0) {
        paneloutputpoll.classList.remove("d-none");
        document.getElementById("paneloutputpolltitle").innerHTML = title;
        poll.answers.forEach(function (currentValue, currentIndex, listobj) {
            addaresultpanelonscrine(currentValue, currentIndex, listobj, this);
        }, poll);
    }
    else {
        panelinputpoll.classList.remove("d-none");

        document.getElementById("titlecurrentpoll").innerHTML = title;
        poll.answers.forEach(function (currentValue, currentIndex, listObj) {
            addansweronscrine(currentValue, currentIndex);
        });

    }
    // while (element.firstChild!=element.lastChild) {
    //   element.removeChild(element.lastChild);
    // }


}
function closepanels(){
    var panelinputpoll = document.getElementById("panelinputpoll");
    var paneloutputpoll = document.getElementById("paneloutputpoll");
    panelinputpoll.classList.add("d-none");
    paneloutputpoll.classList.add("d-none");
}

function addansweronscrine(element, currentIndex) {
    let formcheck = document.querySelector("#formcheckradio")
    if (currentIndex > 0) {
        formcheck = formcheck.cloneNode(true);
        document.querySelector("#radioboxes").appendChild(formcheck);
    }
    formcheck.children[0].value = currentIndex
    formcheck.children[1].textContent = element.answer
}

function Submit() {
    var titlecurrentpoll = document.getElementById("titlecurrentpoll").innerHTML;
    const poll = polls.filter((e) => e.title == titlecurrentpoll)[0];
    poll.totalcount += 1;
    answer = document.querySelector('input[name="flexRadioDefault"]:checked').value
    poll.answers[parseInt(answer)].count += 1;
    poll.users.push(currentuser.name);

    updatepollonscrine(titlecurrentpoll);
}


function addaresultpanelonscrine(element, currentIndex, listobj, poll) {
    let progress = document.getElementById("containerprogress")
    let val = parseInt(element.count * 100 / poll.totalcount).toString() + "%"

    if (currentIndex > 0) {
        progress = progress.cloneNode(true);
        document.querySelector("#paneloutputpollbody").appendChild(progress);
    }
    progress.children[0].innerHTML = `${element.answer} (votes: ${element.count})`;

    progress.children[1].style.width = val;
    progress.children[1].textContent = val;


}

function closemodal(modalwindow) {
    document.getElementById(modalwindow).setAttribute("aria-hidden", "true");
    document.activeElement.blur(); // Снимает фокус с элемента
}