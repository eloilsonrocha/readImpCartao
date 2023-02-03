const clients = require("./clientsList");

const selectTemplate = (response, client ) => {

  let templatName = ""
  let clientUpperCase = client.toUpperCase();

    switch (clientUpperCase) {
    case "AQUIRAZ":
      templatName = "templatAquiraz.ejs"
      break;
    case "GUARAMIRANGA":
      templatName = "templatGuaramiranga.ejs"
      break;
    case "HORIZONTE":
      templatName = "templatHorizonte.ejs"
      break;
    case "ITAITINGA":
      templatName = "templatItaitinga.ejs"
      break;
    case "MULUNGU":
      templatName = "templatMulungu.ejs"
      break;
    case "OEIRAS":
      templatName = "templatOeiras.ejs"
      break;
    case "RUSSAS":
      templatName = "templatRussas.ejs"
      break;
    case "SÃO PEDRO":
      templatName = "templatSaoPedro.ejs"
      break;
    case "SERRA DO MEL":
      templatName = "templatSerraDoMel.ejs"
      break;
    case "VALPARAÍSO":
      templatName = "templatValparaiso.ejs"
      break;
    case "CIDADE OCIDENTAL":
      templatName = "templatCidadeOcidental.ejs"
      break;
    default:
      return response.status(400).json({ message: 'Cliente inexistente ou nome digitado errado', example: clients })
  }

  return templatName;
}

module.exports = selectTemplate;