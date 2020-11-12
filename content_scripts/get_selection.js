(function(){
	const sel = window.getSelection();

	let obj;

	if (sel && sel.rangeCount && !sel.isCollapsed) 
	{
		string = sel.toString();
		dom = sel.anchorNode.parentElement.outerHTML;

		obj = {
			'string' : string,
			'dom' : JSON.stringify(dom),
		};

		chrome.storage.local.set(obj);
	}
	else
	{
		console.log('Nothing selected');
	}

	return obj;
})();