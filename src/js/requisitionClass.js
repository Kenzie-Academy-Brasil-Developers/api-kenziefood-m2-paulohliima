import { NewProduct } from "../model/ProductModel.js"

class RequistionAPI {

    static async RequisitionData() {

        const apiURL = "https://kenzie-food-api.herokuapp.com/product"
        const response = await fetch(apiURL)
        const data = await response.json()

        return data;
    }

    static async  PostRequisition() {

        const apiURL = "https://kenzie-food-api.herokuapp.com/my/product"

        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY0MzExOTAwOCwiZXhwIjoxNjQzOTgzMDA4LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.aEHtFwCjMvJeMlygdctk25MRBdCWaHlvY3ChY29Xujg"
            },
            body: JSON.stringify(data),
        })

        const data = await response.json()

        return data
    }

}


let productsObjArr = await RequistionAPI.RequisitionData()

export { productsObjArr }