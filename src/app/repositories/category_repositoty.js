const Category = require('../mongodb/models/CategoryProducts')

class CategoryRepository{
    async store(category){
        const newCategory = await Category.create(category)
        console.log(Category)
        return newCategory
    }

    async index(){
        const categories = await Category.find();
        return categories;
    }
    async show(id){
        const category = await Category.findOne({_id:id})
        return category
    }
    async edit(id, editedCategory){
        console.log(editedCategory.slugName)
        const updatedCategory = await Category.findOneAndUpdate({_id:id}, {
            displayName: editedCategory.displayName,
            slugName: editedCategory.slugName,
            isAvailable: false,
            imgUrl: editedCategory.imgUrl
        }, {new:true})
        return updatedCategory
    }
    async delete(id){
        const deletedCategory = await Category.findOneAndDelete({_id:id})
        return deletedCategory
    }
}

module.exports = new CategoryRepository()