var assetPage = require ('../e2e/page/asset.po.js');

var actclickNewBtn = new assetPage();
var actinputDesc = new assetPage();
var actinputEditDesc = new assetPage();
var actinputMod = new assetPage();
var actinputSerial = new assetPage();
var actinputinputBatch = new assetPage();
var actclickCreateBtn = new assetPage();
var actinputProdDate =new assetPage();
var actclickeditLink = new assetPage();
var actclickupdateBtn = new assetPage();
var checkViewAssetDetail = new assetPage();
var exgetViewListPage = new assetPage();
var exgetCreatePage = new assetPage();
var exviewAssetDetail = new assetPage();
var exupdateResult = new assetPage();
var actDelAsset = new assetPage();

beforeEach(function(){
	//access apps homepage
	var assetHomePage = new assetPage();
	assetHomePage.get ();
	//access asset page
	var accessAssetPage = new assetPage();
	accessAssetPage.clickAssetLink ();   
});

describe ("update asset", function(){
    it("create asset", function(){
		actclickNewBtn.clickNewBtn();
		//expect: user already in correct url
		exgetCreatePage.getCreatePage();

		actinputDesc.inputDesc2();
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
	it ("update mandatory field", function(){
		//click edit link
		actclickeditLink.clickeditLink();
		actinputDesc.clearDescEdit();
		actinputDesc.inputDesc3();
		actclickupdateBtn.clickupdatetBtn();

		browser.driver.sleep(1000);
		browser.waitForAngular();

		//expect: after successfully update asset apps redirected to view asset list page
		 exgetViewListPage.getViewListPage();
	});

	it ("view update result in asset list", function (){
		//expect update result already correct in View asset detail
        exupdateResult.getupdateResultTab();
	});

	xit ("view update result in view detail", function (){
		//click view link
		checkViewAssetDetail.clickViewAsset ();
		//expect already in edit asset
		exviewAssetDetail.viewAssetDetail();
		//expect update result already correct in View asset detail
        exupdateResult.getupdateResult();

	});

	it ("delete asset from update activy", function(){
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
