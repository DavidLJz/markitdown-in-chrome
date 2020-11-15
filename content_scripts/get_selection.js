(function(){
	const sel = window.getSelection();

	let obj;

	if (sel && sel.rangeCount && !sel.isCollapsed) 
	{
		/* DOM inner text only */
		string = sel.toString();

		/* convert selected DOM to string */
		dom = () => {
			let nodes = sel.getRangeAt(0).cloneContents();

			return [...nodes.childNodes].map(
				n => n.outerHTML 
			).join('\n')
		};

		obj = {
			'string' : string,
			'dom' : dom()
		};

		chrome.storage.local.set(obj);
	}
	else
	{
		console.log('Nothing selected');
	}

	return obj;
})();