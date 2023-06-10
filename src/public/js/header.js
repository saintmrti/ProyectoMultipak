$(document).ready(function () {
  $("#fecha").datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    changeMonth: true,
    changeYear: true,
    templates: {
      leftArrow: '<i class="bi bi-arrow-left"></i>',
      rightArrow: '<i class="bi bi-arrow-right"></i>',
    },
    todayHighlight: true,
    toggleActive: true,
  });
});

const form = document.querySelector("#fecha-form");
const dateInput = document.querySelector("#fecha");
const plainInput = document.querySelector("#plano");
const dateNow = document.querySelector("#fechaSpan");

function ajaxGet(url, callback) {
  const http = new XMLHttpRequest();
  http.open("GET", url);
  http.responseType = "json";
  http.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        callback(this.response);
      } else {
        console.log("Error:", this.status, this.statusText);
      }
    } else if (this.readyState === 3) {
      console.log("Loading");
    } else if (this.readyState === 2) {
      console.log("Loaded");
    } else if (this.readyState === 1) {
      console.log("Open");
    } else if (this.readyState === 0) {
      console.log("Unsent");
    }
  };
  http.send();
}

function ajaxPost(url, data, callback) {
  var http = new XMLHttpRequest();
  http.open("POST", url);
  http.setRequestHeader("Content-Type", "application/json");
  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        callback(null, http.responseText);
      } else {
        callback("Error: " + http.status);
      }
    }
  };
  http.send(JSON.stringify(data));
}
