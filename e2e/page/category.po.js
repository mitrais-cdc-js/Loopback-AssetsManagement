var categoryPage = function (){
    //element view category
    var catLink = element (by.css('[href="/categories"]'));
    var newCatBtn = element (by.xpath('/html/body/div/div/app-root/app-category/p[1]/a'))
    var DelCatBtn = element (by.xpath('/html/body/div/div/app-root/app-category/p[3]/ng2-smart-table/table/tbody/tr[1]/td[1]/ng2-st-tbody-edit-delete/a'));
    var editLink = element (by.xpath('/html/body/div/div/app-root/app-category/p[3]/ng2-smart-table/table/tbody/tr[1]/td[1]/ng2-st-tbody-custom/a[2]'));
    var viewLink = element (by.xpath('/html/body/div/div/app-root/app-category/p[3]/ng2-smart-table/table/tbody/tr[1]/td[1]/ng2-st-tbody-custom/a[1]'));

    //element create category
    var name = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[1]/input'));
    var nameLabel = element(by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[1]/label'));
    var desc = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[2]/input'));
    var descLabel = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[2]/label'));
    var saveBtn = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/button'));
    var parentLabel = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[3]/label'));
    var checkLabel = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[4]/label'));
    var parent = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[3]/select'));
    var checklist = element(by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[4]/select'));

    //element edit category
    var editName = element(by.xpath('/html/body/div/div/app-root/app-category-edit/div/div[1]/div/form/div[1]/input'));
    var editDesc = element(by.xpath('/html/body/div/div/app-root/app-category-edit/div/div[1]/div/form/div[2]/input'));
    var editSaveBtn = element (by.xpath('/html/body/div/div/app-root/app-category-edit/div/div[1]/div/form/button'));


    //action: access apps url
    this.get = function(){
        browser.get('http://13.228.106.128');
    };
    //action: access category page
    this.clickcatlink = function (){ 
        catLink.click();
    };
    //action: click new category button
    this.clickNewCat = function(){
         newCatBtn.click();
    };
    //expect: ensure list of category title displayed
    this.getcatLink = function (){
         expect (browser.getCurrentUrl()).toEqual('http://13.228.106.128/categories');    
    };
    //expect: ensure title displayed
    this.getcatTitle = function (){
        var catTitle = element (by.xpath('/html/body/div/div/app-root/app-category/h4'));
        expect(catTitle.getText()).toEqual("List of Categories");
    };
    //expect : ensure accessing correct url
    this.accessCreateCat = function (){
         expect (browser.getCurrentUrl()).toEqual("http://13.228.106.128/categories/create");
    };
    //action: input category name
    this.inputName = function(){
        name.sendKeys("AMonitor_Auto");
    };
    //action: edit input category name
    this.editInputName = function(){
        editName.sendKeys("AMonitor_Auto_edit");
    };
    //action: input category description
    this.inputDesc = function (){
        desc.sendKeys("AMonitor,LCD_Auto");
    };
    //action: edit input category description
    this.editInputDesc = function(){
        editDesc.sendKeys("AMonitor_Auto_edit");
    };
    //action: click input parent
    this.clickInputParent = function(){
        inputParent.click();
    };
    //action: input parent
    this.inputParent = function(){
        parent.sendKeys("Computer");
    };
    //action: click input checklist
    this.clickInputChecklist = function(){
        inputChecklist.click();
    };
    //action: input checklist
    this.inputChecklist = function (){
        checklist.sendKeys("Personal Computer");
    };
    //action: click save button
    this.clickSaveBtn = function(){
        saveBtn.click();
    };
    //action: click edit save button
    this.clickEditSaveBtn = function(){
        editSaveBtn.click();
    };
    //expect: back to list of category and new category displayed
    this.accessViewCat = function(){
        expect(browser.getCurrentUrl()).toEqual("http://13.228.106.128/categories");    
    };
    //action:click delete button
    this.clickDelCatBtn = function(){
        DelCatBtn.click();
    };
    //expect: category name is displayed
    this.getcatName = function(){
        expect(nameLabel.getText()).toEqual("Name*");
    };
    //expcet: category desc is displayed
    this.getcatDesc = function (){
        expect(descLabel.getText()).toEqual("Description*");
    };
    //expect: parent category is displayed
    this.getcatParent = function (){
        expect(parentLabel.getText()).toEqual("Parent Category");
    };
    //expect: checklist category is displayed
    this.getcatChecklist = function (){
        expect(checkLabel.getText()).toEqual("Checklist");
    };
    //action: click edit link
    this.clickeditLink = function (){
        editLink.click();
    };
    //expect: edit asset category URL
    this.getEditURL = function (){
        expect(browser.getCurrentUrl()).toContain("http://13.228.106.128/categories/edit/5a"); 
    };
    //action: click view link
    this.clickViewLink = function(){
        viewLink.click();
    };
    //expect: view category detail
    this.getViewLink =function(){
        expect(browser.getCurrentUrl()).toContain("http://13.228.106.128/categories/5a");
    };

};
module.exports = categoryPage

