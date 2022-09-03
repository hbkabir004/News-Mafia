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
        console.log(newsArray);
        const newsContainer = document.getElementById('news-container');
        newsArray.forEach(news=>{
            let newsDetails = news.details;
            newsDetails = newsDetails.slice(0, 300);
            // let newsDetailsLast = news.details.slice(0, 50);
            // console.log(newsDetails);
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('card');
            newsDiv.classList.add('mb-3');
            newsDiv.style.maxWidth = '100%';
            newsDiv.innerHTML=`
            <div class="row g-0 p-3">
          <div class="col-md-4">
            <img src="${news.image_url}" class="img-fluid rounded-start" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title fw-bold">${news.title}</h5>
              <p class="card-text">${newsDetails}<span>...</span></p>
              <div class="d-flex justify-content-between">
                <img
                  src="${news.author.img}"
                  class="rounded-circle me-2"
                  style="width: 50px"
                />
                <p class="card-text">
                  <small class="text-muted">${news.author.name}</small>
                  <br />
                  <small class="text-muted"
                    >${news.author.published_date}</small
                  >
                </p>
                <div class="d-flex align-items-center justify-content-center">
                  <iconify-icon icon="carbon:view"></iconify-icon>
                  <span class="ms-1">${news.total_view}</span>
                </div>

                <div>
                <a class="px-2"><iconify-icon icon="bi:star-half"></iconify-icon></a>
                <a class="px-2"><iconify-icon icon="bi:star"></iconify-icon></a>
                <a class="px-2"><iconify-icon icon="bi:star"></iconify-icon></a>
                <a class="px-2"><iconify-icon icon="bi:star"></iconify-icon></a>
                <a class="px-2"><iconify-icon icon="bi:star"></iconify-icon></a>
                </div>

                <div style="font-size:25px">
                <a><iconify-icon icon="carbon:next-filled"></iconify-icon></a>
                </div>
              </div>
            </div>
          </div>
        </div>
            `;
            newsContainer.appendChild(newsDiv);

        })
    }
}


loadCatagory();