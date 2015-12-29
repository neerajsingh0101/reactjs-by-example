class JSONUtil{
  static parseJSON(response){
    return response.json()
  }

  static handleParseException(ex) {
    console.log('parsing failed', ex)
  }
}

export { JSONUtil as default }
