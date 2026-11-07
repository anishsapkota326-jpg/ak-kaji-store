exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }
  try {
    const body = JSON.parse(event.body);
    const variant_id = body.variant_id;
    const uid = body.uid || body.player_uid;
    const username = body.username || body.player_username;
    const isMembership = body.isMembership || false;
    const client_order_id = 'AK-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    let player_data;
    if (isMembership) {
      player_data = { "player_uid": String(uid), "player_username": String(username) };
    } else {
      player_data = { "Player Uid": String(uid), "Enter your USERNAME": String(username) };
    }
    const res = await fetch('https://matrixgamingstore.com/api/v1/reseller/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MATRIX_API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Idempotency-Key': client_order_id
      },
      body: JSON.stringify({ client_order_id, variant_id: Number(variant_id), quantity: 1, player_data })
    });
    const data = await res.json();
    return { statusCode: res.status, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
