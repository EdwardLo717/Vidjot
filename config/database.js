if (process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI:'mongodb+srv://edward:Loh1218@cluster0-imetn.mongodb.net/vidjot-prod?retryWrites=true'}
} else {
  module.exports = {mongoURI:'mongodb://localhost/vidjot-dev'}; 
}