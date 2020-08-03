$(function () {
  $("#addbutton").click(handletodo);
  $("#todos").on("click", "li", removeme);
});
function handletodo() {
  var val = $("#newtodo").val();
  if (!val) {
    $("#newtodo").addClass("error");
    return;
  }
  $("#newtodo").removeClass("error");
  $("#todos").append("<li>" + val + "</li>");
}
function removeme() {
  $(this).fadeOut();
}
