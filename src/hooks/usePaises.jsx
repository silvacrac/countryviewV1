import { useState, useEffect, useCallback } from 'react';
import servicoApi from '../servicos/servicoApi';
import Pais from '../modelos/pais';

const usePaises = () => {
  const [paises, setPaises] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarPaises = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dadosPaises = await servicoApi.buscarPaises();
      const instanciasPaises = dadosPaises.map(pais => new Pais(pais));
      setPaises(instanciasPaises);
    } catch (err) {
        setErro(err.message);
    } finally {
       setCarregando(false)
    }
  }, []);

  useEffect(() => {
      buscarPaises();
  }, [buscarPaises]);

  return { paises, carregando, erro, refetch: buscarPaises};
};

export default usePaises;