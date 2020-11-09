/* where text will be shown */
output = document.getElementById("output");

downloadBtn = document.getElementById('download');

fileType = document.getElementById('file-type-select');

/* on change file type, prepare change url accordingly */
fileType.addEventListener('change', function(){
	setFileSave(this.value);
});

function setFileSave(fileType = '') {
	file = (function() {
		let name = new Date().toISOString().slice(0,19).replace(/-/g, "");
		let mediaType = '';
		let encoding = 'charset=utf-8,';
		let contents = encodeURIComponent(output.innerHTML);

		switch (fileType) {
			case '1':
				mediaType += 'text/plain;';
				name += '.txt';
				break;
			case '2':
				mediaType += 'text/markdown;';
				name += '.md';
				break;
			case '3':
				mediaType += 'text/html;';
				name += '.html';
				break;
		}

	    return {
	    	'name' : name,
	    	'mediaType' : mediaType,
	    	'contents' : contents, 
	    	'encoding' : encoding, 
	    	'uri' : 'data:' + mediaType + encoding + contents,
	    }
	})();

	downloadBtn.setAttribute("download", file.name);
	downloadBtn.setAttribute("href", file.uri);
}

/* selected text as #output's contents */
function setPopup(selection) {
	let plain = selection[0][0];
	
	if (selection[1]) {
		let rich = selection[1];
		console.log(rich);
	}

	display.innerHTML = plain;
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.executeScript(tabs[0].id, {
		"file" : "content_scripts/get_selection.js"
	}, function(selection) {
		setPopup(selection);
		setFileSave();
	});
});