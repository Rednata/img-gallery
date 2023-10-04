const ID = 'a-8uLZVXLAYyWkGpYyd8PhJYoIB-jt8OHpo5xNlhopY';
const URL_API = new URL('https://api.unsplash.com/search/photos?per_page=12&extras=url_m&orientation=landscape&query=image');

const imagesList = document.querySelector('.list');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const buttonSearch = document.querySelector('.button_search');
const buttonClose = document.querySelector('.button_close');

const createLi = (path) => {    
  const li = document.createElement('li');
  li.className = 'item';
  const image = document.createElement('img');
  image.src = path;
  li.append(image);
  return li;
}

const showError = () => {
  imagesList.insertAdjacentHTML('beforebegin',
    `<div class="overlay">
      <div class="modal">      
        <button class="button button_close"></button>
        <p>Превышен лимит запросов</p>        
        <p>Попробуйте зайти позже</p>        
      </div>
    </div>
    `
    )
    const modalCloseBtn = document.querySelector('.modal>.button_close');
    const overlay = document.querySelector('.overlay');

    modalCloseBtn.addEventListener('click', () => {
      overlay.remove();
    })
    overlay.addEventListener('click', () => {
      overlay.remove();
      input.focus();
    })

}

const showdata = (imagesArray, value) => {
  if (imagesArray.length === 0) {    
    imagesList.insertAdjacentHTML('afterend',
    `    
      <div class="noValueSearch">
        <p>По вашему запросу ${value} ничего не найдено</p>
        <p>Попробуйте ввести другой запрос</p>      
      </div>        
        
    `
    )
    setTimeout(() => {
      document.querySelector('.noValueSearch').remove();
    }, 3000);
  }
  const arr = imagesArray.map(createLi);
  imagesList.append(...arr);
}

const getData = async(value) => {
  if (value) {
    URL_API.searchParams.set('query', value)
  };
  try {
    const response = await fetch(URL_API.toString(), {
      headers: {
        Authorization: `Client-ID ${ID}`
      }
    });    
    if (response.status === 403) showError();
    const {results} = await response.json();    
    const imagesArray = results.map(item => item.urls.small);        
    imagesList.innerHTML = '';
    showdata(imagesArray, value);
  } catch(e) {
    console.log(e);
  }
};

getData();

const showCloseBtn = () => {
  buttonClose.classList.remove('button_hidden');
  form.classList.add('form_hidden');
}

const showSearchBtn = () => {
  buttonClose.classList.add('button_hidden');
  form.classList.remove('form_hidden');
  input.focus();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const value = form.input.value
  getData(value);
})

input.addEventListener('input', () => {
  showCloseBtn()
})

buttonClose.addEventListener('click', () => {
  form.input.value = '';
  showSearchBtn();
})
