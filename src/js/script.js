//START global-variables
import { FilterProducts } from "./ClassFilter.js";
import { productsObjArr, createdObjData } from "./requisitionClass.js";
import { ModalProduct } from "./ModalProduct.js"

const vitrineProdutos = document.querySelector("#vitrineProdutos");
const vitrineCarrinho = document.querySelector("#vitrineCarrinho");
const carrinhoVazio = document.querySelector("#cartProducts");
const carrinhoVazioAmount = document.querySelector("#productAmount")
const carrinhoVazioTotal = document.querySelector("#totalAmount")
const spanProductAmount = document.querySelector(".productAcumulator");
const spanPrice = document.querySelector(".totalPrice");
const listCart = document.querySelector("#listCart")

let productAcumulator = 0;
let productTotal = 0;
let ProdutosArmazenados = JSON.parse(localStorage.getItem('addedProducts')) || []
let addedProducts = [...ProdutosArmazenados];

class TemplatesVitrines {

    static vitrineProdutos(array) {

        vitrineProdutos.innerHTML = ""

        array.forEach((element) => {

            const li = document.createElement("li")
            li.id = element.id
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
        console.log(clickedButton.id)
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
            <button class="removeCart"></button>
            `

        vitrineCarrinho.appendChild(li);

        let element = productsObjArr.find((element) => {
            return element.id === Number(clickedButton.id)
        });

        addedProducts.push(element);
        console.log(addedProducts, element)

        localStorage.setItem('addedProducts', JSON.stringify([...addedProducts]))

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
    static vitrineModal(arrData) {


        const select = document.querySelector("#selectProduct")
        select.innerHTML = ""
        const optionDefault = document.createElement("option")
        optionDefault.value = "default"
        optionDefault.innerText = "Selecione o Produto"
        select.appendChild(optionDefault)
        arrData.forEach(element => {
            const option = document.createElement("option")
            option.innerText = element.nome;
            option.id = element.id;
            select.appendChild(option);
        })
    }
    static localStorage() {

        if (ProdutosArmazenados) {
            console.log(ProdutosArmazenados)
            ProdutosArmazenados.forEach((element) => {

                const li = document.createElement("li");

                li.innerHTML =
                    `<img src=${element.imagem} alt="${element.nome}">
                    <div>
                        <h3>${element.nome}</h3>
                        <span class="categoria">${element.categoria}</span>
                        <span class="price">R$ ${element.preco}</span>
                    </div>
                <button class="removeCart"></button>
                `

                carrinhoVazio.className = "emptyCart";
                carrinhoVazioAmount.className = "productAmount";
                carrinhoVazioTotal.className = "totalAmount";
                productAcumulator = ProdutosArmazenados.length;
                spanProductAmount.innerText = productAcumulator;
                productTotal += element.preco;
                spanPrice.innerText = `R$ ${productTotal}`;

                listCart.className = "listCartActive"
                const buttonRemove = document.querySelectorAll('.removeCart');
                vitrineCarrinho.appendChild(li);

                buttonRemove[ProdutosArmazenados.length - 1].addEventListener('click', (event) => {

                    let clickedButton = event.target.closest('li');
                    let divChildren = clickedButton.children[1]
                    ProdutosArmazenados.splice(clickedButton, 1);
                    TemplatesVitrines.PriceTotal(divChildren.children[2].innerText, "subtrair")
                    productAcumulator--;
                    productAcumulator = ProdutosArmazenados.length;
                    spanProductAmount.innerText = productAcumulator;
                    spanPrice.innerText = `R$ ${productTotal}`;
               });
            });
        }

    }
}

//START call-functions

TemplatesVitrines.vitrineProdutos(productsObjArr)
TemplatesVitrines.vitrineModal(createdObjData);
TemplatesVitrines.localStorage();
FilterProducts.FilterInput();
FilterProducts.FilterCategorias();

//END call-functions

//START call-functions ModalProduct
ModalProduct.OpenModal();
ModalProduct.CloseModal()
ModalProduct.AdicionarProduto();
ModalProduct.RemoverProduto();


//END call-functions ModalProduct

export { TemplatesVitrines }