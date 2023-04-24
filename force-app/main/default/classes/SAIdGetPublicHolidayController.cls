public class SAIdGetPublicHolidayController {
    @AuraEnabled
     /**
     * @description to get public holidays
     * @param inputSAId
     * @return SAIdEnq__c
     */
    public static SAIdEnq__c SAIdGetPublicHoliday(string inputSAId){
        SAIdEnq__c saIdExists = SAIdSelect.SAIdSelectQuery(inputSAId); 
        if(saIdExists != null){
            saIdExists.SAIdNoSearched__c++;
            update saIdExists;
            return saIdExists;
        }
        else {
            string tmpinputSAId = inputSAId;
            SAIdEnq__c saiIdEnq = new SAIdEnq__c();
            saiIdEnq.SAId__c = inputSAId;
            saiIdEnq.SAIdDob__c = inputSAId.substring(0,6);
            Integer genderCheck = Integer.valueOf(inputSAId.substring(6,10));
            if (genderCheck > 4999){
                saiIdEnq.SAIdGender__c = 'Male';
            }
            else {
                saiIdEnq.SAIdGender__c = 'Female';
            }
            Integer citizenshipCheck = Integer.valueOf(inputSAId.substring(10,11));
            if(citizenshipCheck == 0){
                 saiIdEnq.SAIdCitizenShip__c='SA Citizen';
            }else if (citizenshipCheck == 1) {
            	saiIdEnq.SAIdCitizenShip__c='Perminant Citizen';
            }
            saiIdEnq.SAIdNoSearched__c = 1;
            Insert saiIdEnq;
            return saiIdEnq;
            
        }    
    }
     /**
     * @description calling holiday api service
     * @param inputSAId
     * @return string
     */
   @AuraEnabled
    public static string getPublicHolidayApi(string inputSAId){
         HttpResponse reqRespService =  SAIdHttpsServiceCall.SAIdHttpsServiceCalling(inputSAId);
        if (reqRespService != null){
            return reqRespService.getBody();
        }
        
        return null;
    }
        

}