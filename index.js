function extractTextFromInput(input) {
    return input.value;
}

const saveButton = document.getElementById("save-btn");
saveButton.addEventListener("click", () => {    
    chrome.tabs.query({ active: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab) {
            alert("No active tabs");
        }
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(`${extractTextFromInput(document.getElementById("server-address-input"))}`, {
            method: "POST",
            body: JSON.stringify({ link: tab.url }),
            headers: myHeaders,
        })
        .then(() => {
            alert('Saved link uccessfully');
        })
        .catch(() => {
            alert('Error while saving link');
        })
    })
})