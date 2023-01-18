function postData() {
  //Submit Request
//console.log("hello world");
  var documentTitle = document.getElementById("documentTitle").value;
  var createDate = document.getElementById("createDate").value;
  var lastModified = document.getElementById("lastModified").value;
  var documentText_initial = document.getElementById("firepad").innerHTML;
  var lastModifiedBy = document.getElementById("lastModifiedBy").value;
  var documentLocation = document.getElementById("documentLocation").value;
  var docPermission = document.getElementById("docPermission").value;

 console.log(documentText_initial);

var regex = /firepadtext(.*?)<\/span><\/pre>/g;

var documentText_totalstring = regex.exec(documentText_initial);
var documentText = esc_quot(documentText_totalstring[1]);

  let data =
    '{"documentTitle": "' +
    documentTitle +
    '", "createDate": "' +
    createDate +
    '", "lastModified": "' +
    lastModified +
    '", "documentText": "' +
    documentText +
    '", "lastModifiedBy": "' +
    lastModifiedBy +
    '", "documentLocation": "' +
    documentLocation +
    '", "docPermission": "' +
    docPermission +
    '"}';

  console.log(data);

  const myurl = "http://localhost:8081/docsubmission";

  const Http = new XMLHttpRequest();

  const url = myurl;
  Http.open("POST", url);

  Http.setRequestHeader("Accept", "application/json");
  Http.setRequestHeader("Content-Type", "application/json");

  Http.send(data);

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText);
    const obj = JSON.parse(Http.responseText);
    console.log(obj);
    alert(Http.responseText);
    document.getElementById("submissionformid").reset();
  };

}

function esc_quot(text)
{
    return text.replaceAll("\"", "\\\"");
}

function getData() {
  //Get Request

  const myurl =
    "http://localhost:8081/docsubmission";
  //console.log(myurl);

  const Http = new XMLHttpRequest();
  const url = myurl;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
      console.log(Http.responseText);
    try {
      const obj = JSON.parse(Http.responseText);
      console.log(obj);
      jsontoHTMLTable(obj);
    //  sortTable("table", 2);
    } catch (error) {
      console.log(error);
    }
  };
}

function jsontoHTMLTable(list) {
  var cols = [];

  for (var i = 0; i < list.length; i++) {
    for (var k in list[i]) {
      if (cols.indexOf(k) === -1) {
        // Push all keys to the array
        cols.push(k);
      }
    }
  }

  // Create a table element
  var table = document.createElement("table");

  // Create table row tr element of a table
  var tr = table.insertRow(-1);

  for (var i = 0; i < cols.length; i++) {
    // Create the table header th element
    var theader = document.createElement("th");
    theader.innerHTML = cols[i];

    // Append columnName to the table row
    tr.appendChild(theader);
  }

  // Adding the data to the table
  for (var i = 0; i < list.length; i++) {
    // Create a new row
    trow = table.insertRow(-1);
    for (var j = 0; j < cols.length; j++) {
      var cell = trow.insertCell(-1);

      // Inserting the cell at particular place
      cell.innerHTML = list[i][cols[j]];
    }
  }

  // Add the newly created table containing json data into a popup window
win = window.open('', 'documents', 'width=800,height=500');
win.document.write("<html><head><title>TypeItTogetherDocuments</title></head><body><table align='center' id='table' style='{ border: 1px solid black;}'></table></body></html>");
  var el = win.document.getElementById("table");
  el.innerHTML = "";
  el.appendChild(table);

}


