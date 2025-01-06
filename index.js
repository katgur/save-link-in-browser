const storage = { 
    get: (key) => {
        return new Promise((res) => {
            chrome.storage.sync.get([key], function(items) {
                res(items[key]);
            });
        })
    },
    set: (key, value) => {
        chrome.storage.sync.set({ [key]: value });
    }
};

const LAST_URL_KEY = "slib_last_urls";

function extractTextFromInput(input) {
    return input.value;
}

const urlInput = document.getElementById("server-address-input");
const saveButton = document.getElementById("save-btn");

storage.get(LAST_URL_KEY).then(url => {
    urlInput.value = url || "";
});

saveButton.addEventListener("click", () => {    
    chrome.tabs.query({ active: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab) {
            alert("No active tabs");
        }
        
        const url = extractTextFromInput(urlInput);
        storage.set(LAST_URL_KEY, url);
        fetch(url, {
            method: "POST",
            body: JSON.stringify({ link: tab.url, title: extractTextFromInput(document.getElementById("title-input")) || tab.title }),
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        })
        .then(() => {
            alert('Saved link successfully');
        })
        .catch(() => {
            alert('Error while saving link');
        })
    })
})