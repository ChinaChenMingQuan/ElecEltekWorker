"use strict";
(function () {
    var checker = (function () {
        var isBlazorPages = typeof Blazor === "object" && Blazor != null;
        var isSupportConsole = typeof console === "object" && console != null;
        var isSupportConsoleLog = isSupportConsole && typeof console.log === "function";
        var isSupportDocument = typeof document === "object" && console != null;
        var isSupportDocumentCreateElement = isSupportDocument && typeof document.createElement === "function";
        var isSupportDocumentGetElementById = isSupportDocument && typeof document.getElementById === "function";
        var isSupportDocumentBody = isSupportDocument && typeof document.body === "object" && document.body != null;
        var isSupportHTMLParagraphElement = typeof HTMLParagraphElement === "function";
        var isSupportHTMLElement = typeof HTMLElement === "function";
        var isSupportHTMLElementInnerText = (function () {
            if (!isSupportDocument ||
                !isSupportDocumentCreateElement ||
                !isSupportHTMLElement) {
                return false;
            }
            var element = document.createElement("div");
            element.innerText = "test";
            return typeof element.innerText === "string" && element.innerText === "test";
        })();
        var isSupportHTMLElementAppendChild = (function () {
            if (!isSupportHTMLElement ||
                !isSupportDocument ||
                !isSupportDocumentCreateElement ||
                !isSupportHTMLElement) {
                return false;
            }
            var element = document.createElement("div");
            return typeof element.appendChild === "function";
        })();
        return {
            isBlazorPages,
            isSupportConsole,
            isSupportConsoleLog,
            isSupportDocument,
            isSupportDocumentCreateElement,
            isSupportDocumentGetElementById,
            isSupportDocumentBody,
            isSupportHTMLParagraphElement,
            isSupportHTMLElement,
            isSupportHTMLElementInnerText,
            isSupportHTMLElementAppendChild,
        };
    })();
    var printer = (function () {
        function write(message) {
            if (checker.isSupportDocument &&
                checker.isSupportDocumentCreateElement &&
                checker.isSupportDocumentGetElementById &&
                checker.isSupportHTMLElement &&
                checker.isSupportHTMLElementInnerText &&
                checker.isSupportHTMLElementAppendChild &&
                checker.isSupportHTMLParagraphElement) {
                var app = document.getElementById("app");
                if (app != null) {
                    var line = document.createElement("p");
                    line.innerText = message;
                    app.appendChild(line);
                }
            }
            if (checker.isSupportConsole &&
                checker.isSupportConsoleLog) {
                console.log(message);
            }
        }
        return { write };
    })();
    for (var isSupported in checker) {
        if (!(checker[isSupported])) {
            printer.write(isSupported + "当前环境不支持最新特征!");
            return;
        }
    }
    var relocatorScript = document.createElement("script");
    relocatorScript.src = "relocator.js";
    document.body.appendChild(relocatorScript);
    if (checker.isBlazorPages) {
        var mainScript = document.createElement("script");
        mainScript.src = "main.js";
        mainScript.type = "module";
        document.body.appendChild(mainScript);
    }
})();
//# sourceMappingURL=launcher.js.map
