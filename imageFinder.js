const apiKey = 'ze7-2-uhfXlvZs6BozuhZuNtHSIj2XulvUqJOeplkPo';
const apiUrl = 'https://api.unsplash.com/photos/random';


const imgcontainer = document.getElementById('imgcontainer');
const inputElement = document.getElementById('input-name') 
const searchButton = document.getElementById('search-btn')

function downloadImage(url){
  fetch(url)
  .then(response => response.blob())
  .then(blob => {
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'imageFinder_img.jpg';
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  })
  .catch(error => console.error('Error fetching data:' , error))
}

let randomContentLoaded = false;
let isContentLoaded = false;

function handleSearch(){
  
  clearResults()
  fetchAndDisplay()
  if(!isContentLoaded){
    removeLoadMoreButton()
    const loadBtn = document.createElement('button')
    loadBtn.innerText = 'Load more';
    loadBtn.classList.add('loadMore')
    document.body.appendChild(loadBtn)
    loadBtn.addEventListener('click', ()=>{
      fetchAndDisplay()})
    }
    isContentLoaded = true;
  }

  
let useOfApi = 0;


function fetchAndDisplay(){
  let query = inputElement.value.trim();
  let url = query ? `${apiUrl}?query=${query}&client_id=${apiKey}&orientation=portrait` : `${apiUrl}?client_id=${apiKey}`;

  for(let i = 0; i<8;i++){
      useOfApi++
      
      fetch(url, {
        headers: {
          'Authorization': `client-id: ${apiKey}`
        }
      })

      .then(response =>  response.json())
      .then(data =>{

          console.log(data)
          const imageUrl = data.urls.regular;
          const imgElement = document.createElement('img')
          imgElement.src = imageUrl;

          const downloadBtn = document.createElement('img');
          downloadBtn.src = 'assets/downloadIcon.png'
          downloadBtn.classList.add('downloadBtn')
          downloadBtn.addEventListener('click',() =>{ downloadImage(imageUrl)});

          const credits = document.createElement('p')
          const userName = data.user.name;
          credits.innerText = `Photo by ${userName} on Unsplash`
          credits.classList.add('credits')
          
          

          const imageContainer = document.createElement('div');
          imageContainer.classList.add('imageContainerEach');
          imageContainer.appendChild(imgElement);
          imageContainer.appendChild(downloadBtn);
          imageContainer.appendChild(credits)
          imgcontainer.appendChild(imageContainer);
    
      })
      .catch(error => console.error('Error fetching data', error));}
    
  

}

searchButton.addEventListener('click', handleSearch)

function toggleDownloadButton(){
  downloadBtn.style.display = downloadBtn.style.display === 'block' ? 'none' : 'block';
}

function clearResults(){

  while (imgcontainer.firstChild){
    imgcontainer.removeChild(imgcontainer.firstChild);
  }

}

function homeDisplay(){

  const url = `${apiUrl}?client_id=${apiKey}`;
  for(let i = 0; i<8;i++){
      useOfApi++
      
      fetch(url, {
        headers:{
          'Authorization': `Client-ID ${apiKey}`
        }
      })

      .then(response => {
        if(!response.ok){
          throw new Error('network response was not ok');
        }
        return response.json();
      })
      .then(data =>{

          
          const imageUrl = data.urls.regular;
          const imgElement = document.createElement('img')
          imgElement.src = imageUrl;

          const downloadBtn = document.createElement('img');
          downloadBtn.src = 'assets/downloadIcon.png'
          downloadBtn.classList.add('downloadBtn')
          downloadBtn.addEventListener('click',() =>{ downloadImage(imageUrl)});

          const credits = document.createElement('p')
          const userName = data.user.name;
          credits.innerText = `Photo by ${userName} on Unsplash`
          credits.classList.add('credits')

          const imageContainer = document.createElement('div');
          imageContainer.classList.add('imageContainerEach');
          imageContainer.appendChild(imgElement);
          imageContainer.appendChild(downloadBtn);
          imageContainer.appendChild(credits)
          imgcontainer.appendChild(imageContainer);
          
          
          
          
          
      })
      .catch(error => console.error('Error fetching data', error));}
    
}

const randomLoadBtn = document.createElement('button')
randomLoadBtn.innerText = 'Load more';
randomLoadBtn.classList.add('loadMore')
document.body.appendChild(randomLoadBtn)
randomLoadBtn.addEventListener('click', homeDisplay)
homeDisplay();


function removeLoadMoreButton() {
  if (randomLoadBtn.parentNode) {
    randomLoadBtn.parentNode.removeChild(randomLoadBtn);
  }
}