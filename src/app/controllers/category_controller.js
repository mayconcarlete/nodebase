const categoryrespository = require('../repositories/category_repositoty')
const yup = require('../services/yup_service')

function removerAcentos( newStringComAcento ) {
    var string = newStringComAcento;
      var mapaAcentosHex 	= {
          a : /[\xE0-\xE6]/g,
          e : /[\xE8-\xEB]/g,
          i : /[\xEC-\xEF]/g,
          o : /[\xF2-\xF6]/g,
          u : /[\xF9-\xFC]/g,
          c : /\xE7/g,
          n : /\xF1/g
      };
  
      for ( var letra in mapaAcentosHex ) {
          var expressaoRegular = mapaAcentosHex[letra];
          string = string.replace( expressaoRegular, letra );
      }
  
      return string;
  }


class CategoryController{
    async store(req, res){
        try{
            const {displayName, isAvailable, imgUrl} = req.body
            const stringFields = ['imgUrl', 'displayName']
            const booleanFields = ['isAvailable']
           
            if(!req.body.displayName){
                return res.status(400).json(`Display name is required`)
            }
            if(req.body.displayName.length <3){
                return res.status(400).json(`Display name need to have more than 3 letters`)
            }
           for(const field of stringFields){
            if(req.body[field] && typeof req.body[field] !== "string"){
                return res.status(400).json(`Invalid type of variable ${field}. Expect a string`)
            }
           }
           for(const field of booleanFields){
               if(req.body[field] && typeof req.body[field]!=="boolean"){
                return res.status(400).json(`Invalid type of variable ${field}. Expect a boolean`)
               }
           }
            if(req.body.isAvailable && typeof req.body.isAvailable !== "boolean"){
                return res.status(400).json('Invalid type of variable. Expect a boolean')
            }
        let createSlug = displayName.trim() //remove o primeiro e ultimo espaço
        createSlug = createSlug.replace(/\s/g, '-').toLowerCase() //troca espaços por -   
        createSlug = removerAcentos(createSlug) //remove os acentos
         const newCategory = await categoryrespository.store({
             slugName: createSlug,
             displayName,
             isAvailable,
             imgUrl
         })  
        return res.json(newCategory)
    }catch(error){
        return res.status(500).json(error)
    }
}
    async index(req, res){
        try{
        const categories = await categoryrespository.index()
        return res.json(categories)
        }catch(error){
            res.status(500).json(error)
        }
    }
    async show(req,res){
        const id = req.params.id
        try{
            const category = await categoryrespository.show(id)
            return res.json(category)
        }catch(error){
            return res.status(500).json(error)
        }
    }
    async edit(req, res){
        const id = req.params.id
        try{
        if(!req.body.displayName){
            return res.status(400).json(`Display name is required`)
        }
        if(req.body.displayName.length <3){
            return res.status(400).json(`Display name need to have more than 3 letters`)
        }
        const getCategoryToUpdate = await categoryrespository.show(id)
        if(!getCategoryToUpdate){
            return res.status(400).json('Category not found')
        }
        let createSlug = req.body.displayName.trim() //remove o primeiro e ultimo espaço
        createSlug = createSlug.replace(/\s/g, '-').toLowerCase() //troca espaços por -   
        createSlug = removerAcentos(createSlug) //remove os acentos
        const editedCategory = {
            displayName:req.body.displayName,
            isAvailable: false,
            slugName:createSlug,
            imgUrl: (req.body.imgUrl) ? req.body.imgUrl:getCategoryToUpdate.imgUrl
        }
        const updateCategory = await categoryrespository.edit(id, editedCategory) 
        return res.json(updateCategory)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
    }

    async delete(req, res){
        try{
            const id = req.params.id
            const deletedCategory = await categoryrespository.delete(id)
            return res.json(deletedCategory)
        }catch(error){
            return res.status(500).json(error)
        }
    }
}

module.exports = new CategoryController()