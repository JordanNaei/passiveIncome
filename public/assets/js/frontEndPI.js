// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    $('.dropdown-submenu a.test').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
      });

})