
const phoneData =async ()=>{
    displayPage('spinner','block');
    displayPage('home-page','none');
    displayPage('phone-dp','none')
    displayPage('details','none')
    const inputText = document.getElementById('input-field');
    const searchValue = inputText.value;
    inputText.value='';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    
    displayPhone(data.data)
    
    console.log(data.data.length)
}

const displayPage = (id,displayItem) =>{
    document.getElementById(id).style.display=displayItem;
}

const displayPhone = (data) =>{
    
    const divField = document.getElementById('phone-display');
    divField.textContent='';
    data.forEach( info =>{
        
        const div = document.createElement('div');
        div.innerHTML=`  <div class="card mx-auto" style="width: 22rem; ">
        <img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2 class="card-title">${info.brand}</h2>
          <h4 class="card-title">${info.phone_name}</h4>
          <button  onclick="phoneDetails('${info.slug}')" class="btn btn-outline-info" type="button" >Details</button>
          </div>
        </div>
      </div>`
     
      divField.appendChild(div);
    })
    displayPage('spinner','none');
    displayPage('phone-dp','block')
    
    

}


const phoneDetails =async (id) =>{
    displayPage('details','block')
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
showDetails(data.data)
  }

 const showDetails = (info) =>{
  const {storage,displaySize,sensors}=info.mainFeatures;

    const divField = document.getElementById('details');
    const div = document.createElement('div')
    div.innerHTML=`<div class="card mx-auto mt-5  text-light" style="width: 35rem; ">
    <img src="${info.image}" class="card-img-top"  alt="...">
    <div class="card-body bg-dark w-100">
    <h3>${info.name}</h3>
    <p class="card-text">Storage: ${storage}</p>
    <p class="card-text">Display: ${displaySize}</p>
    <p class="card-text">Sensors: ${sensors}</p>
    <p class="card-text">Released Date: ${info.releaseDate?info.releaseDate : 'No Release Date'}</p>
    </div>
  </div>`
 divField.appendChild(div);
 displayPage('phone-dp','none')
    
} 

