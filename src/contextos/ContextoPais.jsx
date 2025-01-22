import React, { createContext, useState, useContext, useMemo } from 'react';
import usePaises from '../hooks/usePaises';

const ContextoPais = createContext();
const ProvedorPais = ({ children }) => {
  const { paises, carregando, erro, refetch } = usePaises();
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [pesquisaFocada, setPesquisaFocada] = useState(false);
  const [paisSelecionado, setPaisSelecionado] = useState(null);

   const paisesFiltrados = useMemo(() => {
     if (!termoPesquisa) {
         return paises;
     }
      return paises.filter(pais =>
       pais.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
     );
   }, [paises, termoPesquisa]);

   const aoAlterarPesquisa = (evento) => {
       setTermoPesquisa(evento.target.value);
   };

   const aoAlterarFocoPesquisa = (evento) => {
       setPesquisaFocada(evento.type === 'focus');
   }


  const selecionarPais = (pais) => {
    setPaisSelecionado(pais)
  }

   const valor = useMemo(() => ({
    paises,
    carregando,
    erro,
    refetch,
    termoPesquisa,
    pesquisaFocada,
    paisesFiltrados,
    paisSelecionado,
    aoAlterarPesquisa,
    aoAlterarFocoPesquisa,
    selecionarPais,
  }), [
    paises,
    carregando,
    erro,
    refetch,
    termoPesquisa,
    pesquisaFocada,
    paisesFiltrados,
    paisSelecionado,
    aoAlterarPesquisa,
    aoAlterarFocoPesquisa,
    selecionarPais,
   ]);


  return (
    <ContextoPais.Provider value={valor}>
      {children}
    </ContextoPais.Provider>
  );
};
const usePais = () => {
    const contexto = useContext(ContextoPais);
    if(!contexto){
        throw new Error('usePais deve ser usado dentro de um ProvedorPais')
    }
    return contexto
};
export { ProvedorPais, usePais };