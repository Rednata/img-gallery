const URL = './assets/images.json';
const getData = async() => {
  const response = await fetch(URL);
  const imagesArray = await response.json()
  const imagesList = document.querySelector('.list');
  const createLi = ({path}) => {
    
    const li = document.createElement('li');
    li.className = 'item';
    const image = document.createElement('img');
    image.src = path;
    li.append(image);
    return li;
  }

  imagesArray.forEach(img => {
    imagesList.append(createLi(img));
    
  });

  
  

};

// getData();



