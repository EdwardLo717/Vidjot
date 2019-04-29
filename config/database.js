if (process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI:'mongodb://edwardlo:Loh1218@ds131971.mlab.com:31971/heroku_lfhhd830'}
} else {
  module.exports = {mongoURI:'mongodb://localhost/vidjot-dev'}; 
  //module.exports = {mongoURI:'mongodb://edwardlo:Loh1218@ds131971.mlab.com:31971/heroku_lfhhd830'}
}