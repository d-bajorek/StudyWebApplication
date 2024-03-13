/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
$(document).ready(function () {
  // Inicjalizacja walidacji formularza
  $("form").validate({
    rules: {
      inputFirstName: "required",
      inputLastName: "required",
      inputEmail4: {
        required: true,
        email: true
      },
      inputPassword4: {
        required: true,
        minlength: 5
      },
      inputAddress: "required",
      inputCity: "required",
      inputState: "required",
      gridCheck: "required"
    },
    messages: {
      inputFirstName: "Please enter your first name",
      inputLastName: "Please enter your last name",
      inputEmail4: {
        required: "Please enter your email address",
        email: "Please enter a valid email address"
      },
      inputPassword4: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      inputAddress: "Please enter your address",
      inputCity: "Please enter your city",
      inputState: "Please select your country",
      gridCheck: "Please accept the terms & conditions"
    },
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      // Dodawanie klasy bootstrapowej do błędu
      error.addClass("invalid-feedback");
      // Dodawanie błędu po elemencie formularza
      error.insertAfter(element);
    },
    highlight: function highlight(element, errorClass, validClass) {
      // Zmiana wyglądu pola przy błędzie
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function unhighlight(element, errorClass, validClass) {
      // Zmiana wyglądu pola po poprawnej walidacji
      $(element).addClass("is-valid").removeClass("is-invalid");
    }
  });
});
/////////////////////////////////////////////////////////////
var selectElement = document.querySelector("select");
var table = document.querySelector("table");

// Lista krajów:
fetch("https://restcountries.com/v2/all").then(function (response) {
  return response.json();
}).then(function (data) {
  data.forEach(function (country) {
    var option = document.createElement("option");
    option.text = country.name;
    selectElement.add(option);
  });
});
/******/ })()
;
//# sourceMappingURL=koszyk.8baf63c6cae60a9482e1.bundle.js.map