import React from 'react';
import '../estilos/global.css'

const CartaoPais = ({ pais }) => {
  return (
    <div className="cartao-pais">
    <h3>{pais.nome}</h3>
    <p>Capital: {pais.capital}</p>
    <p>Região: {pais.regiao}</p>
    <p>Sub-região: {pais.subregiao}</p>
    <p>População: {pais.populacao}</p>
    <p>Área: {pais.area}</p>
    <p>Nome Nativo: {pais.nomeNativo}</p>
    <p>Fuso Horário: {pais.fusosHorarios.join(', ')}</p>
    <img src={pais.urlBandeira} alt={`Bandeira de ${pais.nome}`} className='imagem-bandeira'
      onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Erro+ao+carregar+imagem'}/>
  </div>
  );
};
export default CartaoPais;