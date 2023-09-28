const URL = './assets/images.json';
const imagesList = document.querySelector('.list');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const button = document.querySelector('.button');

const createLi = ({path}) => {    
  const li = document.createElement('li');
  li.className = 'item';
  const image = document.createElement('img');
  image.src = path;
  li.append(image);
  return li;
}

const showError = () => {
  imagesList.insertAdjacentHTML('beforebegin',
    `
      <div class="modal">      
        <button class="button button_close"></button>
        <p>Превышен лимит запросов
        </p>        
      </div>
    `
    )
    const modalCloseBtn = document.querySelector('.modal>.button_close');
    modalCloseBtn.addEventListener('click', () => {
      document.querySelector('.modal').remove();
    })

}

const showdata = (imagesArray) => {
  const arr = imagesArray.map(createLi);
  imagesList.append(...arr);
}

const getData = async(value) => {
  let fetchURL;
  try {
    if (value) {
      fetchURL = `${URL}/value`;
    } else {
      fetchURL = URL;
    }
    const response = await fetch(fetchURL);
    // const response = await fetch(URL);
    if (response.status === 404) showError();
    const imagesArray = await response.json()
    imagesList.innerHTML = '';
    showdata(imagesArray);
  } catch(e) {
    console.log(e);
  }
};

getData();

const showClose = () => {
  button.classList.remove('button_search');
  button.classList.add('button_close');
}

const showSearch = () => {
  button.classList.remove('button_close');
  button.classList.add('button_search');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const value = form.input.value
  showSearch();
  form.input.value = '';
  getData(value);
})

input.addEventListener('input', () => {
  showClose();
})