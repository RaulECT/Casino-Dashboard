import axios from 'axios'

class Api {
    constructor() {
        this.apiURL = 'http://springlabsdevs.online/casinos/api'
        this.appType = 'adminModule'
        this.appID = 'A2'
        this.deviceID = 'eyJQcm9jZXNzb3JJZCI6IkJGRUJGQkZGMDAwMzA2QTkiLCJNb3RoZXJCb2FyZElkIjoiQzlOMENKODU3NTkwMzczIn0='
      
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsIm5hbWUiOiJhZG1pbjEgYWRtaW4xIGFkbWluMSIsInBlcm1pc3Npb25zIjp7ImFkbWluTW9kdWxlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJCYWxhbmNlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJzIjp0cnVlLCJjcmVhdGVDdXN0b21lcnMiOnRydWUsImVkaXRDYXJkSWQiOnRydWUsImVkaXRDdXN0b21lcnMiOnRydWUsInBpdGJvc3NNb2R1bGUiOnRydWUsInJlY2VwdGlvbiI6dHJ1ZSwidGFibGVHYW1lIjp0cnVlLCJ0aWxsIjp0cnVlfSwiYXBwSWQiOiJBMiIsImlhdCI6MTUyNDE1MjIwOCwiZXhwIjoxNTI0MTgxMDA4fQ.kNrPEoq8XGSR6pVeZn0bQMWugPUblmcajSIIAMtdtK8'
        
    }

    getClientByName( name ) {

        return axios.get( `${this.apiURL}/reception/customers_by_name?partName=${name}&sliceSize=10&sliceNumber=1`, {
          headers: {token: this.token},
          validateStatus: function (status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        } )
    }
}

module.exports = Api