const DisplayPosts = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const getPage = urlParams.get('page')

    if (getPage) {
        var apiURL = `http://localhost:8000/post/api/findPosts?page=${getPage}`
    } else { var apiURL = 'http://localhost:8000/post/api/findPosts' }

    const api = await fetch(apiURL)
    const data = api.json();
    data.then((doc) => {
        let tablebody = ''
        let paginate = ''
        let counter = doc.pageCounter;
        doc.collectionData.forEach((data, i) => {
            tablebody += `<tr>
                                <td class='id'>${counter}</td>
                                <td>${data.title}</td>
                                <td>${data.categorie}</td>
                                <td>${data.formattedDate}</td>
                                <td>Admin</td>
                                <td class='edit'><a href='http://localhost:8000/admin/post/${data._id}'><i class='fa fa-edit'></i>Edit</a></td>
                                <td class='delete'><a href='http://localhost:8000/admin/post/delete/${data._id}'><i class='fa fa-trash-o'></i>Delete</a></td>
                            </tr>`
            counter++;
        });
        for (let i = 1; i <= doc.totalPages; i++) {
            paginate += `<li><a href="?page=${i}" class="btn btn-primary">${i}</a></li>`
        }
        document.querySelector('.pagination').insertAdjacentHTML('afterbegin', paginate);
        document.querySelector('#tableBody').insertAdjacentHTML('afterBegin', tablebody);
    })


}
// Display Posts ON Index Page
DisplayPosts()