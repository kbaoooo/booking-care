import { createNewUser, getUsers, getUserById } from "../services/CRUDService";

class CRUDController {
    // index page
    CRUD(req, res, next){
        return res.render('crud/index.ejs')
    }

    // add new user view
    addCRUD(req, res, next) {
        return res.render('crud/create.ejs')
    }

    // add new user to DB
    async postCRUD(req, res, next) {
        await createNewUser(req.body)
        return res.redirect('/crud/read-crud')
    }

    // read and render user from db to view
    async readCRUD(req, res, next) {
        const users = await getUsers();
        res.render('crud/read.ejs', {users})
    }

    // edit user view
    async editCRUD(req, res, next) {
        const id = req.params.id
        let user = await getUserById(id)
        return res.render('crud/edit.ejs', {user})
    }

    // update user 
    async updateCRUD(req, res, next) {
        let id = req.params.id;
        let data = req.body
        let user = await getUserById(id);
        if(user) {
            user.set({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                phone: data.phone,
                gender: data.gender,
                roleId: data.roleId,
            })
            await user.save()
        }
        return res.redirect('/crud/read-crud')
    }

    //  delete user
    async deleteCRUD(req, res, next) {
        let id = req.params.id;
        let user = await getUserById(id);
        await user.destroy()
        return res.redirect('/crud/read-crud')
    }
}

export default new CRUDController();