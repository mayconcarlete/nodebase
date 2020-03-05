const sut = require('../../src/app/services/yup_service')


describe('Test the address route',()=>{
    it('Should return false if ownerId are missing', async() => {
        const address = {
            ownerId:undefined,
            street:"rua jair coelho",
            neighborhood:"Fatima",
            city:"SM",
            state:"ES",
            zipCode:"29933640",
            number:"104",
            note:"Proximo a sorveteria tupy"
        }
        const result = await sut.checkAddress(address)
      
        expect(result).toBe(false)
    })
    it('Should return false if street are missing', async() => {
        const address = {
            ownerId:"5e5fdbea29924fb82ec91841",
            street:undefined,
            neighborhood:"Fatima",
            city:"SM",
            state:"ES",
            zipCode:"29933640",
            number:"104",
            note:"Proximo a sorveteria tupy"
        }
        const result = await sut.checkAddress(address)
       
        expect(result).toBe(false)
    })
    it('Should return false if neighborhood are missing', async() => {
        const address = {
            ownerId:"5e5fdbea29924fb82ec91841",
            street:"rua jair coelho",
            neighborhood:undefined,
            city:"SM",
            state:"ES",
            zipCode:"29933640",
            number:"104",
            note:"Proximo a sorveteria tupy"
        }
        const result = await sut.checkAddress(address)
      
        expect(result).toBe(false)
    })
    it('Should return false if city are missing', async() => {
        const address = {
            ownerId:"5e5fdbea29924fb82ec91841",
            street:"rua jair coelho",
            neighborhood:"Fatima",
            city:undefined,
            state:"ES",
            zipCode:"29933640",
            number:"104",
            note:"Proximo a sorveteria tupy"
        }
        const result = await sut.checkAddress(address)
      
        expect(result).toBe(false)
    })
    it('Should return false if state are missing', async() => {
        const address = {
            ownerId:"5e5fdbea29924fb82ec91841",
            street:"rua jair coelho",
            neighborhood:"Fatima",
            city:"SM",
            state:undefined,
            zipCode:"29933640",
            number:"104",
            note:"Proximo a sorveteria tupy"
        }
        const result = await sut.checkAddress(address)
       
        expect(result).toBe(false)
    })
    it('Should return false if zipCode are missing', async() => {
        const address = {
            ownerId:"5e5fdbea29924fb82ec91841",
            street:"rua jair coelho",
            neighborhood:"Fatima",
            city:"SM",
            state:"ES",
            zipCode:undefined,
            number:"104",
            note:"Proximo a sorveteria tupy"
        }
        const result = await sut.checkAddress(address)
      
        expect(result).toBe(false)
    })
    it('Should return false if number are missing', async() => {
        const address = {
            ownerId:"5e5fdbea29924fb82ec91841",
            street:"rua jair coelho",
            neighborhood:"Fatima",
            city:"SM",
            state:"ES",
            zipCode:"29933640",
            number:undefined,
            note:"Proximo a sorveteria tupy"
        }
        const result = await sut.checkAddress(address)
       
        expect(result).toBe(false)
    })
    it('Should return true if note are missing', async() => {
        const address = {
            ownerId:"5e5fdbea29924fb82ec91841",
            street:"rua jair coelho",
            neighborhood:"Fatima",
            city:"SM",
            state:"ES",
            zipCode:"29933640",
            number:"104",
            note:undefined
        }
        const result = await sut.checkAddress(address)
  
        expect(result).toBe(true)
    })
    it('Should return true all params are correct', async() => {
        const address = {
            ownerId:"5e5fdbea29924fb82ec91841",
            street:"rua jair coelho",
            neighborhood:"Fatima",
            city:"SM",
            state:"ES",
            zipCode:"29933640",
            number:"104",
            note:'Proximo a sorveteria tupy'
        }
        const result = await sut.checkAddress(address)
        expect(result).toBe(true)
    })
})