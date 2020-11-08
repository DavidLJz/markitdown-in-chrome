/* where text will be shown */
output = document.getElementById("output");

downloadBtn = document.getElementById('download');

function returnUri(myString) {
	let fileContents = encodeURIComponent(myString);
	let = uriContents = 'data:text/csv;charset=utf-8,' + fileContents;
	return uriContents;
}

/* selected text as #output's contents */
function setPopup(selection) {
	output.innerHTML = selection[0];

	/* on click, save text as file */
	let dateStr = new Date().toISOString().slice(0,19).replace(/-/g, "");

	downloadBtn.setAttribute("download", dateStr + '.txt');
	downloadBtn.setAttribute("href", returnUri(output.innerHTML));
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.executeScript(tabs[0].id, {
		"file" : "scripts/get_selection.js"
	}, function(selection) {
		setPopup(selection);
	});
});