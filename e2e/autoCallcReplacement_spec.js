var assetPage = require ('../e2e/page/asset.po.js');
var actclickNewBtn = new assetPage();

var actinputDesc = new assetPage();
var actintlDate = new assetPage();
var actlifeSpan = new assetPage();
var actinputMod = new assetPage();
var actinputSerial = new assetPage();
var actinputinputBatch = new assetPage();
var actinputProdDate =new assetPage();
var actclickCreateBtn = new assetPage();
var actclickautoCBox = new assetPage();
var actinputreplaceDate = new assetPage();
var actclearreplaceDate = new assetPage();
var actclearLifeSpanEdit = new assetPage();
var actinputLifeSpanEdit = new assetPage();
var actviewautoCBox = new assetPage();
var actclickautoCBoxEdit = new assetPage();
var actviewReplDate = new assetPage();
var actclickeditLink = new assetPage();
var actclickupdateBtn = new assetPage();
var exgetCreatePage = new assetPage();
var exgetViewListPage = new assetPage();
var exautoCallcResult = new assetPage();
var exNoCallcResult = new assetPage();
var checkViewAssetDetail = new assetPage();
var exviewAssetDetail = new assetPage();
var actDelAsset = new assetPage();

beforeEach(function(){
    //access apps homepage
    var assetHomePage = new assetPage();
     assetHomePage.get ();
    
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();

});

describe("create asset with replacement date", function(){

  it("checkbox by default is checked and replacement date is read only", function (){
    actclickNewBtn.clickNewBtn();
    //expect: checkbox is displayed and default is checked
    actviewautoCBox.viewautoCBox ();

    //expect: checkbox is checked and replacement date is readonly
    actviewReplDate.viewreplaceDate ();
  });

  it("create asset auto callculation", function(){
     actclickNewBtn.clickNewBtn();
     //expect: user already in correct url
     exgetCreatePage.getCreatePage();
     actinputDesc.inputDesc2();
     actintlDate.inputintlDate();
     actlifeSpan.inputlifeSpan();
     actinputMod.inputMod();
     actinputSerial.inputSerial();
     actinputinputBatch.inputBatch();
     actinputProdDate.inputProdDate();
     actclickCreateBtn.clickCreateBtn();

     browser.driver.sleep(1000);
     browser.waitForAngular();
     //expect: after successfully created asset apps redirected to view asset list page
     exgetViewListPage.getViewListPage();
  });

  it ("view asset and validate auto callculation result", function (){
     //click view asset 
     checkViewAssetDetail.clickViewAsset ();
     //expect already in edit asset
     exviewAssetDetail.viewAssetDetail();
     //check result  for auto callcution
     exautoCallcResult.viewautoCallcResult();
  });

  it("edit asset with auto callculation", function(){  
    
     actclickeditLink.clickeditLink();  
     //clear existing life span value  
     actclearLifeSpanEdit.clearLifeSpanEdit();
     actinputLifeSpanEdit.inputlifeSpanEdit();
     actclickautoCBoxEdit.clickautoCBoxEdit();
     actclickupdateBtn.clickupdatetBtn();

     browser.driver.sleep(1000);
     browser.waitForAngular();
     //expect: after successfully update asset apps redirected to view asset list page
     exgetViewListPage.getViewListPage();
  });

  it ("delete asset from auto callculation", function(){ 
    actDelAsset.clickDelBtn();
    
    //browser.driver.sleep(1000);
    //browser.waitForAngular();

    var timeoutInMilliseconds = 1000;
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);

    var alert = browser.switchTo().alert();
    alert.accept();

    browser.driver.sleep(1000);
    browser.waitForAngular();

    //access apps homepage in order to refresh browser
    var assetHomePage = new assetPage();
    assetHomePage.get ();
    
    //access asset page in order to refresh browser
     var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();
  });

  it ("create asset with no auto callculation", function (){
     actclickNewBtn.clickNewBtn();
     //expect: user already in correct url
     exgetCreatePage.getCreatePage();
      
     actinputDesc.inputDesc2();
     actintlDate.inputintlDate();
     actlifeSpan.inputlifeSpan();
     actclickautoCBox.clickautoCBox();
     //clear default input date   
     actclearreplaceDate.clearreplaceDate();
     //input manually for replacement date
     actinputreplaceDate.inputreplaceDate();
     actinputMod.inputMod();
     actinputSerial.inputSerial();
     actinputinputBatch.inputBatch();
     actinputProdDate.inputProdDate();
     actclickCreateBtn.clickCreateBtn();
    
     browser.driver.sleep(1000);
     browser.waitForAngular();
     //expect: after successfully created asset apps redirected to view asset list page
     exgetViewListPage.getViewListPage();
     
  });

  it ("delete asset from manual input replacement date", function(){
    actDelAsset.clickDelBtn();
    
    var timeoutInMilliseconds = 1000;
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);

    var alert = browser.switchTo().alert();
    alert.accept();

    browser.driver.sleep(1000);
    browser.waitForAngular();

    //access apps homepage in order to refresh browser
    var assetHomePage = new assetPage();
    assetHomePage.get ();
    
    //access asset page in order to refresh browser
     var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();
  });
  it("auto callculation but no installed date", function(){
    
    actclickNewBtn.clickNewBtn();
    //expect: user already in correct url
    exgetCreatePage.getCreatePage();
  
     actinputDesc.inputDesc2();
     //actintlDate.inputintlDate();
     actlifeSpan.inputlifeSpan();
     actinputMod.inputMod();
     actinputSerial.inputSerial();
     actinputinputBatch.inputBatch();
     actinputProdDate.inputProdDate();
     actclickCreateBtn.clickCreateBtn();

     browser.driver.sleep(1000);
     browser.waitForAngular();
     //expect: successfuly create asset but there's no replacement date
     exgetViewListPage.getViewListPage();

     //click view asset 
     checkViewAssetDetail.clickViewAsset ();          
     //expect already in edit asset
     exviewAssetDetail.viewAssetDetail();         
     //check result  for auto callcution
     exNoCallcResult.viewNoCallcResult();
  });

  it ("delete asset from manual input replacement date", function(){
    actDelAsset.clickDelBtn();
    
    var timeoutInMilliseconds = 1000;
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);

    var alert = browser.switchTo().alert();
    alert.accept();

    browser.driver.sleep(1000);
    browser.waitForAngular();

    //access apps homepage in order to refresh browser
    var assetHomePage = new assetPage();
    assetHomePage.get ();
    
    //access asset page in order to refresh browser
     var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();
  });

});