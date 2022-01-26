//START global-variables
const vitrineProdutos = document.querySelector("#vitrineProdutos");
const vitrineCarrinho = document.querySelector("#vitrineCarrinho");
const buttonCategorias = document.querySelectorAll("#buttonCategoria");
const inputPesquisa = document.querySelector("input");
const carrinhoVazio = document.querySelector("#cartProducts");
const carrinhoVazioAmount = document.querySelector("#productAmount")
const carrinhoVazioTotal = document.querySelector("#totalAmount")
const spanProductAmount = document.querySelector(".productAcumulator");
const spanPrice = document.querySelector(".totalPrice");
const listCart = document.querySelector("#listCart")

let addedProducts = [];
let productAcumulator = 0;
let productTotal = 0;


const apiURL = "https://kenzie-food-api.herokuapp.com/product"


//END global-variables

//START dynamic-content-header

//END dynamic-content-header

//START dynamic-content-main

// 


class RequistionAPI {

    static async RequisitionData() {

        const response = await fetch(apiURL)
        const data = await response.json()

        return data;
    }

}

let productsObjArr = await RequistionAPI.RequisitionData()

class TemplatesVitrines {

    static vitrineProdutos(array) {

        vitrineProdutos.innerHTML = ""

        array.forEach((element) => {

            const li = document.createElement("li")

            li.innerHTML =

                `<img src=${element.imagem} alt=${element.nome}>
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

        for (let i = 0; i < productsObjArr.length; i++) {

            const buttonAdd = document.querySelectorAll('.addCart')

            buttonAdd[i].addEventListener('click', this.addProduct)

        }

    }

    static PriceTotal(product,operator) {
        let price = ''
        for (let i = 3; i < product.length; i++) {
            price += product[i];
        }
        if(operator === "somar"){
            console.log(price)
            return productTotal+=Number(price);
        }else if (operator === "subtrair"){
            console.log(price)
            return productTotal-=Number(price);
        }
        
    }

    static addProduct(event) {

        let clickedButton = event.target.closest('li');

        let imgSrc = clickedButton.children[0].src;
        let productName = clickedButton.children[2];
        let productCategory = clickedButton.children[1];
        let productPrice = clickedButton.children[4];

        const li = document.createElement("li");

        li.innerHTML =

            `<img src=${imgSrc} alt="${productName.innerText}">
            <div>
                <h3>${productName.innerText}</h3>
                <span class="categoria">${productCategory.innerText}</span>
                <span class="price">${productPrice.innerText}</span>
            </div>
            <button class="removeCart">
                <img src="./src/icons/icon-trash.png" alt="Icone RemoveCart">
            </button>
            `

        vitrineCarrinho.appendChild(li);
        addedProducts.push(li);
        productAcumulator++
        TemplatesVitrines.PriceTotal(productPrice.innerText, "somar")
        console.log(productTotal)

        spanPrice.innerText = `R$ ${productTotal}`;
        carrinhoVazio.className = "emptyCart";
        carrinhoVazioAmount.className = "productAmount";
        carrinhoVazioTotal.className = "totalAmount";
        listCart.className = "listCartActive"
        spanProductAmount.innerText = productAcumulator;


        const buttonRemove = document.querySelectorAll('.removeCart');
        console.log(buttonRemove[addedProducts.length - 1])
        buttonRemove[addedProducts.length - 1].addEventListener('click', (event) => {
            let clickedButton = event.target.closest('li');
            let divChildren = clickedButton.children[1]
            addedProducts.splice(clickedButton, 1);
            TemplatesVitrines.PriceTotal(divChildren.children[2].innerText, "subtrair")
            
            spanPrice.innerText = `R$ ${productTotal}`;
            productAcumulator--;
            spanProductAmount.innerText = productAcumulator;
            if (productAcumulator === 0) {
                carrinhoVazio.className = "emptyCartNone";
                carrinhoVazioAmount.className = "emptyCart";
                carrinhoVazioTotal.className = "emptyCart";
                listCart.className = "listCart";
            }
            vitrineCarrinho.removeChild(clickedButton);
        });
    }
}

class FilterProducts {

    static ValidacaoCategorias(button) {
        switch (button.target.className) {

            case "filterTodos":
                return TemplatesVitrines.vitrineProdutos(productsObjArr);
                break;

            case "filterPanificadora":
                const ListaPanificadora = productsObjArr.filter(element => {
                    return element.categoria === "Panificadora";
                });
                return TemplatesVitrines.vitrineProdutos(ListaPanificadora);
                break;

            case "filterFrutas":
                const ListaFrutas = productsObjArr.filter(element => {
                    return element.categoria === "Frutas";
                });
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
    static FilterCategorias() {

        buttonCategorias.forEach((element) => {
            element.addEventListener("click", this.ValidacaoCategorias)
        });

    }

    static FilterInput() {

        inputPesquisa.addEventListener("keyup", () => {

            const valueInput = document.querySelector("input").value
            const ProdutosPesquisados = productsObjArr.filter(element => {

                return element.nome.toLowerCase().includes(valueInput.toLowerCase());

            });


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