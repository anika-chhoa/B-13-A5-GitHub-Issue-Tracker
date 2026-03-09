const buttonArr = ["all", "open", "close"];
const btnActive = ["btn-primary", "text-white"];
const btnInactive = ["bg-white", "text-slate-500", "border-[#e4e4e7FF]"];
const cardContainer = document.getElementById("card-container");
const issueCount = document.getElementById("issue-count");
const cardInfo = document.getElementById("card-info");
const loadContainer = document.getElementById("load-container");

let data = [];

const toggleBtn = (tab) => {
  buttonArr.forEach((btn) => {
    const buttonName = document.getElementById("btn-" + btn);
    if (tab === btn) {
      buttonName.classList.remove(...btnInactive);
      buttonName.classList.add(...btnActive);
    } else {
      buttonName.classList.add(...btnInactive);
      buttonName.classList.remove(...btnActive);
    }
  });

  if (tab === "all") {
    display(data);
    issueCount.innerText = data.length;
  } else if (tab === "open") {
    display(data.filter((card) => card.status === "open"));
    issueCount.innerText = data.filter((card) => card.status === "open").length;
  } else {
    display(data.filter((card) => card.status === "closed"));
    issueCount.innerText = data.filter(
      (card) => card.status === "closed",
    ).length;
  }
};

const addLoadSpinner = (load) => {
  if (load) {
    loadContainer.classList.remove("hidden");
    cardContainer.classList.add("hidden");
  } else {
    loadContainer.classList.add("hidden");
    cardContainer.classList.remove("hidden");
  }
};

const displayPriority = (priority) => {
  if (priority === "high") {
    return `<span class="text-[#ef4444FF] bg-[#feececFF] w-20 p-2 text-xs font-medium rounded-[100px] flex justify-center items-center">HIGH</span>`;
  } else if (priority === "medium") {
    return `<span class="text-[#f59e0bFF] bg-[#fff6d1FF] w-20 p-2 text-xs font-medium rounded-[100px] flex justify-center items-center">MEDIUM</span>`;
  } else {
    return `<span class="text-[#9ca3afFF] bg-[#eeeff2FF] w-20 p-2 text-xs font-medium rounded-[100px] flex justify-center items-center">LOW</span>`;
  }
};

// const labels=(arr)=>{
//     const label=arr.map(label=>`<div class="p-2 text-black text-xs font-medium bg-yellow-400 border border-yellow-500 rounded-[100px] inline-flex justify-center items-center gap-1">
//                             <p>${label}</p>
//                         </div>`).join(" ");
//     return label;
// }

const labels = (arr) => {
  const labelInfo = {
    bug: {
      color: "#ef4444",
      bg: "#feecec",
      border: "#fecaca",
      icon: `<i class="fa-solid fa-bug"></i>`,
    },
    "help wanted": {
      color: "#d97706",
      bg: "#fff8db",
      border: "#fde68a",
      icon: `<i class="fa-solid fa-life-ring"></i>`,
    },
    enhancement: {
      color: "#16a34a",
      bg: "#dcfce7",
      border: "#86efac",
      icon: `<i class="fa-solid fa-star"></i>`,
    },
    "good first issue": {
      color: "#2563eb",
      bg: "#dbeafe",
      border: "#93c5fd",
      icon: `<i class="fa-solid fa-ranking-star"></i>`,
    },
    documentation: {
      color: "#6b7280",
      bg: "#f3f4f6",
      border: "#d1d5db",
      icon: `<i class="fa-solid fa-file"></i>`,
    },
  };

  return arr
    .map((label) => {
      const style = labelInfo[label.toLowerCase()];
      return `<div class="p-2 text-xs font-medium rounded-[100px] inline-flex justify-center items-center gap-1"
                style="color: ${style.color}; background-color: ${style.bg}; border: 1px solid ${style.border}">
                ${style.icon}
                <p>${label}</p>
            </div>`;
    })
    .join(" ");
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString("en-GB");
  return formatted;
};

