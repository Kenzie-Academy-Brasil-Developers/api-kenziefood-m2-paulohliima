class NewProduct{

    static receivedValues(){
        const inputName = document.querySelector("#NameProduct");
        let inputNameValue = inputName.value;

        const inputPrice = document.querySelector("#PriceProduct");
        let inputPriceValue = inputPrice.value;

        const inputCategory = document.querySelector("#CategoryProduct");
        let inputCategoryValue = inputCategory.value

        const inputImg = document.querySelector("#ImgProduct");
        let inputImgValue = inputImg.value;

        const inputDesc = document.querySelector("#DescriptionProduct");
        let inputDescValue = inputDesc.value;

        //validação dos inputs.

        const newObject = {nome: inputNameValue, preco: Number(inputPriceValue), categoria: inputCategoryValue, imagem: inputImgValue, descricao: inputDescValue}
        console.log(newObject)
        inputName.value      = ""
        inputPrice.value     = ""
        inputCategory.value  = ""
        inputImg.value       = ""
        inputDesc.value      = ""

        return newObject;
    }   

}

export {NewProduct}