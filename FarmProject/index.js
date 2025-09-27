// ------- WEB SERVER -------
const http = require("http");
const url = require("url");
const fs = require("fs");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

// Templates
const tempOverview = fs.readFileSync(
  `templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(`templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugList = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugList);

//  Creating the server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((ele) => replaceTemplate(tempCard, ele))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardsHtml);

    res.end(output);

    // About Page
  } else if (pathname === "/about") {
    res.end("This is About");

    // Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(dataObj);

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on the port : 8000");
});
