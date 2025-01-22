import React from 'react';
import '../estilos/global.css';

const TabelaDados = ({ dados }) => {
    if (!dados || dados.length === 0) {
      return <div className="sem-dados">Sem dados</div>;
    }
    return (
      <div className="tabela-container">
        <table className="tabela-customizada">
          <thead>
            <tr>
              <th className="celula-cabecalho">Atributo</th>
              <th className="celula-cabecalho">Valor</th>
            </tr>
          </thead>
          <tbody>
              {dados.map((linha, indice) => (
                 <tr key={indice}>
                 {linha.map((celula, indiceCelula) => (
                   <td key={indiceCelula} className="celula-dados">
                     {celula}
                   </td>
                ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default TabelaDados;