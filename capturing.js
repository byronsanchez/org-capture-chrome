var capture = function(config){

	console.log("CAPTURE INVOKED");

	/**
	 * Escape all instances of a character @p char
	 */
	String.prototype.esc = function(char) {
		var rx = new RegExp("[" + char + "]", 'g');
		return this.replace(rx, escape(char));
	};

	/**
	 * Escape all parentheses and single quotes in a string
	 */
	var esc_parentheses_quote = function (text) {
		return text.esc("(").esc(")").esc("'");
	};

    /**
     * Construct a URI for the appropriate the org-capture template.
     * TEMPLATE corresponds to org-capture-template hotkey.
     *
     * The general format is:
     * org-protocol://capture://TEMPLATE/URL/TITLE/TEXT
     */
    var uri = 'org-protocol://capture://';

	// Only include text field if there is a selection in the webpage
	var text = window.getSelection().toString();
	if (text != "") { text = esc_parentheses_quote(text);};

	switch (config.template) {
	case "c":
		uri = uri + "?template=" + config.template + '&url='
			+ encodeURIComponent(window.location.href) + '&title='
			+ encodeURIComponent(document.title);
		break;
	case "l":
		uri = uri + "?template=" + 'w' + '&url='
			+ encodeURIComponent(location.href) + '&title='
			+ encodeURIComponent(document.title);
		break;
	case "u":
		uri = uri + "?template=" + 'u' + '&url='
			+ encodeURIComponent(location.href) + '&title='
			+ encodeURIComponent(document.title);
		break;
	case "o":
		uri = uri + "?url=" + encodeURIComponent(window.location.href) + '&title='
			+ encodeURIComponent(document.title);
		break;
	// Store the link instead of capturing it, so you can paste it in an emacs
	// buffer trivally (eg. project-specific docs)
	case "s":
		uri = uriStore + "?template=" + config.template + '&url='
			+ encodeURIComponent(window.location.href) + '&title='
			+ encodeURIComponent(document.title);
		break;
	}

	if (text && typeof text === "string") {
		console.log("text: ");
		console.log(text);
		// We quote here because the capture template doesn't have conditionals
		// for template expansions (eg. %i) as far as I know
		//
		// Line breaks weren't being preserved and it was all in one line, so
		// I'll have to find a way to fix that if I end up needing this
		// functionality.
		//
		//text = "+begin_quote\n" + text + "\n#+end_quote";
		uri = uri + "&body=" + text;
	}
	console.log("Preview of org-protocol URI: ", uri);

    location.href = uri;
};

console.log("in capturing");

capture(config);
