/* where text will be shown */
display = document.getElementById("display");

/* download button */
downloadBtn = document.getElementById('download');

/* select file type */
fileTypeSelector = document.getElementById('file-type-select');

/* update url to download desired filetype */
fileTypeSelector.addEventListener('change', function(){
	getFileFromClip().then(function (file) {
		downloadBtn.setAttribute("download", file.name);
		downloadBtn.setAttribute("href", file.uri);
	}).catch( (err) => console.log(err) );
});


function createFile(data) 
{
	let name = new Date().toISOString().slice(0,19).replace(/-/g, "");
	let mediaType = '';
	let encoding = 'charset=utf-8,';

	function toMarkdown(node) { 
		let td = new TurndownService();
		return td.turndown(node);
	}

	let contents = {
		'md' : toMarkdown(data.dom),
		'html' : data.dom,
		'txt' : data.string
	}

	let fileType = fileTypeSelector.value ?? '';

	switch (fileType) {
		case '2':
			mediaType += 'text/markdown;';
			name += '.md';
			uri = 'data:' + mediaType + encoding + contents.md
			break;
		case '3':
			mediaType += 'text/html;';
			name += '.html';
			uri = 'data:' + mediaType + encoding + contents.html
			break;
		default:
			mediaType += 'text/plain;';
			name += '.txt';
			uri = 'data:' + mediaType + encoding + contents.txt
	}

    return {
    	'name' : name,
    	'mediaType' : mediaType,
    	'contents' : contents, 
    	'encoding' : encoding, 
    	'uri' : uri,
    }
}

/* fetch saved selection from storage and encode */
function getFileFromClip () {
	return new Promise((resolve,reject) => {
		chrome.storage.local.get(['string','dom'], function(data){
			/* there is no data  */
			if (!data || !data.dom || !data.string) {
				reject("Couldn't retrieve clipped selection from storage");
			}

			resolve(createFile(data));
		});
	});
}

function storeClipboard(obj) {
	return new Promise ( function (resolve,reject) {

		if (!obj || !obj.string || !obj.dom) {
			reject('Object selection not valid');
		}

		display.innerHTML = obj.string;

		for (let i in obj) {
			obj[i] = DOMPurify.sanitize(obj[i]);
		}

		chrome.storage.local.set(obj, () => resolve(true)); 
	});
}

function clipboardError(err='') {
	if (err) {
		console.error(err);
	}

	let mustHide = document.getElementsByClassName('on-selection');

	for (let i = 0; i < mustHide.length; i++) {
		mustHide[i].style.display = 'none';
	}

	let mustShow = document.getElementsByClassName('no-selection');

	for (let i = 0; i < mustShow.length; i++) {
		mustShow[i].style.display = '';
	}
}

chrome.tabs.executeScript({
		"file" : "content_scripts/get_selection.js"
	}, function (result) {
		storeClipboard(result[0]).then( () => {

			getFileFromClip().then(function (file) {
					downloadBtn.setAttribute("download", file.name);
					downloadBtn.setAttribute("href", file.uri);
			}).catch( err => clipboardError(err) );

		}).catch( err => clipboardError(err) );
});