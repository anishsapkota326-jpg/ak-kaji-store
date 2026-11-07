exports.handler = async () => {
  try {
    const API_KEY = process.env.MATRIX_API_KEY;
    const res = await fetch("https://api.matrixgamingstore.com/api/wallet", {
      headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" }
    });
    const text = await res.text();
    return { statusCode: 200, headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}, body: text };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({error: e.message}) };
  }
};
