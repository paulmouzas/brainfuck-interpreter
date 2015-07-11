var textConsole = document.getElementById('prompt');

textConsole.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        var program = textConsole.value;
        var tokens = tokenize(program);
        var expr = readFromTokens(tokens);
        var result = eval_(expr, env);
        alert(result);
    }
}, true);
