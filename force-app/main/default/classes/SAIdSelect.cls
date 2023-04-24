public class SAIdSelect {
    /**
     * @description checks SA Id exists or not
     * @param inputSAId
     * @return SAIdEnq__c
     */
    public static SAIdEnq__c SAIdSelectQuery(string inputSAId){
        try {
            SAIdEnq__c saIdExists  = [select id, SAId__c,SAIdDob__c,SAIdGender__c, SAIdNoSearched__c,SAIdCitizenShip__c from SAIdEnq__c where SAId__c=:inputSAId limit 1];
            if (saIdExists != null){
            return saIdExists;
            }
            return null;
        }
        catch (System.Exception e){
            system.debug('Exception occured  ' + e.getMessage());
            return null;
        }
    }

}