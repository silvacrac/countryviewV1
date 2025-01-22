class Pais {
    constructor({ name, capital, region, subregion, population, area, timezones, flags, nativeName }) {
        this.nome = name?.common || 'N/A';
        this.capital = capital?.length > 0 ? capital[0] : 'N/A';
        this.regiao = region || 'N/A';
        this.subregiao = subregion || 'N/A';
        this.populacao = population || 0;
        this.area = area || 0.0;
        this.fusosHorarios = timezones || [];
        this.nomeNativo = this._extrairNomeNativo(nativeName);
        this.urlBandeira = flags?.png || '';
    }
  
    _extrairNomeNativo(nativeName) {
      if (!nativeName) return 'N/A';
       const firstKey = Object.keys(nativeName)[0];
        if (!firstKey) return 'N/A';
         const nameData = nativeName[firstKey];
        if (!nameData) return 'N/A';
  
        return nameData.common || 'N/A';
    }
  }
  
  export default Pais;