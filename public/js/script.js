const Categoriesname = async () => {
    const api = await fetch('http://localhost:8000/categories/api/postByCategorie')
    const response = api.json()

    response.then((data) => {
        let navLinks = ''
        data.forEach(data => {
            navLinks += `<li><a href='http://localhost:8000/post/${data.categorie_name}'>${data.categorie_name}</a></li>`
        })
        document.querySelector('#menubar').insertAdjacentHTML('afterbegin', navLinks);
    })
}
// Display Categoriesname ON Index Page
Categoriesname()

const DisplayPost = async () => {
    const api = await fetch('http://localhost:8000/post/api/findPosts')
    const data = api.json();
    data.then((post) => {
        let recent_post = ''
        post.collectionData.forEach(data => {
            recent_post += `<div class="recent-post">
                  <a class="post-img" href="http://localhost:8000/post/singlepost/${data._id}" target='_blank'>
                  <img src='http://localhost:8000/uploads/${data.image}' : alt="" />
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
        document.querySelector('.recent-post-container').insertAdjacentHTML('beforeEnd', recent_post);
    })


}
// Display Posts ON Index Page
DisplayPost()