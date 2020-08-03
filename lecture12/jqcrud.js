$(function () {
  loadrecipes();
  $("#recipes").on("click", ".btn-danger", handledelete);
  $("#addbtn").click(function () {
    addRecipe();
  });
});

function handledelete() {
  var value = $(this);

  var id = value.closest(".recipe");

  var valbtn = id.attr("data-id");
  //console.log(valbtn);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + valbtn,
    method: "DELETE",
    success: function () {
      loadrecipes();
    },
  });
}

function loadrecipes() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    error: function () {
      var recipies = $("#recipes");
      recipies.append("an Error has Occurred");
    },
    success: function (response) {
      console.log(response);
      var recipies = $("#recipes");

      recipies.empty();
      for (i = 0; i < response.length; i++) {
        var re = response[i];
        recipies.append(
          `<div class="recipe" data-id=${re._id}><h3>${re.title}</h3><p> <button class="btn btn-danger btn-sm float-right"> Delete</button><button class="btn btn-warning btn-sm float-right"> Edit</button>${re.body}</p></div>"`
        );
        // recipies.append("<div><h3>" + re.title + "</h3></div>");
      }
    },
  });
}
function addRecipe() {
  var title = $("#title").val();
  var body = $("#body").val();

  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title, body },
    success: function (response) {
      console.log(response);
      loadrecipes();
    },
  });
}
