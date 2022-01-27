import {NewProduct} from "../model/ProductModel.js"
import {RequistionAPI, createdObjData} from "./requisitionClass.js"
import { TemplatesVitrines } from "./script.js"

const modalProduct = document.querySelector("#ModalProduct")
const select = document.querySelector("#selectProduct")

class ModalProduct{

    static OpenModal(){
        
        const buttonAddProduct = document.querySelector("#AddProduct")

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
        
        modalButton.addEventListener("click", (evt) =>{
            evt.preventDefault();
            if(select.options[select.selectedIndex].value !== "default"){
                let idProduct = select.options[select.selectedIndex].id
                const newObject = NewProduct.receivedValues();
                let resultado = RequistionAPI.PATCHRequisition(newObject, idProduct)
                let newProductsData = RequistionAPI.CreatedDataRequisition() // AWAIT NÃO FUNCIONA
                console.log(newProductsData)
                TemplatesVitrines.vitrineModal(newProductsData)

                return resultado;
            }else{
                const newObject = NewProduct.receivedValues();
                let resultado = RequistionAPI.PostRequisition(newObject);

                return resultado;
            }
        })
    }
    static async RemoverProduto(){
        const removeButton = document.querySelector("#removeProduct")
        
        removeButton.addEventListener("click", ()=>{
            let idProduct = select.options[select.selectedIndex].id
            if(select.options[select.selectedIndex].value === "default"){
                return alert("Selecione um Produto para Remover!")
            }else{
                let resultado = RequistionAPI.DeleteRequisition(idProduct);
                let newProductsData = RequistionAPI.CreatedDataRequisition() // AWAIT NÃO FUNCIONA
                console.log(newProductsData)
                TemplatesVitrines.vitrineModal(newProductsData)
                return resultado;
            }
        })
    }

}

export {ModalProduct}