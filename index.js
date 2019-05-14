const server = require('./server')

// listening
server.listen(8000, ()=> {
  console.log('\n*** Server is running on http://localhost:8000 ***\n');

});
