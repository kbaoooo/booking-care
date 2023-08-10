
class SiteController {
    index(req, res, next) {
       res.render('site.ejs')
    }
}

export default new SiteController();