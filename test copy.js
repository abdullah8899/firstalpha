const fs = require("fs");
const got = require("got");
const jsdom = require("jsdom");
const request = require("request");
const cheerio = require("cheerio");
const writeStream = fs.createWriteStream("post.csv");
writeStream.write(
  `Model,Version,Sim type,Powered By,Os detail,Network,Connectivity,Connecters,Screen Resolution,RAM,internal storage,Card slot,Max card Supported,Back camera,Camera Features,Front Camera,Sensors,Battery Type,Dimensions,Warrenty,color,Weight \n`
);
var cardsupport;
var Dimensions;
var Sensors;
var Cfeatures;
var Fcamera;
var RAM;
var weight;
var model;
var Version;
var SIMType;
var OSDetail;
var Poweredby;
var Network;
var Connectors;
var Connectivity;
var size;
var InternalStorage;
var CardSlot;
var Bcamera;
var BatteryType;
var Warrenty;
var Color;
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
          dataFromUrl($(el).attr("href"), filter);
        });
      }
    }
  );
}

function dataFromUrl(url, callback) {
  request(url, function (err, res, body) {
    if (err) {
      console.log(err, "error occured while hitting URL");
      return callback(err);
    } else {
      const array = [];
      const $ = cheerio.load(body);
      console.log(
        "Start------------------------------------------------------------"
      );
      callback($);
    }
  });
}

scrap();

function filter($) {
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
            // console.log($(el).find("th").text());
            //console.log($(el).find("td").text());
            if ($(el).find("th").text() == "Model") {
              Model = $(el).find("td").text();
              console.log(Model);
            }
            if ($(el).find("th").text() == "Version") {
              Version = $(el).find("td").text();
              console.log(Version);
            }
            if ($(el).find("th").text() == "SIM Type") {
              SIMType = $(el).find("td").text();
              console.log(SIMType);
            }
            if ($(el).find("th").text() == "Powered by") {
              Poweredby = $(el).find("td").text();
              console.log(Poweredby);
            }
            if ($(el).find("th").text() == "OS Detail") {
              OSDetail = $(el).find("td").text();
              console.log(OSDetail);
            }
            if ($(el).find("th").text() == "Network") {
              Network = $(el).find("td").text();
              console.log(Network);
            }

            if ($(el).find("th").text() == "Connectivity") {
              Connectivity = $(el).find("td").text();
              console.log(Connectivity);
            }
            if ($(el).find("th").text() == "Connectors") {
              Connectors = $(el).find("td").text();
              console.log(Connectors);
            }

            if ($(el).find("th").text() == "Screen Resolution") {
              size = $(el).find("td").text();
              console.log(size);
            }
            if ($(el).find("th").text() == "RAM") {
              RAM = $(el).find("td").text();
              console.log(RAM);
            }

            if ($(el).find("th").text() == "Internal Storage") {
              InternalStorage = $(el).find("td").text();
              console.log(InternalStorage);
            }
            if ($(el).find("th").text() == "Card Slot") {
              CardSlot = $(el).find("td").text();
              console.log(CardSlot);
            }
            if ($(el).find("th").text() == "Max Card Supported") {
              cardsupport = $(el).find("td").text();
              console.log(cardsupport);
            }

            if ($(el).find("th").text() == "Back Camera") {
              Bcamera = $(el).find("td").text();
              console.log(Bcamera);
            }
            if ($(el).find("th").text() == "Camera Features") {
              Cfeatures = $(el).find("td").text();
              console.log(Cfeatures);
            }

            if ($(el).find("th").text() == "Front Camera") {
              Fcamera = $(el).find("td").text();
              console.log(Fcamera);
            }
            if ($(el).find("th").text() == "Sensors") {
              Sensors = $(el).find("td").text();
              console.log(Sensors);
            }

            if ($(el).find("th").text() == "Battery Type") {
              BatteryType = $(el).find("td").text();
              console.log(BatteryType);
            }
            if ($(el).find("th").text() == "Dimensions") {
              Dimensions = $(el).find("td").text();
              console.log(Dimensions);
            }
            if ($(el).find("th").text() == "Warranty") {
              Warranty = $(el).find("td").text();
              console.log(Warranty);
            }
            if ($(el).find("th").text() == "Color") {
              Color = $(el).find("td").text();
              console.log(Color);
            }
            if ($(el).find("th").text() == "Weight") {
              weight = $(el).find("td").text();
              console.log(weight);
            }
            console.log(
              "------------------------------------------------------------"
            );
          });
          // mobileList.push(obj);
          //writeStream.write(`${weight}\n`);
          writeStream.write(
            //`${Model},${Version},${SIMType},${Poweredby},${OSDetail},${Network},${Connectivity},${Connectors},${size},${RAM},${InternalStorage},${CardSlot},${cardsupport},${Bcamera},${Cfeatures},${Fcamera},${Sensors},${BatteryType},${Dimensions},${Warrenty},${Color},${weight} \n`
            `Model${Model},Version${Version},SIMType${SIMType},Poweredby${Poweredby},OSDetail${OSDetail},Network${Network},Connectivity${Connectivity},Connectors${Connectors},size${size},RAM${RAM},InternalStorage${InternalStorage},CardSlot${CardSlot},cardsupport${cardsupport},Bcamera${Bcamera},Cfeatures${Cfeatures},Fcamera${Fcamera},Sensors${Sensors},BatteryType${BatteryType},Dimensions${Dimensions},Warrenty${Warrenty},Color${Color},weight${weight} \n`
            //`Model,Version,SIMType,Poweredby,OSDetail,Network,Connectivity,Connectors, size,RAM,InternalStorage,CardSlot,cardsupport,Bcamera,Cfeatures,Fcamera, Sensors,BatteryType,Dimensions,Warrenty,Color,weight \n`
          );
        }
      });
  });
}
