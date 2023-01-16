var Button = /** @class */ (function () {
    function Button(commond) {
        this.commond = commond;
    }
    Button.prototype.setLabel = function (label) {
        this.label = label;
    };
    Button.prototype.click = function () {
        this.commond.excute();
    };
    return Button;
}());
var addCustomerCommond = /** @class */ (function () {
    function addCustomerCommond(customerService) {
        this.customerService = customerService;
    }
    addCustomerCommond.prototype.excute = function () {
        this.customerService.addCustomer();
    };
    return addCustomerCommond;
}());
var CustomerService = /** @class */ (function () {
    function CustomerService() {
    }
    CustomerService.prototype.addCustomer = function () {
        console.log("add customer");
    };
    return CustomerService;
}());
var btn = new Button(new addCustomerCommond(new CustomerService()));
btn.click();
