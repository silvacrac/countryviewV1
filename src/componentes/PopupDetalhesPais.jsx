import React, { useRef, useState, useCallback } from 'react';
import TabelaDados from './TabelaDados';
import '../estilos/global.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaFileCsv, FaFileCode, FaGlobe } from 'react-icons/fa';

const PopupDetalhesPais = ({ pais, aoFechar }) => {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const dialogRef = useRef(null);
    const abrirGoogleMaps = useCallback(() => {
        if (pais) {
          const capital = pais.capital;
          const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(capital)}`;
            window.open(url, '_blank');
        }
   }, [pais]);

 const exportarDados = async (formato) => {
    setCarregando(true);
    setErro(null);
    try {
      let dados, nomeArquivo;
      const data = [
              ["VisualizadorPaises"],
               [""],
             ["URL da Bandeira"],
              [pais.urlBandeira],
               [''],
              ['Atributo', 'Valor'],
             ['Nome', pais.nome],
              ['Capital', pais.capital],
               ['Região', pais.regiao],
              ['Sub-Região', pais.subregiao],
            ['População', pais.populacao.toString()],
              ['Área', pais.area.toString()],
              ['Nome Nativo', pais.nomeNativo],
             ['Fuso Horário', pais.fusosHorarios.join(', ')],
          ];
       if(formato === 'xls'){
          const wb = XLSX.utils.book_new();
         const ws = XLSX.utils.aoa_to_sheet(data);
           XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          dados = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
           nomeArquivo =  `dados_pais_${pais.nome}.xlsx`;
      } else if (formato === 'csv') {
        dados = data.map(row => row.join(',')).join('\n')
        nomeArquivo = `dados_pais_${pais.nome}.csv`;
       }
     else {
          const xmlString = `
             <visualizadorPaises>
                <titulo>VisualizadorPaises</titulo>
                   <urlBandeira>${pais.urlBandeira}</urlBandeira>
                     <detalhes>
                         <nome>${pais.nome}</nome>
                        <capital>${pais.capital}</capital>
                          <regiao>${pais.regiao}</regiao>
                          <subregiao>${pais.subregiao}</subregiao>
                         <populacao>${pais.populacao}</populacao>
                           <area>${pais.area}</area>
                         <nomeNativo>${pais.nomeNativo}</nomeNativo>
                        <fusosHorarios>${pais.fusosHorarios.join(', ')}</fusosHorarios>
                      </detalhes>
                  </visualizadorPaises>
            `;
           const xmlDoc = new DOMParser().parseFromString(xmlString, 'application/xml');
          const serializer = new XMLSerializer();
           dados = serializer.serializeToString(xmlDoc);
         nomeArquivo = `dados_pais_${pais.nome}.xml`;
       }
       const blob = new Blob([dados], { type: 'text/plain;charset=utf-8' });
       saveAs(blob, nomeArquivo);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

 const dadosDetalhes = [
    ['Nome', pais.nome],
      ['Capital', pais.capital],
      ['Região', pais.regiao],
    ['Sub-Região', pais.subregiao],
     ['População', pais.populacao.toString()],
     ['Área', pais.area.toString()],
     ['Nome Nativo', pais.nomeNativo],
     ['Fuso Horário', pais.fusosHorarios.join(', ')],
  ];

 return (
    <dialog ref={dialogRef} className='dialog-container'  open  >
      <div className="dialog-content">
        <button className='botao-fechar' onClick={() => aoFechar()}>
          <span  aria-hidden="true">×</span>
        </button>
        <img src={pais.urlBandeira} alt={`Bandeira de ${pais.nome}`} className="imagem-bandeira"
          onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Erro+ao+carregar+imagem'}
        />
        <h2>{pais.nome}</h2>
       <div className="scrollable-content">
         <TabelaDados dados={dadosDetalhes} />
        </div>
        <div className="botoes-exportar">
          <button onClick={() => exportarDados('xls')}><FaFileExcel style={{ marginRight: '5px' }}/>Exportar para XLS</button>
          <button onClick={() => exportarDados('csv')}><FaFileCsv style={{ marginRight: '5px' }}/>Exportar para CSV</button>
          <button onClick={() => exportarDados('xml')}><FaFileCode style={{ marginRight: '5px' }}/>Exportar para XML</button>
          <button className="botao-visitar-pais" onClick={abrirGoogleMaps}> <FaGlobe  style={{ marginRight: '5px' }}/>Visitar País </button>
        </div>
         {carregando && <div>Carregando...</div>}
         {erro && <div className='mensagem-erro'>{erro}</div>}
      </div>
    </dialog>
  );
};

export default PopupDetalhesPais;