import axios from 'axios';

const URL_BASE_API = 'https://restcountries.com/v3.1';

class ServicoApi {
  constructor() {
    console.log("ServicoApi: inicializado");
  }
  async buscarPaises() {
    try {
      console.log("ServicoApi: buscarPaises chamado");
      const resposta = await axios.get(
        `${URL_BASE_API}/all?fields=name,capital,region,subregion,population,area,timezones,flags,nativeName`
      );
      console.log(`ServicoApi: buscarPaises sucesso - Status code: ${resposta.status}`);
      console.log(`ServicoApi: buscarPaises sucesso - Quantidade de dados: ${resposta.data.length}`);
      return resposta.data;
    } catch (erro) {
      console.log("ServicoApi: buscarPaises erro");
      throw new Error(`Falha ao carregar países: ${erro.message}`);
    }
  }
}

export default new ServicoApi();