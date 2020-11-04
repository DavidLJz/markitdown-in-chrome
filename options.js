  let page = document.getElementById('buttonDiv');

  const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

  function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
      // create a button for each color
      let button = document.createElement('button');

      // give the button its corresponding color
      button.style.backgroundColor = item;

      // updates the stored default color
      button.addEventListener('click', function() {
        chrome.storage.sync.set({color: item}, function() {
          console.log('color is ' + item);
        })
      });

      // appends to #buttonDiv the created button
      page.appendChild(button);
    }
  }

  constructOptions(kButtonColors);