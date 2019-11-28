const functions = require('firebase-functions')
const json2csv = require('json2csv').parse

exports.calcCsvExport = functions.https.onRequest((request, response) => {
  const csv = json2csv(request.body)
  response.setHeader(
    'Content-disposition',
    `attachment; filename=${request.body.name}.csv`
  )
  response.set('Content-Type', 'text/csv')
  response.status(200).send(csv)
})
