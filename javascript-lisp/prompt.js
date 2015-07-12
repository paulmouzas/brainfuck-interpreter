var textConsole = document.getElementById('prompt');

textConsole.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        var program = textConsole.value;
        alert(run(program));
        // prevents from adding a newline
        event.preventDefault();
    }
}, true);
