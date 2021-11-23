// selects profile overview info
const profileInfo = document.querySelector(".overview");

const username = "KirstyFolan";

const getProfileData = async function() {
    const userData = await fetch (`https://api.github.com/users/${username}`);
    const data = await userData.json();
    console.log(data); 
    displayProfileData(data);
};
getProfileData();

const displayProfileData = function(data) {
let div = document.createElement("div");
div.classList.add("user-info");
div.innerHTML = `<figure>
<img alt="user avatar" src=${data.avatar_url} />
</figure>
<div>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Bio:</strong> ${data.bio}</p>
<p><strong>Location:</strong> ${data.location}</p>
<p><strong>Number of public repos:</strong> ${data.public_repos}</p>
</div>`
profileInfo.append(div);
}