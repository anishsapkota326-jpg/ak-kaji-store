exports.handler = async (event) => {
  try {
    const API_KEY = process.env.MATRIX_API_KEY;
    const res = await fetch("https://api.matrixgamingstore.com/api/orders", {
      method: "POST",
      headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" },
      body: event.body
    });
    const text = await res.text();
    return { statusCode: 200, headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}, body: text };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({error: e.message}) };
  }
};
