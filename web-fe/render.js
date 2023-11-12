var data = {
  "images": [{
    "bannerImg1": "https://b2-store-images.s3.amazonaws.com/birdpic"
  },
  {"bannerImg1" : "https://b2-store-images.s3.amazonaws.com/birdpic"
},
{"bannerImg1" : "https://b2-store-images.s3.amazonaws.com/birdpic"
}]
};


document.getElementById("displaytext").style.display = "none";

function searchPhoto()
{

  console.log("INSIDE SEARCH PHOTO ----");
  
  // var apigClient = apigClientFactory.newClient({
  //                    apiKey: "swsfM8p6i71jP3kgUEwyB3DzE8xOQSjR6YCRsCXo"
  //       });


    var user_message = document.getElementById('note-textarea').value;

    var body = { };
    var params = {q : user_message};
    var additionalParams = {};

    sdk.searchGet(params, body , additionalParams).then(function(res){
        console.log("INSIDE GETT ----");
        var data = {}
        var data_array = []
        resp_data  = res.data
        console.log("RESPONSE ----" + res.data);
        resp_data.results.forEach(function(obj) {var json = {};
                  json["bannerImg1"] = obj["url"];
                 data_array.push(json) }
                );

        data["images"] = data_array;
        console.log("CONVERTED RESPONSE --- " + data);

        data.images.forEach( function(obj) {
            var img = new Image();
            img.src = obj.bannerImg1;
            img.setAttribute("class", "banner-img");
            img.setAttribute("alt", "effy");
            document.getElementById("img-container").appendChild(img);
            document.getElementById("displaytext").style.display = "block";
          });
      }).catch( function(result){

      });



}
function search()
{
	var searchBox = document.getElementsByClassName('searchbar')[0];
	console.log(searchBox.value);

	if (!searchBox.value)
	{
		alert('Please enter a valid text');
	}
	else
	{
		getPhotos(searchBox.value.trim().toLowerCase());
	}
}

function getPhotos(text)
{
	document.getElementsByClassName('searchbar')[0].value = '';

    let myHeaders = new Headers();

       
        // myHeaders.append("X-Api-Key", "D6lHdlUSxTagnzPiqKgsF2UtmFEZIfKs19TSxNVJ");
    let requestOptions = {
            crossDomain: true,
            method: 'GET',
            headers: myHeaders,
            // data: file,
        };

    console.log("query value : ", text)
    let getUrl = "https://djvqc9yr81.execute-api.us-east-1.amazonaws.com/final/search?q=" + text
    console.log("testing")
    var data_array = []
    fetch(getUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("----- reponse received is", data)
                console.log(data['results'])
                if (data["results"].length !== 0) {
                      resp_data  = data
                      resp_data.results.forEach(function(obj) {var json = {};
                      json["bannerImg1"] = obj["url"];
                      data_array.push(json) });
                      var data = {}
                      data["images"] = data_array;
                      console.log("CONVERTED RESPONSE --- " + data);

                      data.images.forEach( function(obj) {
                          var img = new Image();
                          img.src = obj.bannerImg1;
                          img.setAttribute("class", "banner-img");
                          img.setAttribute("alt", "effy");
                          document.getElementById("img-container").appendChild(img);
                          document.getElementById("displaytext").style.display = "block";
                      });
              }
              else
                  alert("No Pictures")
          });
}


function uploadPhoto()
{
	var filePath = (document.getElementById('file_path').value).split("\\");
    var fileName = filePath[filePath.length - 1];
    var fileExt = fileName.split(".").pop();
    
    if (!document.getElementById('custom_labels').innerText == "") {
        var customLabels = document.getElementById('custom_labels');
    }
    console.log(fileName);
    console.log(custom_labels.value);

    var file = document.getElementById("file_path").files[0];
    file.constructor = () => file;

    console.log(file.type);

    let myHeaders = new Headers()
    let requestOptions = {
            // crossDomain: true,
            method: 'PUT',
            headers: {
                "x-amz-meta-customLabels": custom_labels.value,
                "Content-Type": file.type,
                "x-api-key": "D6lHdlUSxTagnzPiqKgsF2UtmFEZIfKs19TSxNVJ"
            },
            // data: encode(file),
            body: file
        };
    
        fetch("https://djvqc9yr81.execute-api.us-east-1.amazonaws.com/final/photos-bucket-v1/" + fileName.toString(), requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result)

          })
          .catch(error => console.log('error', error));


  document.getElementById('file_path').value = "";
  document.getElementById('custom_labels').value = "";

}