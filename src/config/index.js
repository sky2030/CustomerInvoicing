
const domainkey = 'http://localhost:8080/isem_customer-0.0.1-SNAPSHOT'
const adminDomainKey = 'http://localhost:8080/isem_admin-0.0.1-SNAPSHOT'
module.exports = {
    default : {
        customerUrl: domainkey + '/iSEM/api/customer/organization/',
        customerPostUrl: domainkey + '/iSEM/api/customer/',
        vendorUrl: domainkey + '/iSEM/api/vendor/organization/',
        vendorPostUrl: domainkey + '/iSEM/api/vendor/',
        authenticateUrl: domainkey + '/iSEM/api/authenticate',
        registerUrl: domainkey + '/iSEM/api/register',
        organizationsUrl: domainkey + '/iSEM/api/organization/active/all',
        countriesUrl: adminDomainKey + '/iSEM/api/country/active',
        statesUrl: adminDomainKey + '/iSEM/api/state/country/',
        currencyUrl: adminDomainKey + '/iSEM/api/currency/active',
        invoiceTemplateUrl: domainkey+'/iSEM/api/invoiceTemplate/',
        TaxUrl: domainkey+`/iSEM/api/tax/organization/`,
        TaxPostUrl:domainkey+`/iSEM/api/tax`,

    }
}