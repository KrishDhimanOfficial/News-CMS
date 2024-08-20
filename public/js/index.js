const DisplayPost = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const getPage = urlParams.get('page')
    if (getPage) {
        var apiURL = `http://localhost:8000/post/api/findPosts?page=${getPage}`
    } else {
        var apiURL = 'http://localhost:8000/post/api/findPosts'
    }
    const api = await fetch(apiURL)
    const data = api.json();

    data.then((doc) => {
        let post_wrapper = ''
        let recent_post = ''
        let paginate = ''
        doc.collectionData.forEach(data => {
            const video = `<video loop autoplay muted >
                <source src="http://localhost:8000/uploads/${data.image}" type="video/mp4">
                </video>`
            const image = `<img src="http://localhost:8000/uploads/${data.image}" alt="" />`
            post_wrapper += `<div class="post-content">
                <div class="row">
                <div class="col-md-4">
                <a class="post-img" href="http://localhost:8000/post/singlepost/${data._id}" target='_blank'>
                ${data.image.split('.')[1] === 'mp4' ? video : image}
                </a>
                </div>
                <div class="col-md-8">
                <div class="inner-content clearfix">
                <h3><a href='http://localhost:8000/post/singlepost/${data._id}' target='_blank'>${data.title}</a></h3>
                <div class="post-information">
                <span>
                <i class="fa fa-tags" aria-hidden="true"></i>
                <span>${data.categorie}</span>
                </span>
                <span>
                <i class="fa fa-user" aria-hidden="true"></i>
                <a href='author.php'>author</a>
                </span>
                <span>
                <i class="fa fa-calendar" aria-hidden="true"></i>
                
                <a href='#'> ${data.formattedDate}</a>
                </span>
                </div>
                <p class="description">
                ${data.description}
                </p>
                <a class='read-more pull-right' href="http://localhost:8000/post/singlepost/${data._id}" target='_blank'>read more</a>
                </div>
                </div>
                </div>
                </div>`
            recent_post += `<div class="recent-post">
                  <a class="post-img" href="http://localhost:8000/post/singlepost/${data._id}" target='_blank'>
                  ${data.image.split('.')[1] === 'mp4' ? video : image}
                 </a>
                  <div class="post-content">
                  <h5><a href="http://localhost:8000/post/singlepost/${data._id}" target='_blank'>${data.title}</a></h5>
                  <span>
                    <i class="fa fa-tags" aria-hidden="true"></i>
                    <span>${data.categorie}</span>
                  </span>
                  <span>
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    ${data.formattedDate}
                  </span>
                <a class="read-more" href='http://localhost:8000/post/singlepost/${data._id}'>read more</a>
                 </div>
            </div>`
        });
        for (let i = 1; i <= doc.totalPages; i++) {
            paginate += `<li><a href="?page=${i}" class="btn btn-primary">${i}</a></li>`
        }
        document.querySelector('.pagination').insertAdjacentHTML('afterbegin', paginate);
        document.querySelector('.post-container').insertAdjacentHTML('afterbegin', post_wrapper);
        document.querySelector('.recent-post-container').insertAdjacentHTML('beforeEnd', recent_post);
    })
}
// Display Posts ON Index Page
DisplayPost()

const Categoriesname = async () => {
    const api = await fetch('http://localhost:8000/categories/api/postByCategorie')
    const response = api.json()

    response.then((data) => {
        let navLinks = ''
        data.forEach(data => {
            navLinks += `<li><a href='http://localhost:8000/post/${data.categorie_name}'>
            ${data.categorie_name}
            </a></li>`
        })
        document.querySelector('#menubar').insertAdjacentHTML('afterbegin', navLinks);
    })
}
// Display Categoriesname ON Index Page
Categoriesname()
