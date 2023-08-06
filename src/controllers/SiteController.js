import db from '../models'

class SiteController {
    async index(req, res, next) {
        try {
            let users = await db.User.findAll()
            res.render('site.ejs', { users })
        } catch(e) {
            console.log(e);
        }
    }
}

export default new SiteController();