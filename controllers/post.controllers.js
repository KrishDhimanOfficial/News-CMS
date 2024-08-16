const post = require('../Models/posts.collections');
const handelAggregatePagination = require('../service/handlePaginate.Aggregation')



// find Posts
const findPost = async (req, res) => {
    try {
        const projection =[{
            $project: {
                title: 1, categorie: 1, image: 1, description: 1,
                formattedDate: {
                    $dateToString: { format: "%d-%m-%Y", date: "$date" }
                }
            }
        }]
        const data = await handelAggregatePagination(post, projection, req.query)
        res.json(data)
    } catch (error) {
        console.log(error.meassage);

    }
}

// find_posts_By_Categories
const find_posts_By_Categories = async (req, res) => {
    try {
        const data = await post.aggregate([
            {
                $match: { categorie: req.params.categorie }
            },
            {
                $project: {
                    title: 1,
                    categorie: 1,
                    image: 1,
                    description: 1,
                    formattedDate: {
                        $dateToString: { format: "%d-%m-%Y", date: "$date" }
                    }
                }
            }
        ])
        res.render('categoriePost', { post: data })
    } catch (error) {
        res.status(404).json({ error: 'Not Found' });
    }
}

// find_single_post_By_id
const find_single_post = async (req, res) => {
    try {
        const data = await post.findOne({ _id: req.params.id })
        res.render('singlePost', { post: data })
    } catch (error) {
        res.status(404).json({ error: 'Not Found' });
    }
}
const searchQuery = async (req, res) => {
    try {
        const search = req.query.search;
        const data = await post.find({ title: { $regex: search, $options: "i" } })
        res.render('searchResult', { post: data })
        if (!data) {
            return res.json('Not Found')
        }
    } catch (error) {
        return res.json(error)
    }
}
module.exports = { findPost, find_posts_By_Categories, find_single_post, searchQuery };

// To create post With Image
module.exports.createPost = async (req, res) => {
    try {
        const { title, description, categorie } = req.body;
        date = new Date()
        image = req.file.filename
        const data = await post.create({ title, description, date, categorie, image })
        res.redirect('/admin/panel')
        if (!data) {
            res.status(404).redirect('/post/createpost')
        }
    } catch (error) {
        res.json({ error: 'Create Post Unscucessfull!' })
    }
}