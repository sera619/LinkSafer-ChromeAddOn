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
// ---- SNAKE GAME ----


