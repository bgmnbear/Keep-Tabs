function openTab(urlList, max=10) {
    len = urlList.length
    for(i=0;i<Math.min(max,len);i++){
        chrome.tabs.create({ url: urlList[i] })
    }
}

function getTab() {
    document.querySelector("#save-tab").addEventListener("click", function() {
        chrome.tabs.query({
            // active: true,
            // currentWindow: true,
        }, function(tabs) {
            let u = getTabURL(tabs)
            saveURL(u)
            showURL(u)
        })
    }, false)
}

function getTabURL(tabs) {
    let urls = []
    for (let tab of tabs) {
        urls.push(tab.url)
    }
    return urls
}

// TODO: Add url/page view
function showURL(urls) {
    // let u = urls
    var e = document.querySelector("#show-url")
    // e.innerHTML = u.toString()
    e.innerHTML = "save success"
}

function resumeTab() {
    document.querySelector("#resume-tab").addEventListener("click", function() {
        getURL("urls", openTab)
    }, false)
}

function saveURL(urls) {
    chrome.storage.sync.set({'urls': urls}, function() {
        // console.log("save success");
    });
}

function getURL(key, callback) {
    chrome.storage.sync.get('urls', function(result) {
        // console.log("result", result)
        callback(result[key])
    })
}

function test_getTab() {
    getTab()
}

function test_openTab() {
    let urls = [
        "http://www.baidu.com",
        "http://www.baidu.com",
        "http://www.baidu.com",
    ]
    openTab(urls)
    // openTab(urls, 2)
    // openTab(urls, 4)
}

function test_resumeTab() {
    resumeTab()
}

function test() {
    // successed
    // test_openTab()
    // test_getTab()
    // test_resumeTab()
    // test_saveURL()
}

function main() {
    getTab()
    resumeTab()
}

main()
