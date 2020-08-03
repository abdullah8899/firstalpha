window.onload = function () {
  var get = document.getElementById("addtodo");
  get.onclick = handletodo;
};

function handletodo() {
  var todo = document.getElementById("todo").value;
  var addin = document.getElementById("list");
  var createtext = document.createTextNode(todo);
  var makelist = document.createElement("li");
  makelist.appendChild(createtext);
  addin.appendChild(makelist);
}

function deleteelement(e) {
  var tag = e.target;
  var li = tag.parentNode;
  li.parentNode.removeChild(li);
}
