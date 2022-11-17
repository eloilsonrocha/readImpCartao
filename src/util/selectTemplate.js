const selectTemplate = (clientUpperCase ) => {

  let templatName = ""

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
      templatName = "templatValpariso.ejs"
      break;
    default:
      return { message: 'Fresquim né?!, cliente inexistente ou nome digitado errado', example: clients }
  }

  return templatName;
}

module.exports = selectTemplate;