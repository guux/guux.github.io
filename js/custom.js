window.addEventListener("DOMContentLoaded", function() {

    var jForm = $("#contact-form")
    var form = document.getElementById("contact-form");
    var button = document.getElementById("form-submit");
    var buttonText = button.textContent

    // Success and Error functions for after the form is submitted
  
    function success() {
        form.reset();
        $.notify({
            message: jForm.attr("data-success-message")
        }, {
            type: "success",
            delay: jForm.attr("data-success-message-delay") || 20000
        })
        button.innerHTML = buttonText
    }

    function error() {
        $.notify({
            message: jForm.attr("data-error-message")
        }, {
            type: "danger",
            delay: jForm.attr("data-error-message-delay") || 20000
        })
        button.innerHTML = buttonText
    }

    // handle the form submission event
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        button.innerHTML = '<i class="icon-loader fa-spin"> </i> Enviando...'
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) { 
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}
