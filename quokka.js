let fetch = require('isomorphic-fetch');

fetch('http://localhost:3020/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  
  body: JSON.stringify({
    query: "query { ping(message:\"qokkka\") { message } }"
//      query: "mutation {addTag(type:\"asd\",label:\"asd\") {id}}"
  })
})
.then(res => {
    return res.json()
})
.then(res => console.log(res.data));