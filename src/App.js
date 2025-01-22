import React, { useState, useRef, useEffect } from 'react';
import BarraPesquisa from './componentes/BarraPesquisa';
import PopupDetalhesPais from './componentes/PopupDetalhesPais';
import { ProvedorPais, usePais } from './contextos/ContextoPais';
import './estilos/global.css';
import TabelaDados from './componentes/TabelaDados';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';


const App = () => {
    const {
        carregando,
        erro,
        paisesFiltrados,
        pesquisaFocada,
        termoPesquisa,
        aoAlterarPesquisa,
        aoAlterarFocoPesquisa,
        paisSelecionado,
        selecionarPais,
        countries,
    } = usePais();
    const [listaVisivel, setListaVisivel] = useState(false);
    const [indicePaisAtual, setIndicePaisAtual] = useState(0);
    const [pausado, setPausado] = useState(false);
    const referenciaPageView = useRef(null);
    const [textoDigitado, setTextoDigitado] = useState('');
    const [textoCompleto] = useState(`Conheça até ${countries?.length || 250} países, filtre por região e área.`);
    const [digitando, setDigitando] = useState(true);

     useEffect(() => {
       if (digitando && textoDigitado.length < textoCompleto.length) {
          const timeout = setTimeout(() => {
             setTextoDigitado(textoCompleto.slice(0, textoDigitado.length + 1));
           }, 300);
          return () => clearTimeout(timeout);
       } else if (digitando) {
        setTextoDigitado('');
           setDigitando(false);
          setTimeout(() => {
            setDigitando(true);
         }, 1000);
     }
  }, [textoDigitado, textoCompleto, digitando]);

    useEffect(() => {
        if(pesquisaFocada){
           setListaVisivel(true)
      } else {
           setListaVisivel(false)
        }
    }, [pesquisaFocada]);

     useEffect(() => {
         if (paisesFiltrados.length > 0 && !pausado) {
             const timer = setTimeout(() => {
                setIndicePaisAtual((prevIndex) => (prevIndex + 1) % paisesFiltrados.length);
            }, 3000);
              return () => clearTimeout(timer);
          }
      }, [paisesFiltrados, indicePaisAtual, pausado]);

    useEffect(() => {
      if (paisSelecionado && paisesFiltrados.length > 0) {
           const index = paisesFiltrados.findIndex((c) => c === paisSelecionado);
           if (index !== -1) {
               setIndicePaisAtual(index);
                if (referenciaPageView.current) {
                    referenciaPageView.current.scrollTo({
                        left: index * referenciaPageView.current.offsetWidth,
                        behavior: 'smooth',
                    });
                }
           }
        }
    }, [paisesFiltrados, paisSelecionado]);

    const aoClicarPais = (pais) => {
        selecionarPais(pais);
        if (paisesFiltrados.length > 0) {
            const index = paisesFiltrados.findIndex((c) => c === pais);
           if(index !== -1){
                setIndicePaisAtual(index)
            }
        }
    };
    const aoVerMais = () => {
       setPausado(true);
        selecionarPais(paisesFiltrados[indicePaisAtual]);
    };
   const aoFecharPopup = () => {
        setPausado(false);
      selecionarPais(null);
    };
    const paisAtual = paisesFiltrados[indicePaisAtual];
   const dadosDetalhes = paisAtual ? [
        ['Nome', paisAtual.nome],
        ['Capital', paisAtual.capital],
        ['Região', paisAtual.regiao],
        ['Sub-Região', paisAtual.subregiao],
        ['População', paisAtual.populacao.toString()],
        ['Área', paisAtual.area.toString()],
        ['Nome Nativo', paisAtual.nomeNativo],
        ['Fuso Horário', paisAtual.fusosHorarios.join(', ')],
     ]: null;

  return (
    <div className="container">
        <header className="app-cabecalho">
          <h1>Visualizador de Países</h1>
            <div className="header-icons">
              <span className="texto-digitado">{textoDigitado}</span>
                <FaMapMarkerAlt className="map-icon" />
            </div>
        </header>
        <BarraPesquisa
          valor={termoPesquisa}
          aoAlterar={aoAlterarPesquisa}
         aoFocar={aoAlterarFocoPesquisa}
          aoDesfocar={aoAlterarFocoPesquisa}
       />
      {carregando && <div className="carregando">Carregando países...</div>}
        {erro && <div className="mensagem-erro">Erro: {erro}</div>}
        {listaVisivel && paisesFiltrados.length > 0 && (
         <div className="container-lista-paises">
            <ul>
              {paisesFiltrados.map((pais) => (
                <li key={pais.nome}>
                   <button onClick={() => aoClicarPais(pais)} className="item-lista">
                        <span className="nome-pais">{pais.nome}</span>
                            <img
                              src={pais.urlBandeira}
                               alt={`Bandeira de ${pais.nome}`}
                               className="imagem-bandeira-pequena"
                             onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Erro+ao+carregar+imagem'}
                            />
                        </button>
                    </li>
                 ))}
              </ul>
        </div>
       )}
       <div className='container-slideshow'>
        {paisAtual && (
            <div className="slideshow-container">
                <div className='imagem-container'>
                     <img
                           src={paisAtual.urlBandeira}
                         alt={`Bandeira de ${paisAtual.nome}`}
                         className="slideshow-imagem-bandeira"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Erro+ao+carregar+imagem'}
                         />
                  </div>
                <div className='detalhes-container'>
                      {dadosDetalhes && <TabelaDados dados={dadosDetalhes} />}
                      <div className="botao-ver-mais-container">
                            <button className="botao-ver-mais" onClick={aoVerMais}>Ver Mais</button>
                       </div>
               </div>
          </div>
        )}
     </div>
       {paisSelecionado && (
            <PopupDetalhesPais
                pais={paisSelecionado}
              aoFechar={aoFecharPopup}
           />
        )}
      <footer className="app-footer">
            <div className='footer-content'>
              <div className="footer-links">
                 <a href="https://github.com/silvacrac/countryviewV1" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="footer-icon" />
                  </a>
                 <a href="https://www.linkedin.com/in/eduardo-da-silva-119272344" target="_blank" rel="noopener noreferrer">
                     <FaLinkedin className="footer-icon" />
                </a>
               <a href="mailto:eduardosilvarui@gmail.com" target="_blank" rel="noopener noreferrer">
                  <FaEnvelope className="footer-icon" />
                 </a>
               </div>
                <div className="footer-info">
                  <p className='footer-item'>Beira,Sofala</p>
                    <p className='footer-item'>Contato: +258 848757469</p>
                </div>
           </div>
        </footer>
    </div>
  );
};

const AppComProvedores = () => (
  <ProvedorPais>
    <App />
  </ProvedorPais>
);

export default AppComProvedores;