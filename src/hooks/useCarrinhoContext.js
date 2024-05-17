import { useContext, useEffect } from "react";
import { CarrinhoContext } from '@/context/CarrinhoContext';
import Produto from './../components/Produtos/Produto/index';

export const useCarrinhoContext = () => {
    const {carrinho, setCarrinho, quantidade, setQuantidade} = useContext(CarrinhoContext);

    function mudarQuantidade (id, quantidade) {
        carrinho.map((itemDoCarrinho) => {
            if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho;
        })
    }

    function adicionarProduto (novoProduto) {
        const temOProduto = carrinho.some((itemDoCarrinho) => {
        return itemDoCarrinho.id === novoProduto.id
        });

        if(!temOProduto) {
            novoProduto.quantidade = 1;
            return setCarrinho((carrinhoAnterior) => [
                ...carrinhoAnterior,
                novoProduto,
            ]);
        };

        const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);

        setCarrinho([...carrinhoAtualizado]);
    };
    
    function removerProduto(id) {
        const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
        const ehOUltimo = produto.quantidade === 1;
        if (ehOUltimo) {
            return setCarrinho((carrinhoAnterior) => 
                carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
            );
        };

        const carrinhoAtualizado = mudarQuantidade(id, -1);

        setCarrinho([...carrinhoAtualizado]);
    }

    function removerProdutoCarrinho(id) {
        const produto = carrinho.filter((itemDoCarrinho) => (itemDoCarrinho.id !== id));
        setCarrinho(produto);
    }

    useEffect(() => {
       const {totalTemp, quantidadeTemp} = carrinho.reduce(
            (acumulador, produto) => ({
                quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
                totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade
            }),
            {
                quantidadeTemp: 0,
                totalTemp: 0
            }
        );
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    }, [carrinho]);

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTotal,
        quantidade
    };
};