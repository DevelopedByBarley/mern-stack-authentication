const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500 // Bejön a status ha a van akkor elmentjük ha nincs akkor 500

  res.status(statusCode) //statusCode statusként valo elmentése

  res.json({ // Küldés
    message: err.message, 
    stack: process.env.NODE_ENV === 'production' ? null : err.stack // Ha a NODE_ENV dev modban van akkor elküldjük az error stacket, ha nem akkor null
  })
}

module.exports = { // Exportáljuk
  errorHandler
}