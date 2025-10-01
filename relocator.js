"use strict";
(function () {
    const isBlazorPages = typeof Blazor === "object" && Blazor != null;
    const segmentCount = 1;
    let replaceUrl = `${location.protocol}//${location.hostname}${(location.port !== "" ? `:${location.port}` : "")}${location.pathname.split('/').slice(0, 1 + segmentCount).join('/')}`;
    if (!isBlazorPages) {
        replaceUrl = replaceUrl += `/?blazor-path=/${location.pathname.slice(1).split('/').slice(segmentCount).join('/')}`;
        if (location.search !== "") {
            replaceUrl = replaceUrl += "&url-params=";
            const params = new URLSearchParams(location.search);
            let index = 0;
            const count = params.size;
            for (const [key, value] of params) {
                replaceUrl += `${key}=${value}`;
                ++index;
                if (index < count) {
                    replaceUrl += "~and~";
                }
            }
        }
        if (location.hash !== "") {
            replaceUrl = replaceUrl += `&url-hash=${location.hash.replace("#", "")}`;
        }
        location.replace(replaceUrl);
    }
    else {
        if (location.search !== "") {
            const params = new URLSearchParams(location.search);
            const blazorPath = params.get("blazor-path");
            if (blazorPath != null) {
                replaceUrl += `${blazorPath}`;
            }
            const urlParams = params.get("url-params");
            if (urlParams != null) {
                replaceUrl += `?${urlParams.replaceAll("~and~", "&")}`;
            }
            const urlHash = params.get("url-hash");
            if (urlHash != null) {
                replaceUrl += `#${urlHash}`;
            }
            window.history.replaceState(null, "", replaceUrl);
        }
    }
})();
//# sourceMappingURL=relocator.js.map