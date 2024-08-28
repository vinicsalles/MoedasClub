import React, { useState, useEffect } from "react";
import axios from "axios";

const CotacaoDolar = () => {
  const [cotacao, setCotacao] = useState(null);
  const [valorDolar, setValorDolar] = useState("");
  const [valorReal, setValorReal] = useState("");

  useEffect(() => {
    axios
      .get("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then((response) => {
        const data = response.data.USDBRL;
        setCotacao(parseFloat(data.bid).toFixed(2));
      })
      .catch((error) => console.error("Erro ao obter cotação", error));
  }, []);

  const calcularValor = () => {
    if (cotacao && valorDolar) {
      setValorReal((valorDolar * cotacao).toFixed(2));
    }
  };

  return (
    <div>
      <h1>Cotação do Dólar: {cotacao ? `R$ ${cotacao}` : "Carregando..."}</h1>
      <input
        type="number"
        placeholder="Digite o valor em dólares"
        value={valorDolar}
        onChange={(e) => setValorDolar(e.target.value)}
      />
      <button onClick={calcularValor}>Calcular em Reais</button>
      {valorReal && <h2>Valor em Reais: R$ {valorReal}</h2>}
    </div>
  );
};

export default CotacaoDolar;
