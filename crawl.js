const fs = require("fs");
const got = require("got");
const jsdom = require("jsdom");
const request = require("request");
const cheerio = require("cheerio");
const writeStream = fs.createWriteStream("post.csv");
writeStream.write("RAM");
var ram = 4;
var memory = 64;
var color = "white";
var mobileList = [];

function scrap() {
  request(
    "https://myshop.pk/mobiles-smartphones-tablets/smartphones/samsung",
    function (err, res, body) {
      if (err) {
        console.log(err, "error occured while hitting URL");
      } else {
        const array = [];
        const $ = cheerio.load(body);

        $(".page-with-filter .product-item-photo a").each((i, el) => {
          //console.log($(el).attr("href"));
          request($(el).attr("href"), function (err, res, body) {
            if (err) {
              console.log(err, "error occured while hitting URL");
            } else {
              const array = [];
              const $ = cheerio.load(body);

              $(".additional-attributes-wrapper .table").each((i, el) => {
                let table = $(el);
                $(el)
                  .find("tr")
                  .each((i, el) => {
                    if (
                      $(el).find("th").text() == "RAM" &&
                      $(el).find("td").text() == "4 GB"
                    ) {
                      let obj = {};
                      table.find("tr").each((i, el) => {
                        // console.log(
                        //   "hhhhhhhhhhhhhhh" + $(el).find("th").text()
                        // );
                        // console.log($(el).find("td").text());

                        if ($(el).find("th").text() == "Network") {
                          obj.Network = $(el).find("td").text();
                        }
                        if ($(el).find("th").text() == "Screen Resolution") {
                          obj.Screen_res = $(el).find("td").text();
                        }
                      });
                      mobileList.push(obj);
                    }
                  });
              });
            }
          });
        });
        console.log("--------------------------" + JSON.stringify(mobileList));
      }
    }
  );
}

scrap();
