({
	searchSAID : function(component, event, helper) {
         var searchInput = component.get("v.searchInputvalue");
        var blnerror = false;
        var validity = component.find("searchInput").get("v.validity");
        //var checkSumValiditybln = checkSumValidity(component, event, helper);
        var tmpSearchInput = searchInput;
        var tmpSum = 0;
        var isSecond = false;
        for (var i = tmpSearchInput.length - 1; i >= 0; i--){
            let d = tmpSearchInput[i].charCodeAt() - '0'.charCodeAt();
            if(isSecond == true){
                d= d*2;
            }
            tmpSum += parseInt(d / 10, 10);
            tmpSum += d % 10;
            isSecond = !isSecond;
        }
        var validChecksum = (tmpSum % 10 == 0);
        var saIdYear = parseInt(searchInput.substr(0,2));
        var saIdMonth = parseInt(searchInput.substr(2,2));
        var saIdDay = parseInt(searchInput.substr(4,2));
        var saIdCitizenship = parseInt(searchInput.substr(10,1));
        if (saIdYear > 99){
            component.set("v.disabledbtn",true);
            alert('Enter Valid SA ID - DOB Year is incorrect');
             blnerror = true;
        } 
        else if(saIdMonth < 1 ||  saIdMonth > 12){
            component.set("v.disabledbtn",true);
            //alert('Enter Valid SA ID - DOB Month is incorrect');
             blnerror = true;
        }
        else if (saIdDay < 0 || saIdDay > 31){
               component.set("v.disabledbtn",true);
            //alert('Enter Valid SA ID - DOB date is incorrect');
             blnerror = true;
        }
         else if (saIdCitizenship != 0 && saIdCitizenship != 1){
             component.set("v.disabledbtn",true);
                 //alert('Enter Valid SA ID - Citizenship is incorrect' + saIdCitizenship);
              blnerror = true;
         }
             else if (!validChecksum){
                 component.set("v.disabledbtn",true);
                 //alert('Enter Valid SA ID - Checksum is not valid');
                  blnerror = true;
             }
             else if (!validity.valid){
                 component.set("v.disabledbtn",true);
                 //alert('Enter Valid SA ID');
                 blnerror = true;
             }
        else { 
        	helper.searchSAID(component, event, helper);
        	helper.getholidayApi(component, event, helper);
        }
        if (blnerror){
            var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "Please enter Valid South African ID",
                    "type": 'error'
                });
                toastEvent.fire();
        }
                
	},
    handleChange : function(component, event, helper) { 
       var searchInput = component.get("v.searchInputvalue");
        component.set("v.customerMessage", "");
         component.set("v.noOfSAIdSearch","");
        
        if (searchInput.length == 13){
        	component.set("v.disabledbtn",false);
        }
        else{
            component.set("v.disabledbtn",true);
        }
    } 
    
})