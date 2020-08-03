$(function () {
  $("#load").click(function () {
    $.get("student.txt", function (responce) {
      $("#result").empty();

      $("#result").append(responce);
    });
  });
});
