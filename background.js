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
            url: chrome.extension.getURL('./src/downloader/popup.html'),
            active: false
        }, function(tab){
            // nach dem erstellen des tabs > öffne ein fenster und injeziere den tab 
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
            });
        });
    }        
});
// ---- YOUTUBE CONVERTER ----
