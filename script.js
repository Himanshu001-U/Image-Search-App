
const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formf1 = document.querySelector("form");
const searchinput1 = document.getElementById("searchInput");
const searchimages1 = document.getElementById("searchimages");
const showmore1 = document.getElementById("showmore");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchinput1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data =  await response.json();

    if (page === 1){
        searchimages1.innerHTML = "";
    }

    const results = data.results;

    results.map((result)=> {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchimages1.appendChild(imageWrapper);
    });

    page++;

    if (page > 1){
        showmore1.style.display ="block";
    }
}

formf1.addEventListener("submit", (event)=> {
    event.preventDefault();
    page = 1;
    searchImages();
});

showmore1.addEventListener("click", () => {
    searchImages();
});