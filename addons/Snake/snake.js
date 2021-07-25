chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message == 'buttonClicked'){
        chrome.tabs.create({
            active: true,
            url: './addons/Snake/snake.html'
        },null);
    };
});