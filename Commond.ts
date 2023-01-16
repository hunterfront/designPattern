class Button {
  private label: string;
  private commond: Commond;

  constructor(commond: Commond) {
    this.commond = commond;
  }

  setLabel(label: string) {
    this.label = label;
  }

  click() {
    this.commond.excute();
  }
}

interface Commond {
  excute(): void;
}

class AddCustomerCommond implements Commond {
  private customerService: CustomerService;

  constructor(customerService: CustomerService) {
    this.customerService = customerService;
  }

  excute(): void {
    this.customerService.addCustomer();
  }
}

class CustomerService {
  addCustomer() {
    console.log("add customer");
  }
}

let btn = new Button(new AddCustomerCommond(new CustomerService()));
btn.click();
