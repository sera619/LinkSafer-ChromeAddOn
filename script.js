/* 
 false      check falsy  ===>  let trueOfFalse = Boolean("")
 0                 console.log(trueOfFalse)               
 ""                     FALSY VALUES
 null           -> wie Dev leere signalisiert
 undefined      -> wie JavaScript leere signalisiert 
 NaN

*/
let myLinks = [];
// let oldLinks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("button-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("button2-el");
const tabBtn = document.getElementById("button3-el");
const downloadBtn = document.getElementById("downloadBtn");
const optionButton = document.getElementById("opt-btn");
let linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));
const errMsg =
    "ERROR 3o3:\r\nTextinput is empty, cant save any value!\n\nS3R43o3";
const delMsg = "SUCESS.\nYour list is deleted.";
const noteTitle = "LinkSafer Notification";

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage;
    render(myLinks);
}

tabBtn.addEventListener("click", function (tabs) {
    // @ts-ignore
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
    });
});

function deleteList() {
    localStorage.clear();
    myLinks = [];
    render(myLinks);
}

function render(links) {
    let listItems = "";
    for (let i = 0; i < links.length; i++) {
        listItems += `<li>
        <a id='a' style="overflow: hidden" target='_blank' href='${links[i]}'><br/>
        ${links[i]}</a>            
        </li>`;
        // ****alternative zu = ulEl.innerHTML += "<li>" + myLinks[i] + "</li>";****
        /*const li = document.createElement("li");
            li.textContent = myLinks[i];
            ulEl.append(li);*/
    }
    ulEl.innerHTML = listItems;
}

function noInputErr() {
    if (!window.Notification) {
        console.log("Browser does not support notifications");
    } else {
        if (Notification.permission === "granted") {
            // notification here:
            var noteUser = new Notification("ERROR 3o3", {
                body: "Your Inputfield is empty, cant save empty value!",
                icon: "favicon-128.png",
            });
        } else {
            Notification.requestPermission()
                .then(function (p) {
                    if (p === "granted") {
                        // notification here:
                        var noteUser2 = new Notification("ERROR!", {
                            body: "Your Inputfield is empty, cant save nothing!",
                            icon: "favicon-128.png",
                        });
                    } else {
                        console.log("User blocked notifications");
                    }
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    }
}

inputBtn.addEventListener("click", function () {
    if (inputEl.innerText == "") {
        //window.alert(errMsg);
        noInputErr();
        return;
    } else {
        myLinks.push(inputEl.value);
        //console.log(myLinks);
        inputEl.value = "";
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
    }
});

// function download(filename, text) {
//     var element = document.createElement('a');
//     element.style.display = 'none';
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));

//     element.setAttribute('download', filename);
//     document.body.appendChild(element);

//     element.click();
//     document.body.removeChild(element);
// };
// filename = "Liste(LinkSafer)";

function downloadTxt(text, fileType, fileName) {
    var blob = new Blob([text], { type: fileType });
    var a = document.createElement("a");
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
        URL.revokeObjectURL(a.href);
    }, 1500);
}

function dwnFinish() {
    if (!window.Notification) {
        console.log("Browser does not support notifications");
    } else {
        if (Notification.permission === "granted") {
            // notification here:
            var noteUser4 = new Notification("SUCCSESS!", {
                body: "Your download is ready.\nCheck your download directory.",
                icon: "favicon-128.png",
            });
        } else {
            Notification.requestPermission()
                .then(function (p) {
                    if (p === "granted") {
                        // notification here:
                        var noteUser3 = new Notification("SUCCSESS!", {
                            body: "Your download is ready.\nCheck your download directory.",
                            icon: "favicon-128.png",
                        });
                    } else {
                        console.log("User blocked notifications");
                    }
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    }
}

downloadBtn.addEventListener(
    "click",
    function () {
        downloadTxt(myLinks.join("\n"), "txt/list", "liste(LinkSafer).txt");
        // download(filename, linksFromLocalStorage);
        dwnFinish();
    },
    false
);

deleteBtn.addEventListener("click", function () {
    deleteList();
});

optionButton.addEventListener("click", function () {
    chrome.runtime.openOptionsPage();
});

// ---- SNAKE GAME FUNKTIONEN UND VARIABLEN --- 
const snakeButton = document.getElementById("snake-button");


snakeButton.addEventListener("click", function () {
    // sende background-nachricht zum empfänger > background.js
    chrome.runtime.sendMessage({message: 'buttonClicked'})
});

// ---- HELP BUTTON ---- 
const helpButton = document.getElementById("help-button")
helpButton.addEventListener("click", function() {
    chrome.runtime.sendMessage({message: 'helpClicked'})
});

// ------ YT - Converter ----- 
var express = require('express');
var app = express();
var ytdl = require('ytdl-core');

app.listen('4000', function(){
	console.log("listening on 4000");
});

app.get('/download', function(req, res) {
	var link = req.query.url;
	var format = req.query.format;
	var quality = req.query.quality;

	video = ytdl(link,{
		format:format,
		quality:quality,
	});
	video.pipe(res);
});

window.onload = function() {
	var quality = document.getElementById('quality');
	var filename = document.getElementById('filename');
	var format = document.getElementById('format');
	var dButton = document.getElementById('download').addEventListener('click');
	
	dButton.onclick = function(){
		console.log("button  clicked");
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	    	var url = tabs[0].url;
	    	var message  = {
	    		'url' : url,
	    		'quality': quality.value,
	    		'filename': filename.value,
	    		'format': format.value
	    	};
	    	chrome.runtime.sendMessage(message);
		});
	};
}