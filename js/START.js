const tackList = [
  {
    title: "Информация 1",
    chapter: "Информация",
    team: "Информация",
    link: `./Tacks/Tack1/Tack_1.html`,
  },
  {
    title: "Информация 2",
    chapter: "Информация",
    team: "Информация",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Информация 3",
    chapter: "Информация",
    team: "Обработка информации",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Информация 4",
    chapter: "Информация",
    team: "Измерение информации",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Кодирование информации 1",
    chapter: "Кодирование информации",
    team: "Кодирование текстовой информации",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Кодирование информации 2",
    chapter: "Кодирование информации",
    team: "Кодирование с помощью кодовой таблицы",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Логика и логические задачи 1",
    chapter: "Логика и логические задачи",
    team: "Решение логических задач по таблице",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Логика и логические задачи 2",
    chapter: "Логика и логические задачи",
    team: "Решение логических задач",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Информационные технологии 1",
    chapter: "Информационные технологии",
    team: "Компьютер",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Информационные технологии 2",
    chapter: "Информационные технологии",
    team: "Имя файла",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Алгоритмы и исполнители 1",
    chapter: "Алгоритмы и исполнители",
    team: "Алгоритмы и исполнители",
    link: "./Tacks/Tack1/Tack_1.html",
  },
  {
    title: "Алгоритмы и исполнители 2",
    chapter: "Алгоритмы и исполнители",
    team: "Линейные алгоритмы",
    link: "./Tacks/Tack1/Tack_1.html",
  },
];

let visibleTackList = tackList;

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

colorTeamBtn.oninput = (()=> {
	if (colorTeamBtn.checked) {
		document.body.classList.add("dark");
		colorTeam = 'dark'
		menuTasks.innerHTML = ``
		renderTask(visibleTackList)
		return
	} 
	colorTeam = 'ligth'
	menuTasks.innerHTML = ``
	renderTask(visibleTackList)
	document.body.classList.remove("dark");
})

const menuChapter = document.querySelector(".content-tack__chapters");
const menuTasks = document.querySelector(".tacks");
const selectTeam = document.querySelector(".select-team");
const select = document.querySelector("select");

const renderChapter = (chapter) => {
  menuChapter.innerHTML += `
	<button class="chapter">${chapter.chapter}</button>
`;
};

const renderTask = (tacks) => {
  tacks.forEach((item) => {
    menuTasks.innerHTML += `
		<a href="${item.link}?team=${colorTeam}" class="tack">
			<h3 class="tack__title">${item.title}</h3>
			<p class="tack__chapter">${item.chapter}</p>
			<p class="tack__team">${item.team}</p>
		</a>
`;
  });
};

const renderTeam = (team) => {
  selectTeam.innerHTML += `
	<option>${team.team}</option>
`;
};

const tackchapter = [];
let tackteam = [];

const isSelectOption = () => {
  visibleTackList.forEach((item) => {
    if (tackteam.includes(item.team)) {
      return;
    }

    renderTeam(item);
    tackteam.push(item.team);
  });
};

tackList.forEach((item) => {
  if (tackchapter.includes(item.chapter)) {
    return;
  }

  renderChapter(item);
  tackchapter.push(item.chapter);
});
isSelectOption();

renderTask(visibleTackList);

const chapter = document.querySelectorAll(".chapter");

const removeBtn = () =>
  chapter.forEach((item) => item.classList.remove("active"));

chapter.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuTasks.innerHTML = "";
    selectTeam.innerHTML = "<option>Все</option>";
    tackteam = [];
    removeBtn();
    if (btn.innerHTML == "Все") {
      visibleTackList = tackList;
      renderTask(visibleTackList);
      isSelectOption();
      btn.classList.add("active");
      return;
    }

    visibleTackList = [];
    tackteam = [];
    tackList.forEach((item) => {
      if (item.chapter == btn.innerHTML) {
        visibleTackList = [...visibleTackList, item];
      }
    });
    isSelectOption();
    renderTask(visibleTackList);
    btn.classList.add("active");
  });
});

const search = document.querySelector(".search-input");
const searchTacks = document.querySelector(".search-tacks__elements");

const renderSearchTack = (tacks) => {
  tacks.forEach((item) => {
    searchTacks.innerHTML += `
		<a href="${item.link}?team=${colorTeam}" class="search-tacks__element">
			<p class="search-tacks__element_title">${item.title}</p>
			<p class="search-tacks__element_chapter">${item.chapter}</p>
			<p class="search-tacks__element_team">${item.team}</p>
		</a>
`;
  });
};

const runSearch = (query) => {
  if (!query) {
    return null;
  }

  searchTacks.classList.remove("none");

  const lowerCaseQuery = query.toLowerCase();

  return visibleTackList.filter(
    (tack) =>
      tack.title
        .toLocaleLowerCase()
        .replaceAll(" ", "")
        .includes(lowerCaseQuery) ||
      tack.chapter
        .toLocaleLowerCase()
        .replaceAll(" ", "")
        .includes(lowerCaseQuery) ||
      tack.team.toLocaleLowerCase().replaceAll(" ", "").includes(lowerCaseQuery)
  );
};

search.addEventListener("input", (e) => {
  let query = e.target.value.replaceAll(" ", "");
  const foundTrask = runSearch(query);
  searchTacks.innerHTML = "";
  if (!query) {
    searchTacks.classList.add("none");
    return;
  }
  renderSearchTack(foundTrask);
});

select.addEventListener("change", (e) => {
  menuTasks.innerHTML = "";
  visibleTackList = tackList;
  let value = e.target.value;
  if (value === "Все") {
    renderTask(visibleTackList);
    return;
  }
  visibleTackList = [];
  tackList.forEach((item) => {
    item.team === value ? (visibleTackList = [...visibleTackList, item]) : null;
  });
  renderTask(visibleTackList);
});

const clearSearchBtn = document.querySelector(".search-tack__clear");
clearSearchBtn.addEventListener("click", () => {
  search.value = "";
  menuTasks.innerHTML = "";
  searchTacks.classList.add("none");
  renderTask(visibleTackList);
});
