new Vivus(
    'svg-icon',
    {
      type: 'delayed',
      duration: 100
    }
);

function myFunction() {
  var inputs = document.querySelectorAll("[data-rule]");

  for (var i = 0; i < inputs.length; i++) {
    var rule = inputs[i].dataset.rule;
    var elem = inputs[i];
    if (rule == "gender" && !inputs[i].checked) {
      $(".cell").has("[data-rule=gender]").addClass("nevalid");
    }
    else if (!elem.checkValidity()) {
      elem.classList.add('nevalid');
    }
  }
}
$(document).ready(function () {
  var inputs = document.querySelectorAll("[data-rule]");

  for (var i = 0; i < inputs.length; i++) {
    var rule = inputs[i].dataset.rule;
    var elem = inputs[i];
    if (rule == "gender") {
      elem.addEventListener("click", function () {
        $(".cell").has("[data-rule=gender]").removeClass("nevalid");
      })
    } else {
      elem.addEventListener("blur", function () {
        if (this.checkValidity()) {
          if (this.getAttribute("data-rule") == 'email') {
            this.classList.add('valid');
          }
          this.classList.remove('nevalid');
        } else if (this.getAttribute("data-rule") == 'email') {
          this.classList.remove('valid');
          this.classList.add('nevalid');
        } else if (this.getAttribute("data-rule") == 'password1') {
          this.classList.add('nevalid');
          this.setCustomValidity("Пароль должен содержать от 8 символов, заглавные и строчные буквы, а также цифры");
        }
        else
          this.classList.add('nevalid');
      })
      elem.addEventListener("focus", function () {
        this.classList.remove('nevalid');

      })
    }
  }
  $('form').submit(function (e) {
    e.preventDefault();

    $.ajax(
        {
          type: "POST",
          url: "https://dimaschah19.github.io/form/server-ok.json",
          data: $(this).serialize(),
          success: function (data) {
            document.getElementById("elem").style.display = "none";
            document.getElementById("svg-icon").style.display = "none";
            document.getElementById("wrap-modal").style.display = "block";
            document.getElementById("form").reset();
          },
          error: ErrorHandler
        }
    )

    function ErrorHandler() {
      var batton = document.getElementById("move");
      batton.classList.toggle("move");
      console.log("DOBAVIL");
      setTimeout(function () {
        batton.classList.toggle("move");
      }, 1000)
    }
  });
});


