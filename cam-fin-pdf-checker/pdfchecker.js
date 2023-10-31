
//Replace the year value you want your automation to check for: 
const year = 2019
//-----------------------------------------------------




const assert = require("assert");
const { Builder, By, Key, until, WebElement } = require("selenium-webdriver");
const fs = require("fs");
const URL = "https://campaign-finance.phila.gov/search/report";
const browserSelect = "chrome";

describe("PDF Checker | Test Started", function () {
  it("Campaign Finance - Reports | PDF Checker", async function () {
    //----------------------------------------------------------------------
    //------------------------HEADLESS-------------------------------------
    //----------------------------------------------------------------------

    /*const chrome = require('selenium-webdriver/chrome');
              const options = new chrome.Options();
              options.addArguments('--headless');
              options.addArguments('--disable-gpu');
              options.addArguments('--no-sandbox');
              options.addArguments('--disable-dev-shm-usage');
              options.windowSize({ width: 1920, height: 1080 });

              let driver = await new Builder()
              .forBrowser(browserSelect)
              .setChromeOptions(options)
              .setChromeService(new chrome.ServiceBuilder(browserSelect.path))
              .build();*/
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    //--------------------------NON-HEADLESS--------------------------------
    //----------------------------------------------------------------------
    const driver = await new Builder().forBrowser(browserSelect).build();
    await driver.manage().window().maximize();

    //----------------------------------------------------------------------

    await driver.get(URL);
    await driver.executeScript(
      "window.scrollTo(0, document.body.scrollHeight)"
    );
    //await driver.findElement(By.xpath("//a[normalize-space()='Find a Campaign Financial Report']")).click();
    await driver
      .findElement(By.xpath(`//select/option[normalize-space()='${year}']`))
      .click();
    await driver
      .findElement(By.xpath("//button[normalize-space()='Search']"))
      .click();
    await driver.sleep(3000);
    await driver
      .findElement(By.xpath("//option[normalize-space()='50']"))
      .click();
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver.sleep(5000);

    const recordsNumber = await driver.findElement(
      By.xpath(
        "//p[@class='VuePagination__count text-center column cell medium-24']"
      )
    );
    const recordNumberText = await recordsNumber.getText();
    //console.log(recordNumberText);

    const str = recordNumberText;
    const match = str.split(" ");
    const number = match[5].replace(",", "");
    console.log(number + " - total records"); //records number

    const recordsPerPage = 50;

    const totalPages = Math.ceil(number / recordsPerPage);
    console.log(totalPages + " - pages"); //page number

    for (let page = 61; page <= totalPages; page++) {
      await driver.get(URL);
      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight)"
      );
      //await driver.findElement(By.xpath("//a[normalize-space()='Find a Campaign Financial Report']")).click();
      await driver
        .findElement(By.xpath(`//select/option[normalize-space()='${year}']`))
        .click();
      await driver.sleep(2000);
      await driver
        .findElement(By.xpath("//button[normalize-space()='Search']"))
        .click();
      await driver.sleep(3000);
      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight)"
      );

      switch (true) {
        case page >= 11:
          let clickElement = await driver
          .findElement(By.xpath("//a[normalize-space()='>>']"));

          await driver.executeScript("arguments[0].scrollIntoView();", clickElement);
          await clickElement.click();
        break;
      }


      await driver.sleep(5000);

      switch (true) {
        case page >= 21:
          let clickElement = await driver
            .findElement(By.xpath("//a[normalize-space()='>>']"));

            await driver.executeScript("arguments[0].scrollIntoView();", clickElement);
            await clickElement.click();
          break;
      }
      await driver.sleep(5000);
     
      switch (true) {
        case page >= 31:
          let clickElement = await driver
            .findElement(By.xpath("//a[normalize-space()='>>']"));

            await driver.executeScript("arguments[0].scrollIntoView();", clickElement);
            await clickElement.click();
          break;
      }

      await driver.sleep(5000);
      switch (true) {
        case page >= 41:
          let clickElement = await driver
            .findElement(By.xpath("//a[normalize-space()='>>']"));

            await driver.executeScript("arguments[0].scrollIntoView();", clickElement);
            await clickElement.click();
          break;
      }
      
     await driver.sleep(5000);
      switch (true) {
        case page >= 51:
          let clickElement = await driver
          .findElement(By.xpath("//a[normalize-space()='>>']"));

          await driver.executeScript("arguments[0].scrollIntoView();", clickElement);
          await clickElement.click();
        break;
      }

      await driver.sleep(5000);
      switch (true) {
        case page >= 61:
          let clickElement = await driver
          .findElement(By.xpath("//a[normalize-space()='>>']"));

          await driver.executeScript("arguments[0].scrollIntoView();", clickElement);
          await clickElement.click();
        break;
      }



      await driver.sleep(5000);

      await driver
        .findElement(By.xpath(`//a[normalize-space()='${page}']`))
        .click();
      await driver.sleep(3000);
      //row counts
      const rows = await driver.findElements(
        By.xpath("//*[@class='VueTables__row ']")
      );
      const rowCount = rows.length;
      console.log("Test is currently running on page - " + page);
      console.log(rowCount + " - rows on this page");

      for (
        let i = 1;
        i <= rowCount;
        i++ ///pagination
      ) {
        // await driver.sleep(4000);

        // launch the chrome browser and navigate to website
        //await driver.get(URL);
        await driver.executeScript(
          "window.scrollTo(0, document.body.scrollHeight)"
        );
        //await driver.findElement(By.xpath("//a[normalize-space()='Find a Campaign Financial Report']")).click();
        //await driver.findElement(By.xpath("//select/option[normalize-space()='2023']")).click();
        await driver.sleep(2000);
        //await driver.findElement(By.xpath("//button[normalize-space()='Search']")).click();
        await driver.manage().setTimeouts({ implicit: 10000 });
        //await driver.sleep(2000);
        //await driver.findElement(By.xpath("//option[normalize-space()='50']")).click();
        await driver.executeScript(
          "window.scrollTo(0, document.body.scrollHeight)"
        );

        // await driver.sleep(3000);
        await driver.manage().setTimeouts({ implicit: 7000 });

        //await driver.findElement(By.xpath(`//a[normalize-space()='${page}']`)).click();
        // await driver.sleep(3000);

        await driver.manage().setTimeouts({ implicit: 7000 });
        let xpathexpression = `(//tr[@class='VueTables__row '])[${i}]`;

        //after logging in - entering text or keywords
        await driver.manage().setTimeouts({ implicit: 7000 });
        console.log(xpathexpression);

        try {
          const element = await driver.wait(
            until.elementLocated(By.xpath(xpathexpression)),
            1000
          ); //==
          await driver.executeScript("arguments[0].scrollIntoView()", element);
          await driver.executeScript("arguments[0].scrollIntoView()", element);

          //var campaignText = await driver.findElement(By.xpath(xpathexpression));
          // var nameOfCampaign = campaignText.getText();
          //console.log('Campaign Name -' +nameOfCampaign);

          await driver.sleep(1000);

          await element.click();

          await driver.manage().setTimeouts({ implicit: 7000 });
          await driver
            .findElement(By.xpath("//button[normalize-space()='Yes!']"))
            .click();
          await driver.sleep(5000);
        } catch (error) {
          console.error(`no new tab opened for ${page} and row number - ${i}`);
        }

        try {
          await driver.manage().setTimeouts({ implicit: 10000 });
          let handles = await driver.getAllWindowHandles();
          await driver.switchTo().window(handles[1]);
        } catch (error) {
          console.log("no new tab opened");
        }

        let errorArray = [];
        //let errorArray2 = [];

        try {
          const pageTitle = await driver
            .findElement(By.xpath("//h3[@class='no-margin']"))
            .getText();
          console.log(pageTitle);

          if (pageTitle.includes("(Paper filing)")) {
            await driver.close();
            handles = await driver.getAllWindowHandles();
            await driver.switchTo().window(handles[0]);
          } else {
            const titleName = driver.findElement(
              By.xpath("//h3[@class='no-margin']")
            );
            await titleName.getText().then(function (text) {
              console.log("Title Name is - " + text);
            });

            const iframeElement = await driver.findElement(
              By.xpath("//*[@id='iframe']")
            );
            await driver.switchTo().frame(iframeElement);

            const idnumber = driver.findElement(
              By.xpath("//*[@id='viewer']/div[1]/div[2]/span[6]")
            );
            await idnumber.getText().then(function (text) {
              //console.log('ID number is *' +text);
            });

            await driver.manage().setTimeouts({ implicit: 20000 });
            const actualText = await driver
              .findElement(By.xpath("(//*[contains(text(), 'Zip Code')])[1]"))
              .getText();
            const expectedPartialText = "Zip Code";

            const regex = new RegExp(expectedPartialText, "i");
            assert.ok(
              regex.test(
                actualText,
                `Partial text "${expectedPartialText}" not found.`
              )
            );
            await driver.close();

            handles = await driver.getAllWindowHandles();
            await driver.switchTo().window(handles[0]);
          }

          //await driver.switchTo().defaultContent();

          //await driver.findElement(By.xpath("//a[normalize-space()='Search Campaign Finance System']")).click();
          //await driver.findElement(By.xpath("//a[normalize-space()='Find a Campaign Financial Report']")).click();
        } catch (error) {
          await driver.sleep(1000);
          let brokenPDFlink = await driver.getCurrentUrl();
          let cutURL = brokenPDFlink.substring(
            brokenPDFlink.indexOf("v2/") + 3
          );
          const buffer = Buffer.from(cutURL, "base64");
          const deocodedfor = Buffer.from(cutURL, "base64").toString("ascii");
          console.log(deocodedfor);

          await driver.sleep(2000);



          



          let screenshot = await driver.takeScreenshot();
          let timestamp = new Date()
            .toISOString()
            .slice(0, -5)
            .replace(/:/g, "-");
          // fs.writeFileSync(`screenshot-${timestamp}.png`, screenshot, {encoding: 'base64'});

          //errorArray2.push(deocodedfor)
          errorArray.push(brokenPDFlink);

          /*let timestamp = new Date().toISOString().slice(0, -5).replace(/:/g, '-');
        //fs.appendFileSync(`decoded-${timestamp}.txt`, deocodedfor + '\n');*/
          fs.appendFileSync(
            `${year}URLs-Decoded.txt`,
            `Page number - ${page} | - ${xpathexpression} ` + "\n"
          );
          fs.appendFileSync(`${year}URLs-Decoded.txt`, deocodedfor + "\n");

          console.log("Broken PDF Link----" + brokenPDFlink);

          fs.appendFileSync(`${year}URLs-Decoded.txt`, brokenPDFlink + "\n");

          try {
            const jsonData = JSON.parse(deocodedfor);
          
            const reportId = jsonData.reportId;
            
            fs.appendFileSync(`${year}ReportIDsOnly.txt`, reportId + ",");
          } catch(error){
            console.log("No report id found because page could not be opened")
          }

          

          //fs.appendFileSync('BrokenPDFLinks.txt', brokenPDFlink + '\n');

          await driver.sleep(2000);

          try {
            let handle = await driver.getAllWindowHandles();
            await driver.switchTo().window(handle[1]);
            await driver.close();
            handle = await driver.getAllWindowHandles();
            await driver.switchTo().window(handle[0]);
          } catch (error) {
            console.log("no new tab to close");
          }
        }

        continue;
      } //--for loop first page

      continue;
    }

    await driver.quit();
  });
});
