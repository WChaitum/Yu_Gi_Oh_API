

const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=10&offset=0&sort=new'
const IMG_URL = 'https://storage.googleapis.com/ygoprodeck.com/pics/'
const SEARCH_API = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname='
const container = document.querySelector('#container')
const Card_data_container = document.querySelector('.Card-data-container')


// const animated_bgs = document.querySelectorAll('.animated-bg')
// console.log(Card_data_container);

getCards(API_URL)
async function getCards(url){
    const res = await fetch(url)
    const data = await res.json()

    // console.log(data.data[0].name);
    showCard(data.data);
    
}

function showCard (Cards){
    // console.log(Cards[0].card_images);
    container.innerHTML = ''

    Cards.forEach((CardData,idx) => {
        const{id,name,level,type,race,atk,def,attribute,archetype,desc} = CardData

        // console.log(id);
        const ShowImgCard = `${IMG_URL}${id}.jpg`
        
        const card =  document.createElement('div')
        card.classList.add('card')
        card.innerHTML=`
            <div class="img-container" onclick="toggle()">
                <img src="${ShowImgCard}" alt="">
            </div>
        `
        // console.log(ShowImgCard,id);
        container.appendChild(card)


        card.addEventListener('click',()=>{
            // console.log(id,name,level,type,race,atk,def,attribute,archetype,desc)
            Card_data_container.innerHTML = ''
            const ShowData =  document.createElement('div')
            ShowData.classList.add('card_data')
            ShowData.classList.add('active')
            ShowData.innerHTML=`
            <i class="fa-solid fa-xmark" onclick="toggle()"></i>
            <div class="img">
            <img src="https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg" alt="">
        </div>
        <div class="content">
            <h1>${name}</h1><div class="icon"><img src="https://ygoprodeck.com/pics/icons/race/${race}.png" alt=""><img src="https://ygoprodeck.com/pics/${attribute}.jpg" alt=""></div><hr>
            <strong>'${race}' '${type}'</strong>
            <p>${desc}
            <br></p><strong>Archetype:${archetype}</strong><br>
            <strong>ATK:${atk} DEF:${def}</strong>
        </div>
        `
        const margin_top = window.pageYOffset
        // console.log(margin_top)

        Card_data_container.style.marginTop = `${margin_top}px`;
        Card_data_container.appendChild(ShowData)
        })

})
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const searchTerm = search.value
    if(searchTerm && searchTerm !== ''){
        getCards(SEARCH_API + searchTerm)
        container.innerHTML = ''
        search.value = ''
        Card_data_container.innerHTML=''
        container.classList.remove('active')
        
    }else{
        window.location.reload()
    }
})
function toggle(){
    container.classList.toggle('active')
    Card_data_container.innerHTML = ''
}

