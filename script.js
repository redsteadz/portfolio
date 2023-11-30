function redirect(url) {
  window.location.href = url;
}
// Function to make an HTTP request

function fetchRSS(url, callback) {
  // Making the Instance of XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseXML);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// Function to parse the XML and extract information
function parseRSS(xml) {
  var items = xml.querySelectorAll("item"); // Assuming the items are enclosed in <item> tags

  items.forEach(function (item) {
    var title = item.querySelector("title").textContent;
    var link = item.querySelector("link").textContent;
    var description = item.querySelector("description").textContent;
    var pubDate = item.querySelector("pubDate").textContent;
    var tagsArr = item.querySelector("tags").textContent.split(",");
    var tagsString="";


    tagsArr.forEach(function (tag) {
      tagsString += `<li>${tag}</li>`;
    });
    
    // console.log("Title: " + title);
    // console.log("Link: " + link);
    // console.log("Description: " + description);
    // console.log("\n");
    var blogContainer = document.querySelector(".blogContainer");
    
    // blogContainer.innerHTML += "<a href='" + link + "'>" + title + "</a>";
    
    var dateObject = new Date(pubDate);
    // Extract the date components
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth() + 1; // Months are zero-indexed, so add 1
    var day = dateObject.getDate();

    // Format the date as "YYYY-MM-DD"
    var formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    var htmlString = `
      <section class="blog">
        <time datetime="${formattedDate}" class="date">${formattedDate}</time>
        <div class="blogContent" id="bg1" onclick="redirect('${link}')">
          <h4>${title}</h4>
          <p>
            ${description}
          </p>
          <div class="tags_container">
            <ul class="tags">
              ${tagsString}
            </ul>
          </div>
        </div>
      </section>
    `;
    // Thte title
    if (!title.includes(".excalidraw"))
    {
    console.log("Title: " + title);
    blogContainer.innerHTML += htmlString;
    }

  });
}

var rssUrl = "https://redsteadz.github.io/devSensei/index.xml";
fetchRSS(rssUrl, parseRSS);

var contactBtn = document.querySelector(".contact");
var modal = document.querySelector(".ContactFormModal");
var main = document.querySelector(".main")


contactBtn.onclick = function() {
  modal.classList.toggle("active");
};

document.onclick = function(event) {
  if (!modal.contains(event.target) && event.target !== contactBtn) {
    modal.classList.remove("active");
  }
};















