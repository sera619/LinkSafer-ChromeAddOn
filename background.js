chrome.runtime.onMessage.addListener(function(request, message, sender, senderResponse){
    if (request.message === 'buttonClicked'){
        chrome.tabs.create({
            active: true,
            url: './src/snake.html',
        },null);
    }
    if (request.message === 'helpClicked'){
        chrome.tabs.create({
            active: true,
            url: "./src/help/help.html"
        },null);
    }
    if (request.message === 'ytClicked'){
        chrome.tabs.create({
            url:('./src/downloader/popup.html'),
            active: true,
        },null);
    }
});
// ---- YOUTUBE CONVERTER ----
