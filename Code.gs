/**
 * @OnlyCurrentDoc
 */
 
//Open the order form dialog(HTML File)
function openDialog() {
  var html = HtmlService.createTemplateFromFile("Index").evaluate(); //HTML Service
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'New Order');
}

//Get content from Javascript and Stylesheet
function getContent(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

//Denies null values,show warnings or alerts (NOT FUNCTIONING YET)
function denyNull() {
  Browser.msgBox('Greetings', 'Press Yes or No?', Browser.Buttons.YES_NO);
}

//Get the input from the form
function addOrder(form) {
   //Initialize variables with the form inputs
   var orderNumber = 999;
   var name = form.name;
   var orderCode = form.order;
   var size = form.size;
   var quantity = form.quantity;
   var price = getPrice(orderCode, size);
   var subTotal = quantity*price;
   var type = form.type;
   var paid = "N";
   
   var activeSheet = SpreadsheetApp.getActiveSheet();//Get Active Sheet
   var range = activeSheet.getRange("A:K");//Get the range of the inputs
   var firstEmptyRow = {
    getFirstEmptyRowByColumnArray: function() {
        var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
        var column = activeSheet.getRange("A:A");
        var values = column.getValues(); //Get all data(in column) in one call
        var ct = 0;
        while (values[ct] && values[ct][0]!="") {
          ct++;
        }
        return (ct+1);
     }
   }   
   var row = firstEmptyRow.getFirstEmptyRowByColumnArray();//Assign location of the first empty row
   
   if(size == undefined)
     size = "N/A";
   
   range.getCell(row, 1).setValue((orderNumber+row)-2);
   range.getCell(row, 2).setValue(name);
   range.getCell(row, 3).setValue(orderCode);
   range.getCell(row, 4).setValue(getOrder(orderCode));
   range.getCell(row, 5).setValue(size);
   range.getCell(row, 6).setValue(quantity);
   range.getCell(row, 7).setValue(price);
   range.getCell(row, 8).setValue(subTotal);
   range.getCell(row, 9).setValue(type);
   range.getCell(row, 11).setValue(paid);
}

function getOrder(orderCode)
{
   var orderNameValue;
   
  //Assigns orderCode to its corresponding orderNameValue
   if (orderCode == "fs") {orderNameValue  = "Fracasso Special";}
   else if (orderCode == "mc") {orderNameValue  = "Meat Combo";}
   else if (orderCode == "hw") {orderNameValue  = "Hawaiian";}
   else if (orderCode == "pd") {orderNameValue  = "Pizza Dos";}
   else if (orderCode == "av") {orderNameValue  = "All Veggie";}
   else if (orderCode == "st") {orderNameValue  = "Spicy Tuna";}
   else if (orderCode == "cg") {orderNameValue  = "Cheese Garlic";}
   else if (orderCode == "cl") {orderNameValue  = "Chicken Lasagna";}
   else if (orderCode == "cz") {orderNameValue  = "Calzone";}
   else if (orderCode == "chp") {orderNameValue  = "Chocolate Pizza";}
   else if (orderCode == "cs") {orderNameValue  = "Choco Souffle";}
   else if (orderCode == "pm") {orderNameValue  = "Pepperoni Max";}
   
   return orderNameValue;
}

function getPrice(orderCode, size)
{
    var price;
    
	if	((orderCode == "fs" && size == 6) || (orderCode == "mc" && size == 6) ||
		(orderCode == "pm" && size == 6))
		price = 60;
	else if ((orderCode == "fs" && size == 10) || (orderCode == "mc" && size == 10) ||
		(orderCode == "pm" && size == 10))
		price = 175;
	else if ((orderCode == "fs" && size == 12) || (orderCode == "mc" && size == 12) ||
		(orderCode == "pm" && size == 12))
		price = 230;
	else if ((orderCode == "fs" && size == 20) || (orderCode == "mc" && size == 20) ||
		(orderCode == "pm" && size == 20))
		price = 525;
	else if ((orderCode == "fs" && size == 30) || (orderCode == "mc" && size == 30) ||
		(orderCode == "pm" && size == 30))
		price = 1135;
	else if ((orderCode == "hw" && size == 6) || (orderCode == "av" && size == 6) ||
		(orderCode == "cg" && size == 6) || (orderCode == "st" && size == 6))
		price = 58;
	else if ((orderCode == "hw" && size == 10) || (orderCode == "av" && size == 10) ||
		(orderCode == "st" && size == 10))
		price = 165;
	else if (orderCode == "cg" && size == 10)
		price = 160;
	else if (orderCode == "cp" && size == 10)
		price = 170;
	else if ((orderCode == "hw" && size == 12) || (orderCode == "av" && size == 12) ||
		(orderCode == "st" && size == 12))
		price = 210;
	else if (orderCode == "cp" && size == 12)
		price = 220;
	else if (orderCode == "cg" && size == 12)
		price = 200;
	else if (orderCode == "pd" && size == 12)
		price = 230;
	else if ((orderCode == "av" && size == 20) || (orderCode == "st" && size == 20))
		price = 505;
	else if (orderCode == "hw" && size == 20)
		price = 510;
	else if (orderCode == "cg" && size == 20)
		price = 500;
	else if (orderCode == "cp" && size == 20)
		price = 515;
	else if ((orderCode == "hw" && size == 30) || (orderCode == "av" && size == 30) ||
		(orderCode == "st" && size == 30))
		price = 1120;
	else if (orderCode == "cg" && size == 30)
		price = 1100;
	else if (orderCode == "cp" && size == 30)
		price = 1125;
	else if (orderCode == "cl")
		price = 70;
	else if (orderCode == "cz")
		price = 115;
	else if (orderCode == "chp")
		price = 290;
	else if (orderCode == "cs")
		price = 90;
	else
		price = "INVALID ORDER";
        
    return price;
}
