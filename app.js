const loadCatagory =()=>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res=>res.json())
    .then(data=>displayCatagory(data.data.news_category))
    .catch(error=>console.log(error))
}

const toggleSpinner = isLoading =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
      spinner.classList.remove('d-none');
    }
    else{
      spinner.classList.add('d-none');
    }
  }


const displayCatagory = catagories =>{
    const catagoryContainer = document.getElementById('catagories');
    catagories.forEach(catagory => {
        const catagoryDiv = document.createElement('button');
        catagoryDiv.classList.add('btn');
        catagoryDiv.classList.add('btn-outline-primary');
        const catagoryID = `${catagory.category_id}`;
        catagoryDiv.classList.add('mx-3');
        catagoryDiv.classList.add('px-3');
        catagoryDiv.setAttribute('id', `${catagoryID}`);
        catagoryDiv.innerText=catagory.category_name;
        catagoryContainer.appendChild(catagoryDiv);
        // console.log(catagoryDiv);

       document.getElementById(`${catagoryID}`).addEventListener('click',function(){
           toggleSpinner(true)
            fetch(`https://openapi.programming-hero.com/api/news/category/${catagory.category_id}`)
            .then(res=>res.json())
            .then(data=>displayNews(data.data))
            .catch(error=>console.log(error))
       })
        
    });

    const displayNews = newsArray =>{
        // console.log(newsArray);
        const inputField =document.getElementById('input-field');
        inputField.value = `${newsArray.length} items found for this Catagory`;
        
        const newsContainer = document.getElementById('news-container');
        newsContainer.textContent='';
        newsArray.forEach(news=>{
            let newsDetails = news.details;
            newsDetails = newsDetails.slice(0, 300);
            // let newsDetailsLast = news.details.slice(0, 50);
            // console.log(news);
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
              <div class="d-flex justify-content-between mt-5">
                <img
                  src="${news.author.img}"
                  class="rounded-circle me-2"
                  style="width: 55px; height:50px"
                />
                <p class="card-text">
                  <small class="fw-bold">${news.author.name ? news.author.name : 'No Data Available' }</small>
                  <br />
                  <small class="text-muted"
                    >${news.author.published_date}</small
                  >
                </p>
                <div class="d-flex align-items-center justify-content-center">
                  <iconify-icon icon="carbon:view"></iconify-icon>
                  <span class="ms-1">${news.total_view ? news.total_view : 'No Data Available'}</span>
                </div>

                <div class="mt-4">
                <a class="px-2"><iconify-icon icon="bi:star-half"></iconify-icon></a>
                <a class="px-2"><iconify-icon icon="bi:star"></iconify-icon></a>
                <a class="px-2"><iconify-icon icon="bi:star"></iconify-icon></a>
                <a class="px-2"><iconify-icon icon="bi:star"></iconify-icon></a>
                <a class="px-2"><iconify-icon icon="bi:star"></iconify-icon></a>
                </div>

                <div class="mt-4" style="font-size:25px">
                <a onclick="loadDetail('${news._id}')" data-bs-toggle="modal"
                data-bs-target="#newsDetailModal"><iconify-icon icon="carbon:next-filled"></iconify-icon></a>
                </div>
              </div>
            </div>
          </div>
        </div>
            `;
            newsContainer.appendChild(newsDiv);
            
        });
        
        toggleSpinner(false);

        
    }

}

// Load News Details
const loadDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      showDetail(data.data);
    //   console.log(data.data);
  } 

// Display News Details 
    const showDetail = news =>{
       console.log(news[0]);
       news.forEach(x=>{
           const modalTitle = document.getElementById('newsDetailModalLabel');
           modalTitle.innerText= x.title;
           const modalBody = document.getElementById('modal-body');
           modalBody.innerHTML=`
           <p><b>Author: </b>${x.author.name}</p>
           <p><b>Description: </b>${x.details.slice(0,500)}<span>...</span></p>
           <h5>Published on <span class="fw-bold">${x.author.published_date}</span></h5>
           `;
       })
    } 


loadCatagory();