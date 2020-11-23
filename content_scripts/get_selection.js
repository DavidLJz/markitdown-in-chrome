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

			if (!nodes.hasChildNodes()) {
				console.error('Element has no children');
				return null;
			}

			let children = nodes.childNodes;

			/* there is a single text node, outerHTML won't work */
			if (children.length===1 && children[0].nodeType===3) 
			{
				return children[0].nodeValue;
			}

			return [...children].map(
				n => n.outerHTML 
			).join('\n')
		};

		obj = {
			'string' : string,
			'dom' : dom()
		};
	}
	else
	{
		console.error('Nothing selected');
	}

	return obj;
})();