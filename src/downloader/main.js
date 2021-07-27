window.onload = function () {
    const quality = document.getElementById('quality');
    const filename = document.getElementById('filename');
    const format = document.getElementById('format');
    const downloadButton = document.getElementById("download");
    const backButton = document.getElementById("back-button");

    downloadButton.onclick = function() {
        console.log("button clicked");
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            const url = tabs[0].url;
            const message = {
                'url' : url,
                'quality' : quality.value,
                'filename' : filename.value,
                'format' : format.value
            };
            chrome.runtime.sendMessage(message);
        });
    };

    backButton.onclick = function() {
        if(confirm("Möchtest du den Converter wirklich beenden?")){
        close(window);
        break
    }};
};