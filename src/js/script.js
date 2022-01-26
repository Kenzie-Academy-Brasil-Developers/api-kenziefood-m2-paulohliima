//START global-variables
import {FilterProducts} from "./ClassFilter.js";
import {productsObjArr, createdObjData} from "./requisitionClass.js";
import {ModalProduct} from "./ModalProduct.js"

const vitrineProdutos = document.querySelector("#vitrineProdutos");
const vitrineCarrinho = document.querySelector("#vitrineCarrinho");
const carrinhoVazio = document.querySelector("#cartProducts");
const carrinhoVazioAmount = document.querySelector("#productAmount")
const carrinhoVazioTotal = document.querySelector("#totalAmount")
const spanProductAmount = document.querySelector(".productAcumulator");
const spanPrice = document.querySelector(".totalPrice");
const listCart = document.querySelector("#listCart")

let addedProducts = [];
let productAcumulator = 0;
let productTotal = 0;

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
                    

                </button>
            </div>`

            vitrineProdutos.appendChild(li)

        });

        const buttonAdd = document.querySelectorAll('.addCart')

        for (let i = 0; i < array.length; i++) {


            buttonAdd[i].addEventListener('click', TemplatesVitrines.addProduct)

        }

    }

    static PriceTotal(product, operator) {

        let price = ''

        for (let i = 3; i < product.length; i++) {

            price += product[i];
        }

        if (operator === "somar") {

            console.log(price)

            return productTotal += Number(price);

        } else if (operator === "subtrair") {

            console.log(price)

            return productTotal -= Number(price);
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
    static vitrineModal(){
        

        const select = document.querySelector("#selectProduct")
        select.innerHTML = ""
        const optionDefault = document.createElement("option")
        optionDefault.value= "default"
        optionDefault.innerText = "Selecione o Produto"
        select.appendChild(optionDefault)
        console.log("LIMPOU E ATUALIZOU")
        createdObjData.forEach(element =>{
            const option = document.createElement("option")
            option.innerText = element.nome;
            option.id = element.id;
            select.appendChild(option);
        })
    }
}

//START call-functions

TemplatesVitrines.vitrineProdutos(productsObjArr)
TemplatesVitrines.vitrineModal();
FilterProducts.FilterInput()
FilterProducts.FilterCategorias()

//END call-functions

//START call-functions ModalProduct
ModalProduct.OpenModal();
ModalProduct.CloseModal()
ModalProduct.AdicionarProduto();


//END call-functions ModalProduct

export {TemplatesVitrines}