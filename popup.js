/* where text will be shown */
display = document.getElementById("display");

richText = document.getElementById("rich-text");

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

		/* Convert the DOM to plaintext or markdown */
		let contents = encodeURIComponent(display.innerHTML);

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
function setPopup(selection) 
{
	if (!selection.string || !selection.dom) {
		mustHide = document.getElementsByClassName('on-selection');

		for (let i = 0; i < mustHide.length; i++) {
			mustHide[i].style.display = 'none';
		}

		mustShow = document.getElementsByClassName('no-selection');

		for (let i = 0; i < mustShow.length; i++) {
			mustShow[i].style.display = '';
		}

		return;
	}

	display.innerHTML = selection.string;
	richText.innerHTML = JSON.parse(selection.dom);
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.executeScript(tabs[0].id, {
		"file" : "content_scripts/get_selection.js"
	}, function(result) {
		setPopup(result[0]);
		setFileSave();
	});
});