chrome.devtools.panels.create(
    "CoffeeRepl",
    "badge.png",
    "coffee-repl.html",
    function(panel) {
        panel.onShown.addListener(function(win){ win.focus(); });
    }
);