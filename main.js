// ==UserScript==
// @name         Merge Bot
// @namespace    http://none.none/none.none
// @version      1.0
// @description  Messy merge calculation script bot
// @author       TheRealLemon
// @match        https://www.reddit.com/robin*
// @include      https://monstrouspeace.com/robintracker/json.php
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {

    'use strict';
    var websocket;
    var wsUri = r.config.robin_websocket_url;

    websocket = new WebSocket(wsUri);
    websocket.onmessage = function(evt) {onMessage(evt); };

    function onMessage(evt){
        //recieved a message
        var jsonObject = JSON.parse(evt.data);
        //console.log(jsonObject);
        if (jsonObject.type == "chat") {
            //recieved message is a chat message, compare contents
            var msg = jsonObject.payload.body;
            var from = jsonObject.payload.from;
            var result;
            var tracker;
            var tierroom;
            var tierlower = 0;
            var winner = 0;
            var collectedguid = '4e7360f0-fbaf-11e5-905a-0e31fc1b0d95';
            var highestbelow = 0;
            var checknumber;

            if(msg.includes("!!merge")) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://monstrouspeace.com/robintracker/json.php",
                    headers:    {"Content-Type": "application/json"},
                    onload: function (response) {
                        if (response.status == 200) {
                            console.log(JSON.parse(response.responseText));
                            tracker = JSON.parse(response.responseText);
                            for (i=0; i < tracker.length; i++) {
                                if(tracker[i].guid == '4e7360f0-fbaf-11e5-905a-0e31fc1b0d95') {
                                    tierroom = parseInt(tracker[i].tier);
                                    console.log(tierroom);
                                    break;
                                }
                            }
                            for (i=0; i < tracker.length; i++) {
                                checknumber = 1;
                                if(tracker[i].tier === tierroom && tracker[i].guid != collectedguid) {
                                    console.log(tracker[i]);
                                    result = "[BOT] We will merge within 30-45 minutes. There is another room that is tier " + tierroom + ".";
                                    console.log("1: " + result);
                                    winner = 1;
                                    break;
                                }
                            }
                            if (winner === 0) {
                                checknumber = 2;
                                for (i=0; i<tracker.length; i++) {
                                    if(tracker[i].tier == (tierroom - 1) && tracker[i].guid != collectedguid) {
                                        tierlower = tierlower + 1;
                                        if (tierlower >= 2){
                                            result = "[BOT] We will merge within 1:00-1:30 hours.";
                                            console.log("2: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 3;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tierlower >= 4){
                                            result = "[BOT] We will merge in within 1:30-2:15 hours.";
                                            console.log("3: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 4;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tierlower >= 8){
                                            result = "[BOT] We will merge in within 2:00-3:00 hours.";
                                            console.log("4: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 5;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tierlower >= 16){
                                            result = "[BOT] We will merge within 2:30-3:45 hours.";
                                            console.log("5: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 6;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tierlower >= 32){
                                            result = "[BOT] We will merge within 3:00-4:30 hours.";
                                            console.log("6: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 7;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) || (tracker[i].tier == (tierroom - 6)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 6)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 32;
                                        }
                                        if (tierlower >= 64){
                                            result = "[BOT] We will merge within 3:30-5:15 hours.";
                                            console.log("6: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 8;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) || (tracker[i].tier == (tierroom - 6)) || (tracker[i].tier == (tierroom - 7)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 7)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 6)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 32;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 64;
                                        }
                                        if (tierlower >= 128){
                                            result = "[BOT] We will merge within 4:00-6:00 hours.";
                                            console.log("6: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 9;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) || (tracker[i].tier == (tierroom - 6)) || (tracker[i].tier == (tierroom - 7)) || (tracker[i].tier == (tierroom - 8)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 8)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 7)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 6)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 32;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 64;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 128;
                                        }
                                        if (tierlower >= 256){
                                            result = "[BOT] We will merge within 4:30-6:45 hours.";
                                            console.log("7: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 10;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) || (tracker[i].tier == (tierroom - 6)) || (tracker[i].tier == (tierroom - 7)) || (tracker[i].tier == (tierroom - 8)) || (tracker[i].tier == (tierroom - 9)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 9)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 8)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 7)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 6)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 32;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 64;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 128;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 256;
                                        }
                                        if (tierlower >= 512){
                                            result = "[BOT] We will merge within 5:00-7:30 hours.";
                                            console.log("8: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 11;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) || (tracker[i].tier == (tierroom - 6)) || (tracker[i].tier == (tierroom - 7)) || (tracker[i].tier == (tierroom - 8)) || (tracker[i].tier == (tierroom - 9)) || (tracker[i].tier == (tierroom - 10)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 10)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 9)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 8)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 7)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 6)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 32;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 64;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 128;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 256;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 512;
                                        }
                                        if (tierlower >= 1024){
                                            result = "[BOT] We will merge within 5:30-8:15 hours.";
                                            console.log("9: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 12;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) || (tracker[i].tier == (tierroom - 6)) || (tracker[i].tier == (tierroom - 7)) || (tracker[i].tier == (tierroom - 8)) || (tracker[i].tier == (tierroom - 9)) || (tracker[i].tier == (tierroom - 10)) || (tracker[i].tier == (tierroom - 11)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 11)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 10)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 9)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 8)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 7)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tracker[i].tier == (tierroom - 6)) {
                                            tierlower = tierlower + 32;
                                        }
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 64;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 128;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 256;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 512;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 1024;
                                        }
                                        if (tierlower >= 2048){
                                            result = "[BOT] We will merge within 6:00-9:00 hours.";
                                            console.log("10: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 13;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) || (tracker[i].tier == (tierroom - 6)) || (tracker[i].tier == (tierroom - 7)) || (tracker[i].tier == (tierroom - 8)) || (tracker[i].tier == (tierroom - 9)) || (tracker[i].tier == (tierroom - 10)) || (tracker[i].tier == (tierroom - 11)) || (tracker[i].tier == (tierroom - 12)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 12)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 11)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 10)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 9)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 8)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tracker[i].tier == (tierroom - 7)) {
                                            tierlower = tierlower + 32;
                                        }
                                        if (tracker[i].tier == (tierroom - 6)) {
                                            tierlower = tierlower + 64;
                                        }
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 128;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 256;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 512;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 1024;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 2048;
                                        }
                                        if (tierlower >= 4096){
                                            result = "[BOT] We will merge within 6:30-9:45 hours.";
                                            console.log("11: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0) {
                                checknumber = 14;
                                for (i=0; i<tracker.length; i++) {
                                    if((tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 2)) || (tracker[i].tier == (tierroom - 3)) || (tracker[i].tier == (tierroom - 4)) || (tracker[i].tier == (tierroom - 5)) || (tracker[i].tier == (tierroom - 6)) || (tracker[i].tier == (tierroom - 7)) || (tracker[i].tier == (tierroom - 8)) || (tracker[i].tier == (tierroom - 9)) || (tracker[i].tier == (tierroom - 10)) || (tracker[i].tier == (tierroom - 11)) || (tracker[i].tier == (tierroom - 12)) || (tracker[i].tier == (tierroom - 13)) && tracker[i].guid != collectedguid) {
                                        if (tracker[i].tier == (tierroom - 13)) {
                                            tierlower = tierlower + 1;
                                        }
                                        if (tracker[i].tier == (tierroom - 12)) {
                                            tierlower = tierlower + 2;
                                        }
                                        if (tracker[i].tier == (tierroom - 11)) {
                                            tierlower = tierlower + 4;
                                        }
                                        if (tracker[i].tier == (tierroom - 10)) {
                                            tierlower = tierlower + 8;
                                        }
                                        if (tracker[i].tier == (tierroom - 9)) {
                                            tierlower = tierlower + 16;
                                        }
                                        if (tracker[i].tier == (tierroom - 8)) {
                                            tierlower = tierlower + 32;
                                        }
                                        if (tracker[i].tier == (tierroom - 7)) {
                                            tierlower = tierlower + 64;
                                        }
                                        if (tracker[i].tier == (tierroom - 6)) {
                                            tierlower = tierlower + 128;
                                        }
                                        if (tracker[i].tier == (tierroom - 5)) {
                                            tierlower = tierlower + 256;
                                        }
                                        if (tracker[i].tier == (tierroom - 4)) {
                                            tierlower = tierlower + 512;
                                        }
                                        if (tracker[i].tier == (tierroom - 3)) {
                                            tierlower = tierlower + 1024;
                                        }
                                        if (tracker[i].tier == (tierroom - 2)) {
                                            tierlower = tierlower + 2048;
                                        }
                                        if (tracker[i].tier == (tierroom - 1)) {
                                            tierlower = tierlower + 4096;
                                        }
                                        if (tierlower >= 8192){
                                            result = "[BOT] We will merge within 7:00-10:30 hours.";
                                            console.log("12: " + result);
                                            winner = 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (winner === 0){
                                for (i=0; i<tracker.length; i++) {
                                    if(highestbelow < parseInt(tracker[i].tier) && tracker[i].tier != "?" && parseInt(tracker[i].tier) < parseInt(tierroom)){
                                        highestbelow = parseInt(tracker[i].tier);
                                    }
                                }
                                result = "[BOT] We are not nearly close to merging. The higest tier below us is "+highestbelow;
                                console.log("7: " + result);
                            }
                            console.log("End result: " + result);
                            console.log("End tierlower: " + tierlower);
                            console.log("Checknumber: " + checknumber);

                            if (typeof result != 'undefined'){
                                sendMessage("$ " + result);  
                            }
                        }
                    }
                });
            }
        }
    }

    function sendMessage(message) {
        $("#robinSendMessage > input[type='text']").val("");
        $("#robinSendMessage > input[type='text']").val(message);
        $("#robinSendMessage > input[type='submit']").click();
    }

})();