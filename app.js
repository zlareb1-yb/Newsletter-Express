const express = require("express")
const bodyparser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req, res) {
  let firstName = req.body.fName
  let lastName = req.body.lName
  let email = req.body.email

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data)
  const url = "https://us8.api.mailchimp.com/3.0/lists/2fe692651a"
  const options = {
    method: "POST",
    auth: "zlareb1:11afd38362d494a88f804167f4b5cd2c-us8"
  }

    const request = https.request(url, options, function(response) {
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      } else {
        res.sendFile(__dirname + "/failure.html")
      }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      });
    });

    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req, res) {
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000".env.PORT);
})

//API KEy
//11afd38362d494a88f804167f4b5cd2c-us8

//List Id
//2fe692651a
