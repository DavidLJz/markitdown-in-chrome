# markitdown-in-chrome - Web Clipper Extension for Chrome
Markitdown In Chrome is an extension for saving user selected content in various formats.

Currently it can save selected elements as plain text, HTML and Markdown.

HTML is sanitized before you save it using the [DOMpurify](https://github.com/cure53/DOMPurify) library, and is converted to Markdown using [Turndown](https://github.com/domchristie/turndown)

## Contents
* [Setup](#setup)
* [Pictures](#pictures)

## Setup
As the extension is not yet released on the Chrome Web Store you will have to install it manually.

Clone the repository and install dependecies running on root directory `npm install`. 

Enable developer mode in Chrome Extensions page `chrome://extensions` and select Load Unpacked. Select the project directory when prompted. 

## Pictures:

![Demo](https://i.imgur.com/sdhEBu9.jpg)
