const DisplayPosts = async () => {
    const api = await fetch('http://localhost:8000/post/api/findPosts')
    const data = api.json();
    data.then((post) => {
        let tablebody = ''
        post.forEach((data,i) => {
            tablebody += `<tr>
                                <td class='id'>${i + 1}</td>
                                <td>${data.title}</td>
                                <td>${data.categorie}</td>
                                <td>${data.formattedDate}</td>
                                <td>Admin</td>
                                <td class='edit'><a href='http://localhost:8000/admin/post/${data._id}'><i class='fa fa-edit'></i>Edit</a></td>
                                <td class='delete'><a href='http://localhost:8000/admin/post/delete/${data._id}'><i class='fa fa-trash-o'></i>Delete</a></td>
                            </tr>`
        });
        document.querySelector('#tableBody').insertAdjacentHTML('afterBegin', tablebody);
    })


}
// Display Posts ON Index Page
DisplayPosts()