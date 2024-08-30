import React, { useState, useEffect } from "react";
import axios from "axios";
import dolar from "../../assets/dolar.png";
import "./styles.css";
import { Link } from "react-router-dom";
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
    <>
      <div>
        <img src={dolar} alt="" className="img-dolar" />
        <h1 className="h1">
          Cotação do Dólar Hoje:{" "}
          {cotacao ? `R$ ${cotacao} BRL` : "Carregando..."}
        </h1>
        <div className="inputDolar">
          <label htmlFor="">Digite o valor em dólar:</label>
          <input
            type="number"
            placeholder="Ex: $1,000"
            value={valorDolar}
            onChange={(e) => setValorDolar(e.target.value)}
          />
          <button onClick={calcularValor}>Calcular em reais</button>
          {valorReal && <h2>Valor em reais: R$ {valorReal}</h2>}

          <Link to={"/euro"}>
            <button>Cotação Do Euro</button>
          </Link>
        </div>
      </div>

      <footer>
        <p>© 2023 - Vinícius Salles</p>
      </footer>
    </>
  );
};

export default CotacaoDolar;
