// import { ModalProduct } from "./ModalProduct.js"
// import { NewProduct }   from "../model/ProductModel.js"

class RequistionAPI {

    static async RequisitionData() {

        const apiURL = "https://kenzie-food-api.herokuapp.com/product"
        const response = await fetch(apiURL)
        const data = await response.json()

        return data;
    }

    static async CreatedDataRequisition(){
        const apiURL = "https://kenzie-food-api.herokuapp.com/my/product"
        const response = await fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY0MzExOTAwOCwiZXhwIjoxNjQzOTgzMDA4LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.aEHtFwCjMvJeMlygdctk25MRBdCWaHlvY3ChY29Xujg"
            },
        })
        const data = await response.json()
        console.log(data);
        return data;
    }
    static async  PostRequisition(data) {
        const apiURL = "https://kenzie-food-api.herokuapp.com/my/product"
        
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY0MzExOTAwOCwiZXhwIjoxNjQzOTgzMDA4LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.aEHtFwCjMvJeMlygdctk25MRBdCWaHlvY3ChY29Xujg"
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()
        return result
    }
    static async PATCHRequisition(data, id) {
        const apiURL = `https://kenzie-food-api.herokuapp.com/my/product/${id}`

        const response = await fetch(apiURL, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY0MzExOTAwOCwiZXhwIjoxNjQzOTgzMDA4LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.aEHtFwCjMvJeMlygdctk25MRBdCWaHlvY3ChY29Xujg"
            },
            body: JSON.stringify(data),
        });

        const result = await response.json()
        return result;
    }
    static async DeleteRequisition(id){
        const apiURL = `https://kenzie-food-api.herokuapp.com/my/product/${id}`

        const response = await fetch(apiURL, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY0MzExOTAwOCwiZXhwIjoxNjQzOTgzMDA4LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.aEHtFwCjMvJeMlygdctk25MRBdCWaHlvY3ChY29Xujg"
            },
        });
        let data = await response
        return data;
    }
}

let productsObjArr = await RequistionAPI.RequisitionData()
let createdObjData = await RequistionAPI.CreatedDataRequisition()

export { productsObjArr , RequistionAPI, createdObjData}
