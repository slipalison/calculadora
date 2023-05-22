//https://brapi.dev/api/quote/list?sortBy=close&sortOrder=desc&limit=10&search=PETR4%2BBSE3%2BEEF3%2MXRF11%2HGLG11
//https://brapi.dev/api/quote/PETR4%2BBSE3%2BEEF3%2MXRF11%2HGLG11?range=1d&interval=1d&fundamental=true&dividends=true

// Metas
const metas = [
    { tipo: 'Renda Fixa', meta: 0.2 },
    { tipo: 'Renda Variável', meta: 0.2 },
    { tipo: 'FII', meta: 0.3 },
    { tipo: 'ETF', meta: 0.3 },

  ];
  
  // Notas dos ativos
  const notasAtivos = [
    { ativo: 'PETR4', nota: 4, tipo: 'Renda Variável' },
    { ativo: 'BBSE3', nota: 5, tipo: 'Renda Variável' },
    { ativo: 'BEEF3', nota: 8, tipo: 'Renda Variável' },
    { ativo: 'MXRF11', nota: 6, tipo: 'FII' },
    { ativo: 'HGLG11', nota: 8, tipo: 'FII' },
    { ativo: 'QQQ', nota: 8, tipo: 'ETF' }
  ];
  
  // Valores já investidos
  const valoresInvestidos = {
    'Renda Fixa': 5,
    'Renda Variável': 300,
    'FII': 1000,
    'ETF': 0
  };
  
  // Função para calcular a alocação dos aportes
  function calcularAlocacaoAportes(aporteTotal, metas, notasAtivos, valoresInvestidos) {
    const alocacaoAportes = [];
  
    // Cálculo da alocação para cada meta
    for (const meta of metas) {
      const tipo = meta.tipo;
      const metaAtual = meta.meta;
      const valorAtual = valoresInvestidos[tipo];
      const valorMeta = aporteTotal * metaAtual;
  
      let valorAlocado = valorMeta - valorAtual;
  
      // Verifica se a alocação é negativa (já atingiu a meta)
      if (valorAlocado < 0) {
        valorAlocado = 0;
      }
  
      // Distribui a alocação de acordo com as notas dos ativos
      const ativosDoTipo = notasAtivos.filter(ativo => ativo.tipo === tipo);
      const totalNotas = ativosDoTipo.reduce((total, ativo) => total + ativo.nota, 0);
  
      const alocacaoAtivos = ativosDoTipo.map(ativo => ({
        ativo: ativo.ativo,
        tipo: ativo.tipo,
        valor: (ativo.nota / totalNotas) * valorAlocado,
        porcentagem: ((ativo.nota / totalNotas) * valorAlocado) / aporteTotal * 100
      }));
  
      alocacaoAportes.push(...alocacaoAtivos);
    }
  
    // Alocar valor para Renda Fixa
    const metaRendaFixa = metas.find(meta => meta.tipo === 'Renda Fixa');
    const valorMetaRendaFixa = aporteTotal * metaRendaFixa.meta;
    const valorAlocadoRendaFixa = valorMetaRendaFixa - valoresInvestidos['Renda Fixa'];
  
    alocacaoAportes.push({
      ativo: 'Renda Fixa',
      tipo: 'Renda Fixa',
      valor: valorAlocadoRendaFixa,
      porcentagem: (valorAlocadoRendaFixa / aporteTotal) * 100
    });
  
    return alocacaoAportes;
  }
  
  // Exemplo de uso
  const aporteTotal = 10000;
  const alocacaoAportes = calcularAlocacaoAportes(aporteTotal, metas, notasAtivos, valoresInvestidos);
  
  // Imprime a alocação dos aportes
  for (const alocacao of alocacaoAportes) {
    console.log(`Ativo: ${alocacao.ativo}, Tipo: ${alocacao.tipo}, Valor: R$${alocacao.valor.toFixed(2)}, Porcentagem: ${alocacao.porcentagem.toFixed(2)}%`);
  }