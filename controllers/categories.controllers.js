const categorie = require('../Models/categorie.collection');

const find_categorie = async (req, res) => {
    try {
        const data = await categorie.find()
        res.json(data)
    } catch (error) {
        res.status(404).json({ error: 'Not Found' });
    }
}

module.exports = find_categorie ;