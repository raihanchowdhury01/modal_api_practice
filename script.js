
const card = document.getElementById("card");
const details = document.getElementById("details");
const showBtn = document.getElementById("showBtn");
const spinner = document.getElementById("spinner");
const PreLoader = document.getElementById("loader");


// preloader activities create
window.addEventListener("load", ()=>{
    PreLoader.style.display = "none";
})



const loadData = (dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools/`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools, dataLimit))
}

const displayData = (params, dataLimit) =>{
    // For clear previous all card activities
    card.textContent = " ";


    // spinner activities create
    // if(params.length === 0){
    //     spinner.classList.remove("d-none");
    // }else{
    //     spinner.classList.add("d-none");
    // }

    // for limited item shown
    if(dataLimit && params.length > 3){
        params = params.slice(0, 3);
        showBtn.classList.remove("d-none");
    }else{
        showBtn.classList.add("d-none");
    }

    


    // console.log(params);
    params.forEach(param => {

        


    const element = document.createElement("div");
    element.innerHTML = `
    <div class="card p-3" style="width: 18rem;">
                    <img src="${param?.image}" class="card-img-top" alt="...">
                    <div class="card-body space-y-5">
                        <h1 class="font-semibold text-2xl">Features</h1>
                        <div>
                            <ol class="text-gray-400">
                                <li>1. ${param?.features[0]}
                                <li>2. ${param?.features[1]}
                                <li>3. ${param?.features[2]}
                            </ol>
                        </div>
                      <hr>
                      <div class="flex justify-between items-center">
                        <div class="space-y-4">
                            <h1 class="text-xl font-semibold">${param?.name}</h1>
                            <input type="date" name="" id="">
                        </div>
                        <!-- modal button create -->
                        <div>
                            <button type="button" class="bg-orange-100 p-2 rounded-full" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-arrow-right  w-6 h-4 " onclick ="modalData('${param.id}')"></i></button>
                        </div>
                      </div>
                    </div>
                </div>    
    `;
    card.appendChild(element);
    });  
};

// show all item activities
showBtn.addEventListener("click", ()=>{
    loadData();
})
loadData(3);
// modal section design
const modal_btn = document.getElementById("modal_btn");
const modalData = (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data.data))
}


const displayModal = (data) =>{
    details.textContent = "";
    console.log(data);

    // this function create for available item display activities
    const modalFeatures = (param) => {
        // console.log(param);
        for(const p in param){
            // console.log(p.feature_name);
            for(let i = 0; i < p.length; i++){
                // console.log(p[i].feature_name);
            }
        }
        
    }

    const modalE = document.createElement("div");
    modalE.innerHTML = `
          <div class="flex justify-between gap-5">
            <div class="space-y-5 bg-orange-50 p-5 border-orange-700 border-1 rounded-xl">
              <div>
                  <h1 class="text-xl font-semibold">${data.description}</h1>
              </div>

              <div class="grid grid-cols-3 gap-5">
                <div class="text-green-500 text-center p-3 bg-white">
                    <p>${data.pricing[0].price}</p>
                    <p>${data.pricing[0].plan}</p>
                </div>
                <div class="text-orange-500 text-center p-3 bg-white">
                    <p>${data.pricing[1].price}</p>
                    <p>${data.pricing[1].plan}</p>
                </div>
                <div class="text-orange-800 text-center p-3 bg-white">
                    <p>${data.pricing[2].price}</p>
                    <p>${data.pricing[2].plan}</p>
                </div>
              </div>

              <div class="flex justify-between">
                <div>
                  <h1 class="font-bold text-xl">Features</h1>
                  <p>${modalFeatures(data.features)}</p>
                  <ul class="text-gray-500">
                    <li>${data.features[1].feature_name}</li>
                    <li>${data.features[2].feature_name}</li>
                    <li>${data.features[3].feature_name}</li>
                  </ul>
                </div>
                <div>
                  <div>
                    <h1 class="font-bold text-xl">Integrations</h1>
                    <ul class="text-gray-500">
                        <li>${data.integrations[0]}</li>
                        <li>${data.integrations[1]}</li>
                        <li>${data.integrations[2]}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-5 border-1 p-3 rounded-xl">
              <img class="border-1 rounded-xl " src="${data.image_link[0]}" alt="">
              <div class="text-center">
                <h1 class="text-xl font-semibold">${data.input_output_examples[0].input}</h1>
                <p>${data.input_output_examples[0].output}</p>
              </div>
            </div>           
          </div>
    `;
    details.appendChild(modalE);
}
