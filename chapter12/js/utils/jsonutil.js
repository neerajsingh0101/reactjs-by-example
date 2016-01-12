var JSONUtil = (function () {
  function parseJSON(response){
    return response.json()
  }

  function handleParseException(ex) {
    console.log('parsing failed', ex)
  }


  return {'parseJSON': parseJSON}
  return {'handleParseException': handleParseException}
}());

module.exports = JSONUtil;
