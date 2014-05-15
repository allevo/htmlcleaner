var cheerio = require('cheerio')
var request = require('request')
var _ = require('lodash')


var express = require('express')
var app = express()

function Gazzetta(url) {
  this.url = url
}
Gazzetta.prototype.parse = function(callback) {
  request(this.url, function(err, response, body) {
    $ = cheerio.load(body)
    var headers = $('.container-header-article > *')
      .filter(function(i, el) {
        return el.name === 'h1' || el.name === 'h2'
      })
      .map(function(i, el) {
        return $(this).text()
      })
      .toArray()

    var content = $('.desc-article')
      .map(function(i, el) {
        return $(this).text()
      })
      .toArray()

    callback(null [headers, content])
  })
}

var parser = {
  gazzetta: {
    regex: /www\.gazzetta\.it/,
    parser: Gazzetta
  }
}

app.get('/parse', function(req, res) {
  var url = req.query.url
  console.log(req.query, url)

  if (!url) {
    return res.json(400, { error: 'You must specify an url' })
  }

  for(var name in parser) {
    if (!url.match(parser[name].regex)) continue;
    var parser = new parser[name].parser(url)
    parser.parse(function(err, parsed) {
      res.json({parsed: parsed})
    })
  }
  res.json({error: 'Unknown'})
})

if (require.main === module) {
  app.listen(3000, function() {
      console.log('start on http://localhost:3000 in ' + process.env.NODE_ENV)
  })
}




/*
var url = 'http://www.gazzetta.it/Nuoto/07-05-2014/nuoto-pellegrini-segnata-giochi-londra-ora-penso-solo-rio-80596557935.shtml'

*/

/*
var url = 'http://edition.cnn.com/2014/05/14/world/europe/uk-teenage-cancer-fundraiser/index.html'
request(url, function(err, response, body) {
  $ = cheerio.load(body)
  var headers = [ $('.cnn_storyarea > h1')
    .text()
  ]

  var content = $('.cnn_storyarea .cnn_storypgraphtxt')
    .map(function(i, el) {
      return $(this).text()
    })
    .toArray()

  console.log(headers, content)
})
*/

/*
var url = 'http://www.bbc.com/news/world-africa-27424064'
request(url, function(err, response, body) {
  $ = cheerio.load(body)
  var headers = [ $('.story-body > h1.story-header')
    .text()
  ]

  var content = $('.story-body > p')
    .map(function(i, el) {
      return $(this).text()
    })
    .toArray()

  console.log(headers, content)
})
*/