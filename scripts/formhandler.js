(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this)
        .serializeArray()
        .forEach(function(item) {
          data[item.name] = item.value;
          console.log(item.name + " is " + item.value);
        });

      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });

    FormHandler.prototype.addInputHandler = function(
      emailCheck,
      caffeineCheck
    ) {
      console.log("Setting input handler for form");
      this.$formElement.on("input", '[name="emailAddress"]', function(event) {
        var emailAddress = event.target.value;
        var message = "";
        if (emailCheck(emailAddress)) {
          event.target.setCustomValidity("");
        } else {
          message = emailAddress + " is not an authorized email address!";
          event.target.setCustomValidity(message);
        }
      });

      this.$formElement.on("input", '[coffee-style="decaf"]', function(event) {
        var coffee = $('[name="coffee"]').val();
        var caffeine = $('[name="strength"]').val();

        console.log(event.target);
        console.log(coffee + " " + caffeine);

        var message = "";
        if (caffeineCheck(coffee, caffeine)) {
          event.target.setCustomValidity("");
        } else {
          message = "It's not decaffeine!";
          event.target.setCustomValidity(message);
        }
      });
    };

    FormHandler.prototype.changeRangeHandler = function() {
      console.log("Setting range handler");
      $("#strengthLevel").on("input", function(event) {
        $("#strengthValue").val($(this).val());

        if ($("#strengthValue").val() < 30) {
          $("#strengthValue").css("color", "blue");
        } else if (
          $("#strengthValue").val() >= 30 &&
          $("#strengthValue").val() < 70
        ) {
          $("#strengthValue").css("color", "orange");
        } else {
          $("#strengthValue").css("color", "red");
        }
      });
    };
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
