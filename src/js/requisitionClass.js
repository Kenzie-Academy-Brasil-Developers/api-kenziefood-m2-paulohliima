class RequistionAPI {
    
    static async RequisitionData() {
        
        const apiURL = "https://kenzie-food-api.herokuapp.com/product"
        const response = await fetch(apiURL)
        const data = await response.json()

        return data;
    }

}

let productsObjArr = await RequistionAPI.RequisitionData()

export {productsObjArr}