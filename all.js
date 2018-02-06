javascript: new (function () {
    var ext = this; var recognized_speech = '';
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
        if (window.webkitSpeechRecognition === undefined) {
            return {
                status: 1, msg: 'Your browser does not support speech recognition. Try using Google Chrome.'
            }
        } return {
            status: 2, msg: 'Ready'
        }
    };
    var descriptor = { blocks: [['w', 'wait and recognize speech', 'recognize_speech'], ['r', 'recognized speech', 'recognized_speech'], ['b', 'speech to text enabled', 'STTenabled']] };
    ScratchExtensions.register('Speech To Text', descriptor, ext)
})(); new (function () {
    var ext = this; ext.speak_text = function (text, callback) {
        var u = new SpeechSynthesisUtterance(text.toString());
        u.onend = function (event) {
            if (typeof callback == "function") callback() 
        };
        speechSynthesis.speak(u)
    };
    ext.TTSenabled = function () {
        return window.SpeechSynthesisUtterance != undefined
    }; ext._shutdown = function () { }; ext._getStatus = function () {
        if (window.SpeechSynthesisUtterance === undefined) {
            return {status: 1, msg: 'Your browser does not support text to speech. Try using Google Chrome or Safari.' }
        } return { status: 2, msg: 'Ready' }
    };
    var descriptor = { blocks: [['w', 'speak %s', 'speak_text', 'Hello!'], ['b', 'text to speech enabled', 'TTSenabled']], };
    ScratchExtensions.register('Text to Speech', descriptor, ext) })(); new (function () {
        var ext = this; ext._shutdown = function () { };
        ext._getStatus = function () {
            return { status: 2, msg: 'Ready' } };
            ext.trueBlock = function () {return true };
            var descriptor = { blocks: [['b', 'enabled?', 'trueBlock'],] };
            ScratchExtensions.register('extension registered?', descriptor, ext) })();
