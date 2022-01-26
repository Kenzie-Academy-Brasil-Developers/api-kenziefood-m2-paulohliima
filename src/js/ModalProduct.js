import {NewProduct} from "../model/ProductModel.js"
import {RequistionAPI, createdObjData} from "./requisitionClass.js"
import { TemplatesVitrines } from "./script.js"

const modalProduct = document.querySelector("#ModalProduct")

class ModalProduct{

    static OpenModal(){
        
        const buttonAddProduct = document.querySelector("#AddProduct")
        

        console.log(modalProduct)
        console.log(buttonAddProduct)

        buttonAddProduct.addEventListener("click", (evt)=>{
            modalProduct.className = "modal-adicionarProduto"
        })
    }
    static CloseModal(){
        const modalButtonClose = document.querySelector(".ModalClose")

        modalButtonClose.addEventListener("click", ()=>{
            modalProduct.classList = "modalNone";
        })
    }

    static async AdicionarProduto(){
        const modalButton = document.querySelector("#ModalButton")
        const select = document.querySelector("#selectProduct")

        
        modalButton.addEventListener("click", (evt) =>{
            evt.preventDefault();
            if(select.options[select.selectedIndex].value !== "default"){
                let idProduct = select.options[select.selectedIndex].id
                const newObject = NewProduct.receivedValues();
                let resultado = RequistionAPI.PATCHRequisition(newObject, idProduct)
                // createdObjData = RequistionAPI.CreatedDataRequisition()
                TemplatesVitrines.vitrineModal()

                return resultado;
            }else{
                const newObject = NewProduct.receivedValues();
                let resultado = RequistionAPI.PostRequisition(newObject);

                return resultado;
            }
        })
    }

}

export {ModalProduct}