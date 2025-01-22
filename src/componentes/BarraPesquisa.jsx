
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import '../estilos/global.css'

const BarraPesquisa = ({ valor, aoAlterar, aoFocar, aoDesfocar }) => {
  return (
    <div className='container-pesquisa'>
      <AiOutlineSearch className='icone-pesquisa' />
      <input
        type="text"
        placeholder="Pesquisar país..."
        value={valor}
        onChange={aoAlterar}
        onFocus={aoFocar}
        onBlur={aoDesfocar}
        className='input-pesquisa'
      />
    </div>
  );
};
export default BarraPesquisa;