const cardDetails = async (id) => {
  addLoadSpinner(true);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const json = await res.json();
  displayDetails(json.data);
  addLoadSpinner(false);
  document.getElementById("card-details").showModal();
};
const displayDetails = (card) => {
  cardInfo.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card-info-container">
          <dialog id="card-details" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box p-3 md:p-8">
              <h3 class="text-2xl font-bold mb-2">${card.title}</h3>
              <ul class="flex gap-2 mb-6">
                <li class="badge badge-success text-white font-medium border rounded-[100px]">${card.status}</li>
                <li class="text-slate-600 flex justify-center items-center gap-2">
                    <div class="bg-slate-600 w-1 h-1 rounded-full"></div>
                    <p>Opened by ${card.author}</p>
                </li>
                <li class="text-slate-600 flex justify-center items-center gap-2">
                    <div class="bg-slate-600 w-1 h-1 rounded-full"></div>
                    <p>${formatDate(card.createdAt)}</p>
                </li>
              </ul>
              <div class="flex gap-1 mb-6">${labels(card.labels)}</div>
              <p class="text-slate-600 mb-7">${card.description}</p>
              <div class="bg-[#f8fafcFF] rounded-l-lg p-4 grid grid-cols-2">
                <div class="col-span-1">
                  <p class="text-slate-600">Assignee:</p>
                  <p class="text-[#1f2937FF] font-semibold">${card.assignee ? card.assignee : "Unassigned"}</p>
                </div>
                <div class="col-span-1">
                  <p class="text-slate-600">Priority:</p>
                  <p>${displayPriority(card.priority)}</p>
                </div>
              </div>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn btn-primary hover:text-white">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
  `;
  cardInfo.appendChild(div);
};

const allCards = async () => {
  addLoadSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const json = await res.json();
  data = json.data;
  display(data);
  addLoadSpinner(false);
  issueCount.innerText = json.data.length;
};

const display = (cards) => {
  cardContainer.innerHTML = "";
  issueCount.innerText = "";

  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = `card border border border-[#e4e4e7FF] hover:scale-102 transition ${card.status === "open" ? "border-4 border-t-green-500" : "border-4 border-t-violet-500"} rounded-md shadow-md`;
    div.addEventListener("click", () => {
      cardDetails(card.id);
    });
    div.innerHTML = `
        <div class="card-top p-4 h-full">
                        <div class="flex justify-between items-center mb-3">
                        <div class="status-icon flex justify-center items-center w-6 h-6">
                            ${card.status === "open" ? `<img src="assets/open-status.png" alt=""></img>` : `<img src="assets/closed-status.png" alt="">`}
                            
                        </div>
                        
                        <span>${displayPriority(card.priority)}</span>
                        
                        </div>

                    <h2 class="text-[#1f2937FF] text-sm font-semibold mb-2">${card.title}</h2>
                    <h3 class="text-slate-500 text-xs mb-3 line-clamp-2">${card.description}</h3>
                    <div class="flex gap-1">
                        ${labels(card.labels)}
                        
                    </div>
                </div>
                <hr class="my-2 border-t border-slate-200"/>
                <div class="card-bottom p-4 space-y-2">
                    <div class="flex justify-between">
                    <h3 class="text-slate-500 text-xs mb-2">#${card.id} by ${card.author}</h3>
                    <h3 class="text-slate-500 text-xs">${formatDate(card.createdAt)}</h3>
                    </div>
                    <div class="flex justify-between">
                    <h3 class="text-slate-500 text-xs mb-2">Assignee: ${card.assignee ? card.assignee : "Unassigned"}</h3>
                    <h3 class="text-slate-500 text-xs">${formatDate(card.updatedAt)}</h3>
                    </div>
                </div>
        `;
    cardContainer.appendChild(div);
  });
};
allCards();

// document.getElementById("search").addEventListener("click",()=>{
//   const input = document.getElementById("search");
//   const searchValue=input.value.trim().toLowerCase();
//   fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
//   .then(res=>res.json())
//   .then(json=>{
//     const searchCards=json.data;
//     console.log(allWords)
//     const filterCards=allWords.filter(word=>word.word.toLowerCase().includes(searchValue));
//     displayWords(filterWords);
//   })
// })
document.getElementById("search").addEventListener("input", async () => {
  const input = document.getElementById("search");
  const searchValue = input.value.trim().toLowerCase();

  let url;

  if (searchValue === "") {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  } else {
    url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
  }
  const res = await fetch(url);
  const json = await res.json();
  const searchCards = json.data;

  display(searchCards);
  issueCount.innerText = searchCards.length;
});
