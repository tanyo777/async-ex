async function solution() {
    const url = "http://localhost:3030/jsonstore/advanced/articles/list";
    const articles = await fetch(url);
    const articlesJson = await articles.json();
    const keys = Object.keys(articlesJson);
    const main = document.getElementById('main');
    for(let key of keys) {
        let {title, _id} = articlesJson[key];

        // accordion
        const accordion = document.createElement("div");
        accordion.classList.add('accordion');

        // head
        const head = document.createElement('div');
        head.classList.add('head');


        // span

        const span = document.createElement("span");
        span.textContent = title;

        // button
        const button = document.createElement('button');
        button.classList.add('button');
        button.id = _id;
        button.textContent = "More";
        button.addEventListener('click', async () => {

            const extraText = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${_id}`);
            const extraTextJson = await extraText.json();
            const content = extraTextJson.content;
            if(button.textContent === "More") {
                par.textContent = content;
                button.textContent = "Hide";
                extra.style = "display: block";
            } else {
                button.textContent = "More";
                extra.style = "display: none";
            }
        })

        head.appendChild(span);
        head.appendChild(button);


        // extra 
        const extra = document.createElement("div");
        extra.classList.add('extra');
        extra.style = "display: none";
        // paragraph
        const par = document.createElement('p');
        extra.appendChild(par);

        accordion.appendChild(head);
        accordion.appendChild(extra);

        main.appendChild(accordion);


    }
}

solution();