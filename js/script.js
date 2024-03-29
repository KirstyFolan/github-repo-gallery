// selects profile overview info
const profileInfo = document.querySelector(".overview");

const username = "KirstyFolan";

const allRepoInfo = document.querySelector(".repos");

const individualRepoData = document.querySelector(".repo-data");

//selects the unordered list of repos
const repoList = document.querySelector(".repo-list");

const backToGallery = document.querySelector(".view-repos");

// selects the search input
const filterInput = document.querySelector(".filter-repos");

const getProfileData = async function() {
    const userData = await fetch (`https://api.github.com/users/${username}`);
    const data = await userData.json();
    //console.log(data); 
    displayProfileData(data);
};
getProfileData();

const displayProfileData = function(data) {
const div = document.createElement("div");
div.classList.add("user-info");
div.innerHTML = `<figure>
<img alt="user avatar" src=${data.avatar_url} />
</figure>
<div>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Bio:</strong> ${data.bio}</p>
<p><strong>Location:</strong> ${data.location}</p>
<p><strong>Number of public repos:</strong> ${data.public_repos}</p>
</div>`;
profileInfo.append(div);
getRepos();
};

const getRepos = async function() {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    displayRepos(repoData);

};

const displayRepos = function(repos){
    filterInput.classList.remove("hide");
for(const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
}
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    };

});

const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    //console.log(repoData);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
//console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);

};

const displayRepoInfo = function(repoInfo, languages) {
individualRepoData.innerHTML = "";
individualRepoData.classList.remove("hide");
allRepoInfo.classList.add("hide");
backToGallery.classList.remove("hide");
const div = document.createElement("div");
div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  individualRepoData.append(div);
};

// back to gallery button
backToGallery.addEventListener("click", function(){
    allRepoInfo.classList.remove("hide");
    individualRepoData.classList.add("hide");
    backToGallery.classList.add("hide");
});

//dynamic search
filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const lowerCaseSearch = searchText.toLowerCase();
    for (const repo of repos) {
        const searchResult = repo.innerText.toLowerCase();
        if(searchResult.includes(lowerCaseSearch)) {
            repo.classList.remove("hide");
        } else {
                repo.classList.add("hide");
            }
        }

});