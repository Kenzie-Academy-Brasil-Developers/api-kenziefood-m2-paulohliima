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
        
        modalButton.addEventListener("click", async (evt) =>{
            evt.preventDefault();
            if(select.options[select.selectedIndex].value !== "default"){
                let idProduct = select.options[select.selectedIndex].id
                const newObject = NewProduct.receivedValues();
                let resultado = await RequistionAPI.PATCHRequisition(newObject, idProduct)
                let newProductsData = await RequistionAPI.CreatedDataRequisition() // AWAIT NÃO FUNCIONA
                TemplatesVitrines.vitrineModal(newProductsData)
                alert("Produto Alterado!")

                return resultado;
            }else{
                const newObject = NewProduct.receivedValues();
                let resultado = await RequistionAPI.PostRequisition(newObject);
                let newProductsData = await RequistionAPI.CreatedDataRequisition() // AWAIT NÃO FUNCIONA
                TemplatesVitrines.vitrineModal(newProductsData)
                alert("Produto Adicionado!")
                return resultado;
            }
        })
    }
    static async RemoverProduto(){
        const removeButton = document.querySelector("#removeProduct")
        
        removeButton.addEventListener("click", async ()=>{
            let idProduct = select.options[select.selectedIndex].id
            if(select.options[select.selectedIndex].value === "default"){
                return alert("Selecione um Produto para Remover!")
            }else{
                let resultado = RequistionAPI.DeleteRequisition(idProduct);
                let newProductsData = await RequistionAPI.CreatedDataRequisition() // AWAIT NÃO FUNCIONA
                console.log(newProductsData)
                TemplatesVitrines.vitrineModal(newProductsData)
                alert("Produto Removido!")
                return resultado;
            }
        })
    }

}

export {ModalProduct}