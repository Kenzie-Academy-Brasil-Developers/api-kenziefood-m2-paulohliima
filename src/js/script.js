//START global-variables
const vitrineProdutos = document.querySelector("#vitrineProdutos")
const vitrineCarrinho = document.querySelector("#vitrineCarrinho")
const buttonCategorias = document.querySelectorAll("#buttonCategoria")
const inputPesquisa = document.querySelector("input");


const apiURL = "https://kenzie-food-api.herokuapp.com/product"


//END global-variables

//START dynamic-content-header

//END dynamic-content-header

//START dynamic-content-main

// 
class RequistionAPI{
    static async RequisitionData(){
        const response = await fetch (apiURL)
        const data = await response.json()
        console.log(data)
        return data;
    }
}
let productsObjArr = await RequistionAPI.RequisitionData()

class TemplatesVitrines{
    static vitrineProdutos(array){
        vitrineProdutos.innerHTML = ""
        array.forEach((element) => {
            const li = document.createElement("li")
            li.innerHTML = 
            `<img src=${element.imagem} alt="${element.nome}">
            <span class="foodCategory">
                <img src="./src/icons/icon-${element.categoria}.png" alt="Icone ${element.categoria}">
                ${element.categoria}

            </span>

            <h3>${element.nome}</h3>

            <p>
                ${element.descricao}
            </p>
            <div>
                <span class="price">R$ ${element.preco}</span>

                <button class="addCart">
                    <img src="./src/icons/icon-addcarrinho.png" alt="Icone addCart">

                </button>
            </div>`
        vitrineProdutos.appendChild(li)
        });

    }
}

class FilterProducts{

    static ValidacaoCategorias(button){
        switch(button.target.className){
            case "filterTodos":
                return TemplatesVitrines.vitrineProdutos(productsObjArr);
                break;
            case "filterPanificadora":
                const ListaPanificadora = productsObjArr.filter(element =>{
                    return element.categoria === "Panificadora";
                });
                return TemplatesVitrines.vitrineProdutos(ListaPanificadora);
                break;
            case "filterFrutas":
                const ListaFrutas = productsObjArr.filter(element => {
                    return element.categoria === "Frutas";
                })
                return TemplatesVitrines.vitrineProdutos(ListaFrutas);
                break;
            case "filterBebidas":
                const ListaBebidas = productsObjArr.filter(element => {
                    return element.categoria === "Bebidas";
                });
                return TemplatesVitrines.vitrineProdutos(ListaBebidas);
                break;
        }
    }
    static FilterCategorias(){
        buttonCategorias.forEach((element) => {
            element.addEventListener("click", this.ValidacaoCategorias)
        });
    }

    static FilterInput(){
        inputPesquisa.addEventListener("keyup", ()=>{
            const valueInput = document.querySelector("input").value
            const ProdutosPesquisados = productsObjArr.filter(element =>{
                return element.nome.toLowerCase().includes(valueInput.toLowerCase());
            });
            console.log(ProdutosPesquisados)
            return TemplatesVitrines.vitrineProdutos(ProdutosPesquisados);
        });
    };
};


//END dynamic-content-main

//START call-functions
FilterProducts.FilterInput()
TemplatesVitrines.vitrineProdutos(productsObjArr)
FilterProducts.FilterCategorias()
//END call-functions


//START event-listeners

//END event-listeners