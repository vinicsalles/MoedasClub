import React, { useState, useEffect } from "react";
import axios from "axios";
import euro from "../../assets/euro.jpg";
import "./styles.css";
import { Link } from "react-router-dom";

const CotacaoEuro = () => {
  const [cotacao, setCotacao] = useState(null);
  const [valorEuro, setValorEuro] = useState("");
  const [valorReal, setValorReal] = useState("");

  useEffect(() => {
    axios
      .get("https://economia.awesomeapi.com.br/json/last/EUR-BRL")
      .then((response) => {
        const data = response.data.EURBRL;
        setCotacao(parseFloat(data.bid).toFixed(2));
      })
      .catch((error) => console.error("Erro ao obter cotação", error));
  }, []);

  const calcularValor = () => {
    if (cotacao && valorEuro) {
      setValorReal((valorEuro * cotacao).toFixed(2));
    }
  };

  return (
    <>
      <div>
        <img
          src={euro}
          alt="Imagem de uma moeda de Euro"
          width={626}
          height={264}
          className="img-euro"
        />
        <h1 className="h1">
          Cotação do Euro Hoje:{" "}
          {cotacao ? `R$ ${cotacao} BRL` : "Carregando..."}
        </h1>
        <div className="inputDolar">
          <label htmlFor="valor-euro">Digite o valor em Euro:</label>
          <input
            id="valor-euro"
            type="number"
            placeholder="Ex: €1,000"
            value={valorEuro}
            onChange={(e) => setValorEuro(e.target.value)}
          />
          <button onClick={calcularValor} disabled={!valorEuro}>
            Calcular em reais
          </button>
          {valorReal && <h2>Valor em reais: R$ {valorReal}</h2>}
          <Link to={"/"}>
            <button>Cotação Do Dolar</button>
          </Link>
        </div>
      </div>

      <footer>
        <p>© 2023 - Vinícius Salles</p>
      </footer>
    </>
  );
};

export default CotacaoEuro;
