const colorTeamBtn = document.querySelector(".color-team");

let teamUrl = new URL(document.location).searchParams;
let team = teamUrl.get("team");

let colorTeam = team

if (team == 'dark') {
	colorTeamBtn.checked = true
	document.body.classList.add("dark");
} else {
	document.body.classList.remove("dark");
}

const pervBtn = document.querySelector(".tack__nav");
const pervBtnOld = pervBtn.innerHTML

const renderHomeBtn = (teamColor) => {
	pervBtn.innerHTML = pervBtnOld
	pervBtn.innerHTML += `<a href="../../START.html?team=${teamColor}" class="home-btn">На главную</a>`;
}
renderHomeBtn(colorTeam)

colorTeamBtn.oninput = (()=> {
	if (colorTeamBtn.checked) {
		document.body.classList.add("dark");
		colorTeam = 'dark'
		renderHomeBtn(colorTeam)
		return
	} 
	colorTeam = 'ligth'
	renderHomeBtn(colorTeam)
	document.body.classList.remove("dark");
})