(function(){

	const selection = window.getSelection();

	let string, dom;

	if (selection && selection.rangeCount && !selection.isCollapsed) 
	{
		string = selection.toString();
		dom = selection.anchorNode.parentElement.outerHTML;
	}

	obj = {
		'string' : string,
		'dom' : JSON.stringify(dom),
	};

	return obj;
})();