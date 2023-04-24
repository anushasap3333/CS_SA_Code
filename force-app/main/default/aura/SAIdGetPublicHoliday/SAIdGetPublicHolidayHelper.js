({
	searchSAID : function(component, event, helper) {
		
        var searchInput = component.get("v.searchInputvalue");
        var action = component.get("c.SAIdGetPublicHoliday");
        action.setParams({ inputSAId : searchInput });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == 'SUCCESS'){
            var valueExists = response.getReturnValue();
            var noOfSAIdSearch = "Your SA Id " +valueExists.SAId__c +" Searched for " + valueExists.SAIdNoSearched__c + " time(s).";
            component.set("v.noOfSAIdSearch",noOfSAIdSearch);
            console.log()
            var valueExistsmess = "Your SA id DOB(YYMMDD) is " + valueExists.SAIdDob__c  + ", And Gender is " + valueExists.SAIdGender__c + ", Citizenship is " +valueExists.SAIdCitizenShip__c + ". Below is the Holiday list:";//" And Number of searches are " + valueExists.SAIdNoSearched__c ;
            component.set("v.customerMessage",valueExistsmess);   
            }
            else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "There is some issue in fetching the SA details, please re try.",
                    "type": 'error'
                });
                toastEvent.fire();
                //alert('There is some issue in fetching the SA details, please re try');
            }
        });
        $A.enqueueAction(action);

	},
    
    getholidayApi : function(component, event, helper) { 
        component.set('v.columns', [
            { label: 'Holiday Name', fieldName: 'name',type: 'text' },
            { label: 'Holiday Type', fieldName: 'primary_type',type: 'text' },
            { label: 'Description', fieldName: 'description',type: 'text' },
            { label: 'Date', fieldName: 'iso',type: 'text' },

        ]);

    	var searchInput = component.get("v.searchInputvalue");
        var action = component.get("c.getPublicHolidayApi");
        action.setParams({inputSAId : searchInput});
        action.setCallback(this, function(response) { 
            var state = response.getState();
            if(state == 'SUCCESS' ) {
            var respoDataValuesString = response.getReturnValue().replaceAll('\"date\":{','').replaceAll('\"datetime\":','\"dates\":{\"datetime\":').replaceAll('T.*\"','');
            var respoDataValues = JSON.parse(respoDataValuesString);
            console.log('respoDataValues'+JSON.stringify(respoDataValues)); 
           	component.set('v.data',respoDataValues.response.holidays); 
            }
            else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "Holiday list API is not successful, please refresh the page.",
                     "type": 'error'
                });
                toastEvent.fire();
                //alert('Holiday list API is not successful, please refresh the page');
            }
        });
        $A.enqueueAction(action);
    }
    
})