const buttonArr=['all', 'open', 'close'];
const btnActive=["btn-primary","text-white"];
const btnInactive=["bg-white","text-slate-500", "border-[#e4e4e7FF]"]

const toggleBtn=(tab)=>{

    buttonArr.forEach(btn=>{
        const buttonName=document.getElementById("btn-"+btn)
        if(tab===btn){
            buttonName.classList.remove(...btnInactive);
            buttonName.classList.add(...btnActive);
        }else{
            buttonName.classList.add(...btnInactive);
            buttonName.classList.remove(...btnActive);
        }
    })
}

