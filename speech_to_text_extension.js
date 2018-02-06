javascript: new (function () {
    var ext = this; var recognized_speech = ''; var speaker = window.speechSynthesis;
    ext.recognize_speech = function (callback) {
        var recognition = new webkitSpeechRecognition();
        recognition.onresult = function (event) {
            if (event.results.length > 0) {
                recognized_speech = event.results[0][0].transcript;
                if (typeof callback == "function") callback()
            }
        };
        recognition.start()
    };
    ext.recognized_speech = function () {
        return recognized_speech
    }; ext.STTenabled = function () {
        return window.webkitSpeechRecognition != undefined
    }; ext._shutdown = function () { };
    ext._getStatus = function () {
        return {
            status: 2, msg: 'Ready'
        }
    };
    ext.getVoices = function() {
        return speaker.getVoices()
    };
    ext.setVoice = function(voice) {
        //speaker.voice = voice;
    };
    ext.speak_text = function (text, callback) {
        speaker.onend = function (event) {
            if (typeof callback == "function") callback() 
        };
        speaker.speak(text.toString());
    };
    ext.TTSenabled = function () {
        return window.SpeechSynthesisUtterance != undefined
    }; ext._shutdown = function () { }; ext._getStatus = function () {
        if (window.SpeechSynthesisUtterance === undefined) {
            return {status: 1, msg: 'Your browser does not support text to speech. Try using Google Chrome or Safari.' }
        } return { status: 2, msg: 'Ready' }
    };
    var descriptor = { blocks: [['w', 'wait and recognize speech', 'recognize_speech'], ['r', 'recognized speech', 'recognized_speech'], ['b', 'speech to text enabled', 'STTenabled'], ['w', 'speak %s', 'speak_text', 'Hello!'], ['b', 'text to speech enabled', 'TTSenabled'], [' ', 'set voice to ', 'setVoice']]/*, menus:{speechChoices:getVoices()}*/ };
    ScratchExtensions.register('OneExt', descriptor, ext)
})();
