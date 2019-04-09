
// Translate the keyboard shortcuts in manifest.json

console.log("HERE test ondemand");

chrome.commands.onCommand.addListener(function(command) {
	console.log("cmd invoked!");
	console.log(command);
	var config = {};
	switch(command) {
	case "link":
		config.template = "l";
		break;
	case "capture":
		config.template = "c";
		break;
	case "bookmark":
		config.template = "u";
		break;
	case "other":
		config.template = "o";
		break;
	case "query":
		config.template = "q";
		break;
	case "store":
		config.template = "s";
		break;
	}

    chrome.tabs.executeScript(
        {code: 'var config = ' + JSON.stringify(config)},
        function () {
          console.log ("EXECING DA SCRIPT");
            chrome.tabs.executeScript(
                {file: 'capturing.js'},
                (function (url_array) {}
                ))
        }
    );
});

// Not useful if we are using a popup
// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabs.executeScript(
//         {file: "capturing.js"},
//         (function (url_array) {
//             chrome.tabs.update({url : url_array[0]});
//         }));
// });
