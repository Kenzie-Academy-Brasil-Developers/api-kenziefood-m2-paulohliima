import {productsObjArr} from "./requisitionClass.js"
import {TemplatesVitrines} from "./script.js"

const buttonCategorias = document.querySelectorAll("#buttonCategoria");
const inputPesquisa = document.querySelector("input");

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

            element.addEventListener("click", FilterProducts.ValidacaoCategorias)
            
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

export {FilterProducts}