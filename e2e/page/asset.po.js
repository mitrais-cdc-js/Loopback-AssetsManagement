var assetPage = function (){
    
       //elemet view list of asset
       var assetTitle = element (by.xpath('/html/body/div/div/app-root/app-asset/h4'));
       var headAct = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/thead/tr[1]/th[1]/div'));
       var headMod = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/thead/tr[1]/th[2]/ng2-st-column-title/div/ng2-smart-table-title/a'));
       var headSer = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/thead/tr[1]/th[3]/ng2-st-column-title/div/ng2-smart-table-title/a'));
       var hearIntlDate = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/thead/tr[1]/th[4]/ng2-st-column-title/div/ng2-smart-table-title/a'));
       var headBatch = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/thead/tr[1]/th[5]/ng2-st-column-title/div/ng2-smart-table-title/a'));
       var headCreateDate = element (by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/thead/tr[1]/th[6]/ng2-st-column-title/div/ng2-smart-table-title/a'));
       var headProdDate = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/thead/tr[1]/th[7]/ng2-st-column-title/div/ng2-smart-table-title/a'));
       var headDesc = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/thead/tr[1]/th[8]/ng2-st-column-title/div/ng2-smart-table-title/a'));
   
       //elements view asset detail
       var assetLink = element (by.css('[href="/assets"]'));
       var viewLink = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/tbody/tr[1]/td[1]/ng2-st-tbody-custom/a[1]'));
       var editLink = element (by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/tbody/tr[1]/td[1]/ng2-st-tbody-custom/a[2]'));                             
       var newBtn = element (by.id('asset-new-btn'));
       var updatetBtn = element(by.id('asset-update-btn'));
       var delBtn = element (by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/tbody/tr[1]/td[1]/ng2-st-tbody-edit-delete/a'));
       var updateResult = element(by.xpath('/html/body/div/div/app-root/app-asset-view/table/tbody/tr[5]/td[2]'));
       var updateResultTab = element(by.xpath('/html/body/div/div/app-root/app-asset/p[3]/ng2-smart-table/table/tbody/tr[1]/td[8]/ng2-smart-table-cell/table-cell-view-mode/div/div'));
   
       //elements crete asset
       var desc =  element(by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[5]/textarea'));
       var editDesc = element (by.xpath('/html/body/div/div/app-root/app-asset-edit/div/div[1]/div/form/div[5]/textarea'));
       var model = element(by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[13]/input'));
       var serial = element(by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[14]/input'));
       var batchNo = element(by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[15]/input'));
       var prodDate = element(by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[18]/input'));
       var createBtn =	element(by.id('asset-create-btn'));
       var intlDate = element (by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[4]/input'));
       var lifeSpan = element(by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[6]/input'));
       var lifeSpanEdit = element(by.xpath('/html/body/div/div/app-root/app-asset-edit/div/div[1]/div/form/div[6]/input'));
       var autoCBox = element (by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[7]/input'));
       var autoCBoxEdit = element(by.xpath('/html/body/div/div/app-root/app-asset-edit/div/div[1]/div/form/div[7]/input'))
       var replaceDate = element (by.xpath('/html/body/div/div/app-root/app-asset-create/div/div[1]/div/form/div[8]/input'));
      
       //element edit asset
       var replacementEdit = element(by.xpath('/html/body/div/div/app-root/app-asset-edit/div/div[1]/div/form/div[8]/input'));
       var updateBtn = element (by.id('asset-update-btn'));
   
       //elements navigation for cancelation
       var createCancelBtn = element (by.id('asset-cancel-btn'));
       var viewBackBtn = element (by.id('asset-back-btn'));  
   
       //action: access apps url
       this.get = function (){
           browser.get ('http://13.228.106.128');
       }
       //action: access asset page
       this.clickAssetLink = function (){
           assetLink.click();
       }
       //action: checkViewAsset
       this.clickViewAsset = function (){
           viewLink.click();   
       }
       //action: click add new asset
       this.clickNewBtn = function () {
           newBtn.click();
       }
       //action: fill description
       this.inputDesc = function (){
           desc.sendKeys("AutoPen04");    
       };
       //action: fill description for callc
       this.inputDesc2 = function (){
           desc.sendKeys("AutoPenCallc");    
       };
       //action: fill description for update asset
       this.inputDesc3 = function (){
           editDesc.sendKeys("AutoPenCallc-update");    
       };
       //action: fill model
       this.inputMod = function (){
           model.sendKeys("mod123456");
       };   
       //action: fill serial
       this.inputSerial = function (){
           serial.sendKeys("ser123456"); 
       };     
       //action: fill bacth
       this.inputBatch = function (){
           batchNo.sendKeys("batch123456");
       };
       //action: fill production date
       this.inputProdDate= function (){
           prodDate.sendKeys("12/01/2001");
       };
       //action: click create button
       this.clickCreateBtn= function (){
           createBtn.click();
       };
       //action: delete asset
       this.clickDelBtn = function (){
           delBtn.click();
       };
       //action: back from view page
       this.clickBackBtn = function(){
           viewBackBtn.click();
       };
       //action: cancel from create asset page
       this.clickCancelBtn = function (){
           createCancelBtn.click();
       };
       //action: fill installed date
       this.inputintlDate = function (){
           intlDate.sendKeys("01/02/2017");
       };
       //action: fill life span
       this.inputlifeSpan = function (){
       lifeSpan.sendKeys ("1");
       };
       //action: fill life span
       this.inputlifeSpanEdit = function (){
           lifeSpanEdit.sendKeys ("2");
       };
       //action: uncheck auto callculation
       this.clickautoCBox=function(){
           autoCBox.click();
       };
       //action: check auto callculation in edit
       this.clickautoCBoxEdit = function(){
           autoCBoxEdit.click();
       };
       //action: clear value in replacement date input field
       this.clearreplaceDate = function (){
           replaceDate.clear();
       };
       //action: clear value in life span field
       this.clearLifeSpanEdit = function (){
           lifeSpanEdit.clear();
       };
       //action: clear value in description field
       this.clearDescEdit = function (){
           editDesc.clear();
       };
       //action: fill replacement date manually
       this.inputreplaceDate = function (){
           replaceDate.sendKeys ("01/02/2017");
       };
        //action: fill replacement date manually < installed date
       this.inputreplaceDate2 = function (){
        replaceDate.sendKeys ("01/01/2016");
       };
       //action: click edit link
       this.clickeditLink = function(){
           editLink.click();
       };
       //action: click update button
       this.clickupdatetBtn = function (){
           updatetBtn.click();
       };
       //expect: view checkbox manual input replacement date
       this.viewautoCBox = function (){
           expect((autoCBox).getAttribute ('checked')).toBeTruthy();
       };
       //expect: replacement date read only
       this.viewreplaceDate = function (){
           expect(replaceDate.isEnabled()).toBe(false);
        };
       //expect: current url in create page
       this.getCreatePage = function (){
          expect (browser.getCurrentUrl()).toEqual('http://13.228.106.128/assets/create'); 
       };
       //expect: current url in view asset list page
       this.getViewListPage = function (){
            expect (browser.getCurrentUrl()).toEqual('http://13.228.106.128/assets'); 
       };
       //expect: auto callculation result
       this.viewautoCallcResult = function (){
       var autoCallcResult = element (by.xpath('/html/body/div/div/app-root/app-asset-view/table/tbody/tr[7]/td[2]'));
       expect(autoCallcResult.getText()).toEqual("08/02/2017");
       };
       //expect: auto callculation no result/default date
       this.viewNoCallcResult = function (){
       var autoCallcResult = element (by.xpath('/html/body/div/div/app-root/app-asset-view/table/tbody/tr[7]/td[2]'));
       expect(autoCallcResult.getText()).toEqual("01/01/1970");
       }; 
       //expect: asset created in edit page
       this.viewAssetDetail = function (){
           expect (browser.getCurrentUrl()).toContain('http://13.228.106.128/assets/5a'); 
       };
       //expect: get asset list title
       this.getassetTitle = function (){
           expect(assetTitle.getText()).toEqual("List of Assets");
       };
       //expect: get header table action
       this.getheadAct = function(){
           expect(headAct.getText()).toEqual("Actions");
       };
       //expect: get header table model
       this.getheadMod = function(){
           expect(headMod.getText()).toEqual("Model");
       };
       //expect: get header table serial no
       this.getheadSer = function(){
           expect(headSer.getText()).toEqual("Serial Nr.");
       };
       //expect: get header table installed data
       this.getheadInstl = function(){
           expect(hearIntlDate.getText()).toEqual("Installed Date");
       };
       //expect: get header table batch no
       this.getheadBatch = function(){
           expect(headBatch.getText()).toEqual("Batch Nr.");
       };
       //expect: get header table date of creation
       this.getheadCreate = function(){
           expect(headCreateDate.getText()).toEqual("Date of Creation");
       };
       //expect: get header table date of production
       this.getheadProduc = function(){
           expect(headProdDate.getText()).toEqual("Date of Production");
       };
       //expect: get header table description
       this.getheadDesc = function(){
           expect(headDesc.getText()).toEqual("Description");
       };
       //expect: update result in view detail
       this.getupdateResult = function (){
           expect(updateResult.getText()).toEqual("AutoPenCallc-update");
       };
       //expect: update result in view list asset
       this.getupdateResultTab = function(){
           expect(updateResultTab.getText()).toEqual("AutoPenCallc-update");
       };
       //expect: create button is enable
       this.getEnableCreateBtn = function(){
           expect(createBtn.isEnabled()).toBe(true)
       };
       //expect: create button is disable
       this.getDisableCreateBtn = function(){
           expect(createBtn.isEnabled()).toBe(false)
       };
       //action: edit input replacement date > installed date
       this.inputReplacementEdit = function (){
           replacementEdit.sendKeys("01/01/2018");
       };
       //action: edit input replacement date <installed date
       this.inputReplacementEdit2 = function (){
           replacementEdit.sendKeys("01/01/2016");
       };
        //action: clear value in edit replacement field
        this.clearReplacementEdit = function (){
           replacementEdit.clear();
        };
        //expect: update button is enable
       this.getEnableUpdateBtn = function(){
           expect(updateBtn.isEnabled()).toBe(true)
       };
       //expect: update button is disable
       this.getDisableUpdateBtn = function(){
           expect(updateBtn.isEnabled()).toBe(false)
       };
   
   };
   module.exports = assetPage