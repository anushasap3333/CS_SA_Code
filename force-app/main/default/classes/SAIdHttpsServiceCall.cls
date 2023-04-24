public class SAIdHttpsServiceCall {
    /**
     * @description setting request for service
     * @param inputSAId
     * @return HttpRequest
     */
    public static HttpRequest SAIdHttpsService (string inputSAId){
		string endPointUrl = 'https://calendarific.com/api/v2/holidays';
        string apiKey= 'bb1609b89b0362c5d96aa977571e0898783eab07';
        //string apiKey= '24c5e86734eb44dc4a962826324a5546e74dc42f';
         Integer yearCheck = Integer.valueOf(inputSAId.substring(0,2)); 
        string Year;
        if (yearCheck > 23){
            Year = '19'+yearCheck;
        }
        else {
             Year = '20'+yearCheck;
        }
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(endPointUrl + '?api_key=' + apiKey + '&country=ZA&year=' + Year );
        return req;

    }
     /**
     * @description getting response from service
     * @param inputSAId
     * @return HttpResponse
     */
    public static HttpResponse SAIdHttpsServiceCalling(string inputSAId){
        try {
            HttpRequest reqpService = SAIdHttpsServiceCall.SAIdHttpsService(inputSAId);
            Http https = new Http();
            HttpResponse reqRespService = https.send(reqpService);
            return reqRespService;
        } 
        catch(System.Exception ex){
            system.debug('Exception occured  ' + ex.getMessage());
            return null;
        }
    }
}