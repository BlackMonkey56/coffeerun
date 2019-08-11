(function(window) {
  "use strict";
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function(email) {
      return /.+@bignerdranch\.com$/.test(email);
    },
    isDecaffeinCoffee: function(coffee, caffeine) {
      if (coffee.indexOf("decaf") !== -1 && caffeine >= 20) {
        return false;
      }

      return true;
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
