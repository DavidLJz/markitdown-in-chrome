  chrome.tabs.executeScript({
      code: "window.getSelection().toString();"
    }, function(selection) {
      console.log(selection);
      document.getElementById("output").innerHTML = selection[0];
  });