class authJwt {
  constructor() {
    this.tempoToken = "";
    this.answr = "salah";
  }
  getToken(tempoToken) {
    this.tempoToken = tempoToken;
    // this.verifToken(tempoToken);
  }
  verifToken(token) {
    console.log("token " + token);
    console.log("tempo token " + this.tempoToken);
    if (token == this.tempoToken) {
      return "benar";
    }
    return "salah";
  }
}
export default authJwt;
