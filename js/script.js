const fromText = document.querySelector(".from-text");
toText = document.querySelector(".to-text");
selectTag = document.querySelectorAll("select");
tradnslateBtn = document.querySelector("button");
exchangeBtn = document.querySelector(".exchange");
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    //console.log(tag, id);
    for (const country_code in countries) {
        let selected;

        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
})

exchangeBtn.addEventListener("click", () => {
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
})

tradnslateBtn.addEventListener("click", () => {
    let text = fromText.value;
    tradnslateFrom = selectTag[0].value;
    tradnslateTo = selectTag[1].value;
    // console.log(text, tradnslateFrom, tradnslateTo);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${tradnslateFrom}|${tradnslateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        //console.log(data);
        toText.value = data.responseData.translatedText;
    })
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        //console.log(target);
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                //console.log("From copy icon clicked");
                navigator.clipboard.writeText(fromText.value)
            } else {
                //console.log("To copy icon clicked");
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            //console.log("Speech icon clicked");

            let utterance;
            if (target.id == "from") {
                //console.log("From copy icon clicked");
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                //console.log("To copy icon clicked");
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance)
        }
    })
})