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
});
// ---- YOUTUBE CONVERTER ----

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher ({
                    pageUrl: {hostContains: 'youtube'}
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
});

chrome.runtime.onMessage.addListener(function(message) {
    var url = 'http://localhost:4000/download?';
    var queryString = Object.keys(message).map(key => key + '=' + message[key]).join('&');
    url += queryString;
    console.log(url);
    chrome.downloads.download({url:url,
        filename: "YoutubeDownloader/" + message.filename + '.' + message.format}, function(downID){
            chrome.downloads.show(downID);
        });
});