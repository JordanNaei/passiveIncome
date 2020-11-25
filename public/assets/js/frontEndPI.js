// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

  // adding the hover effect to the iphone button to display the models
  $(".dropdown-toggle").on("mouseenter", function () {
    // make sure it is not shown:
    if (!$(this).parent().hasClass("show")) {
      $(this).click();
    }
  });
  // adding the removing of the list when mouse leave the selection 
  $(".btn-group, .dropdown").on("mouseleave", function () {
    // make sure it is shown:
    if ($(this).hasClass("show")) {
      $(this).children('.dropdown-toggle').first().click();
    }
  });

  // Start Here

  $(".capacitySelect").on("click", function (e) {
    e.preventDefault();
    $('.final').addClass('hide');
    $('.spinnerWrap').removeClass('hide');

    var id = $(this).parent().parents().attr('data-id');

    $.ajax("/api/jobs/" + id, {
      type: "POST",
    }).then(function (data) {
      document.write(data);
      console.log("you should receive result page by now");
    }
    );
  });


})




