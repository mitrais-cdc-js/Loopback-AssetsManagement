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

});

describe("29660 auto callculation for replacement date", function(){

  it("005, 006 checkbox by default is checked and 008 replacement date is read only", function (){
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();

    actclickNewBtn.clickNewBtn();
    //expect: checkbox is displayed and default is checked
    actviewautoCBox.viewautoCBox ();

    //expect: checkbox is checked and replacement date is readonly
    actviewReplDate.viewreplaceDate ();
  });

  it("001 create asset auto callculation", function(){
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();

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

  it ("001 view asset and validate auto callculation result", function (){
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();

     //click view asset 
     checkViewAssetDetail.clickViewAsset ();
     //expect already in edit asset
     exviewAssetDetail.viewAssetDetail();
     //check result  for auto callcution
     exautoCallcResult.viewautoCallcResult();
  });

  it("009 edit asset with auto callculation", function(){  
     //access asset page
     var accessAssetPage = new assetPage();
     accessAssetPage.clickAssetLink ();

     actclickeditLink.clickeditLink();  
     //clear existing life span value  
     actclearLifeSpanEdit.clearLifeSpanEdit();
     actinputLifeSpanEdit.inputlifeSpanEdit();
     actclickautoCBoxEdit.clickautoCBoxEdit();
     actclickupdateBtn.clickupdatetBtn();

     browser.driver.sleep(2000);
     browser.waitForAngular();
     //expect: after successfully update asset apps redirected to view asset list page
     exgetViewListPage.getViewListPage();
  });

  it("004 Replacement date should be greater equal to installed date when edit", function(){  
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();

    actclickeditLink.clickeditLink();  
      
    //clear default replacement  
    actclearreplaceDate.clearReplacementEdit();
    //input manually for replacement date < installed date
    actinputreplaceDate.inputReplacementEdit2();

    //expect update button disable
    var exupdateBtn = new assetPage ();
    exupdateBtn.getDisableUpdateBtn();

    //clear default input date   
    actclearreplaceDate.clearReplacementEdit();
    actinputreplaceDate.inputReplacementEdit();
  
    //expect create button enable
    var exupdateBtn = new assetPage ();
    exupdateBtn.getEnableUpdateBtn();
 });

  it ("000 delete asset from auto callculation", function(){ 
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();

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

  it ("003, 007 create asset with no auto callculation", function (){
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();

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

  it ("000 delete asset from manual input replacement date", function(){
   //access asset page
   var accessAssetPage = new assetPage();
   accessAssetPage.clickAssetLink ();

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
  it("002 no auto callculation but no installed date", function(){
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();
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

  it ("000 delete asset from manual input replacement date", function(){
    //access asset page
    var accessAssetPage = new assetPage();
    accessAssetPage.clickAssetLink ();
    
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
  it("004 Replacement date should be greater equal to installed date when create", function (){
  //access asset page
   var accessAssetPage = new assetPage();
   accessAssetPage.clickAssetLink ();
   actclickNewBtn.clickNewBtn();
   //expect: user already in correct url
   //exgetCreatePage.getCreatePage();
    
   actinputDesc.inputDesc2();
   actintlDate.inputintlDate();
   actlifeSpan.inputlifeSpan();
   actclickautoCBox.clickautoCBox();
   //clear default input date   
   actclearreplaceDate.clearreplaceDate();
   //input manually for replacement date
   actinputreplaceDate.inputreplaceDate2();

   actinputMod.inputMod();
   actinputSerial.inputSerial();
   actinputinputBatch.inputBatch();
   actinputProdDate.inputProdDate();

   //expect update button disable
     var exCreateBtn = new assetPage ();
     exCreateBtn.getDisableCreateBtn();
  
  //clear default input date   
  actclearreplaceDate.clearreplaceDate();
  actinputreplaceDate.inputreplaceDate();
   //expect: after successfully created asset apps redirected to view asset list page
   //exgetViewListPage.getViewListPage();

  //expect create button enable
  var exCreateBtn = new assetPage ();
  exCreateBtn.getEnableCreateBtn();
  });

});