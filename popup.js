document.addEventListener('DOMContentLoaded', function() {
    var submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function() {
      console.log("click");
        var templateField = document.getElementById('template');
        var config = {template: templateField.value};
        console.log("config");
        console.log(config);
        chrome.tabs.executeScript(
            {code: 'var config = ' + JSON.stringify(config)},
            function () {
               console.log("callback");
                chrome.tabs.executeScript(
                    {file: 'capturing.js'},
                    (function (url_array) {})
                )
            });
    }, false);
}, false);
