/* where text will be shown */
display = document.getElementById("display");

/* download button */
downloadBtn = document.getElementById('download');

/* select file type */
fileTypeSelector = document.getElementById('file-type-select');

/* on change file type, prepare change url accordingly */
fileTypeSelector.addEventListener('change', function(){
	getFileFromClip().then(function (file) {
		downloadBtn.setAttribute("download", file.name);
		downloadBtn.setAttribute("href", file.uri);
	}).catch( (err) => console.log(err) );
});

/* selected text as #output's contents */
function setPopup(selection) 
{
	if (!selection || !selection.string || !selection.dom) 
	{
		let mustHide = document.getElementsByClassName('on-selection');

		for (let i = 0; i < mustHide.length; i++) {
			mustHide[i].style.display = 'none';
		}

		let mustShow = document.getElementsByClassName('no-selection');

		for (let i = 0; i < mustShow.length; i++) {
			mustShow[i].style.display = '';
		}

		return;
	}

	display.innerHTML = selection.string;
}

function createFile(data) 
{
	let name = new Date().toISOString().slice(0,19).replace(/-/g, "");
	let mediaType = '';
	let encoding = 'charset=utf-8,';

	let contents = {
		'md' : JSON.parse(data.dom),
		'html' : JSON.parse(data.dom),
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

function getFileFromClip () {
	return new Promise((resolve,reject) => {
		chrome.storage.local.get(['string','dom'], function(data){
			/* there is no data  */
			if (!data) {
				reject("Couldn't retrieve clipped selection from storage");
			}

			resolve(createFile(data));
		});
	});
}

chrome.tabs.executeScript({
		"file" : "content_scripts/get_selection.js"
	}, function(result) {
		setPopup(result[0]);

		getFileFromClip().then(function (file) {
				downloadBtn.setAttribute("download", file.name);
				downloadBtn.setAttribute("href", file.uri);
		}).catch( (err) => console.log(err) );
});