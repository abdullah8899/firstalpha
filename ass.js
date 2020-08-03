const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
var nodemailer = require("nodemailer");

const writeStream = fs.createWriteStream("chek.csv");

writeStream.write(`Name ,Details,price \n`);
const URL =
  "https://myshop.pk/mobiles-smartphones-tablets/smartphones?product_list_limit=64";

request(URL, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    const arr = [];
    const $ = cheerio.load(body);
    $(".product-item-info").each(function (index) {
      const details = $(this).find(".mso_listing_detail").text();

      const name = $(this).find(".product-item-link").text();
      const price = $(this).find(".price").text();
      // var finalProductsPrice = [];
      //console.log("Check Price =>", Number(price.replace(/[^0-9.-]+/g, "")));
      //debugger;
      // for (var i = 0; i < price.length; i++) {
      //   var pr = Number(price[i].replace(/[^0-9.-]+/g, ""));
      //   if (pr > 15000) {
      //     finalProductsPrice.push(price[i]);
      //   }
      // }
      const obj = {
        name: name,

        details: details.replace(/,/g, "and"),
        price: price,
      };
      // console.log(obj);
      // filter
      if (Number(price.replace(/[^0-9.-]+/g, "")) > 15000) {
        writeStream.write(
          `${name}, ${details.replace(/,/g, "'")}, ${price.replace(
            /,/g,
            "'"
          )} \n`
        );
        // /,/g, "and";
        //console.log(arr.toString(obj));
      }
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdullahnaveed71.am@gmail.com",
        pass: "password",
      },
    });

    var mailOptions = {
      from: "abdullahnaveed71.am@gmail.com ",
      to: "abdullahnaveed71.am@gmail.com",
      subject: "Sending Email using Node.js",
      text: "Here is the List of Mobile Phones prices>15000",
      attachments: [
        // String attachment
        {
          filename: "Mobiles.csv",
          path: "E:/Node js/chek.csv",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
});
