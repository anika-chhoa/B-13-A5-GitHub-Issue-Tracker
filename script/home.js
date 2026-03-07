const buttonArr = ["all", "open", "close"];
const btnActive = ["btn-primary", "text-white"];
const btnInactive = ["bg-white", "text-slate-500", "border-[#e4e4e7FF]"];
const cardContainer = document.getElementById("card-container");

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

const labels=(arr)=>{
    const label=arr.map(label=>`<div class="p-2 text-[#ef4444FF] text-xs font-medium bg-[#feecec] border border-[#fecacaFF] rounded-[100px] inline-flex justify-center items-center gap-1">
                            <i class="fa-solid fa-bug"></i>
                            <p>${label}</p>
                        </div>`).join(" ");
    return label;                    
}

const allCards = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const json = await res.json();
  displayAll(json.data);
};

const displayAll = (cards) => {
  cardContainer.innerHTML = "";

  const formatDate=(isoDate)=>{
    const date=new Date(isoDate);
    const formatted = date.toLocaleDateString('en-GB');
    return formatted;
  }
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = "card border border-[#e4e4e7FF] rounded-md shadow-md";
    div.innerHTML = `
        <div class="card-top p-4">
                        <div class="flex justify-between items-center mb-3">
                        <div class="status-icon flex justify-center items-center w-6 h-6">
                            ${card.status === "open" ? `<img src="../assets/Open-Status.png" alt=""></img>` : `<img src="../assets/Closed- Status .png" alt="">`}
                            
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
                <div class="card-bottom p-4">
                    <h3 class="text-slate-500 text-xs mb-2">#${card.id} by ${card.author}</h3>
                    <h3 class="text-slate-500 text-xs">${formatDate(card.createdAt)}</h3>
                </div>
        `;
    cardContainer.appendChild(div);
  });
};
allCards();
