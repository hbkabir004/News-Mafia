const loadCatagory =()=>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res=>res.json())
    .then(data=>displayCatagory(data.data.news_category))
    .catch(error=>console.log(error))
}


const displayCatagory = catagories =>{
   
    const catagoryContainer = document.getElementById('catagories');
    catagories.forEach(catagory => {
        const catagoryDiv = document.createElement('button');
        const catagoryID = `${catagory.category_id}`;
        catagoryDiv.classList.add('mx-3');
        catagoryDiv.classList.add('px-3');
        catagoryDiv.setAttribute('id', `${catagoryID}`);
        catagoryDiv.innerText=catagory.category_name;
        catagoryContainer.appendChild(catagoryDiv);
        // console.log(catagoryDiv);

       document.getElementById(`${catagoryID}`).addEventListener('click',function(){
            fetch(`https://openapi.programming-hero.com/api/news/category/${catagory.category_id}`)
            .then(res=>res.json())
            .then(data=>displayNews(data.data))
            .catch(error=>console.log(error))
       })
        
    });

    const displayNews = newsArray =>{
        // console.log(newsArray);
        const newsContainer = document.getElementById('news-container');
        newsArray.forEach(news=>{
            // console.log(news);

        })
    }
}


loadCatagory();