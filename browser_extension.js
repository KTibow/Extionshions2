// Scratch Extension to demonstrate some simple web browser functionality
// 2014 Shane M. Clements

(function(ext) {
    ext.alert = function(message) {
        alert(message);
    };

    ext.confirm = function(question) {
        return confirm(question);
    };

    ext.ask = function(question) {
        return prompt(question);
    };

    ext.setTitle = function(title) {
        window.document.title = title;
    };

    ext.openTab = function(location) {
        window.open(location, '_blank');
    };
    
        var recognized_speech = '';

    ext.recognize_speech = function (callback) {
        var recognition = new webkitSpeechRecognition();
        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                recognized_speech = event.results[0][0].transcript;
                if (typeof callback=="function") callback();
            }
        };
        recognition.start();
    };

    ext.recognized_speech = function () {return recognized_speech;};

    ext._shutdown = function() {
        console.log('Shutting down...');
    };

    ext._getStatus = function() {
        } else {
            return {status: 2, msg: 'Ready'};
        }
    };

    var descriptor = {
        blocks: [
            [' ', 'alert %s', 'alert', ''],
            ['b', 'confirm %s', 'confirm', 'Are you sure?'],
            ['r', 'ask %s', 'ask', 'How are you?'],
            [' ', 'set window title to %s', 'setTitle', 'title'],
            [' ', 'open tab with %s', 'openTab', 'https://twitter.com/scratchteam'],
            ['w', 'wait and recognize speech', 'recognize_speech'],
            ['r', 'recognized speech', 'recognized_speech']
        ]
    };

    ScratchExtensions.register('Browser Stuff', descriptor, ext);
})({});

