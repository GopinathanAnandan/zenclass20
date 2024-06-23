const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const button = document.getElementById("search-btn");

//once click search button fetch the word from data.
button.addEventListener("click", async () => {
    try {
        let input = document.getElementById("inputword").value;
        let response = await fetch(`${URL}${input}`);
        let data = await response.json();

        console.log(data);

        result.innerHTML = '';

        // Create elements 
        let wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        let wordHeader = document.createElement('h4');
        wordHeader.textContent = input;
        wordDiv.appendChild(wordHeader);

        let playButton = document.createElement('button');
        playButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        playButton.addEventListener('click', () => {
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
            sound.play();
        });
        wordDiv.appendChild(playButton);

        let detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        let partOfSpeech = document.createElement('p');
        partOfSpeech.textContent = data[0].meanings[0].partOfSpeech;
        detailsDiv.appendChild(partOfSpeech);
        let phonetic = document.createElement('p');
        phonetic.textContent = `/${data[0].phonetic}/`;
        detailsDiv.appendChild(phonetic);

        let meaningParagraph = document.createElement('p');
        meaningParagraph.classList.add('word-meaning');
        meaningParagraph.textContent = data[0].meanings[0].definitions[0].definition;

        let exampleParagraph = document.createElement('p');
        exampleParagraph.classList.add('word-example');
        exampleParagraph.textContent = data[0].meanings[0].definitions[0].example || "";

        // Append all created elements to result container
        result.appendChild(wordDiv);
        result.appendChild(detailsDiv);
        result.appendChild(meaningParagraph);
        result.appendChild(exampleParagraph);

    } catch (error) {
        //error handling
        console.error('Error fetching data:', error);
        result.innerHTML = `<p class="error">word not found</p>`;
    }
});