/**
 * 通过继承实现
 */
// abstract class Task {
//   private auditTrail: AuditTrail;

//   constructor(auditTrail: AuditTrail) {
//     this.auditTrail = auditTrail;
//   }
//   excute() {
//     this.auditTrail.record();
//     this.doExcute();
//   }
//   protected abstract doExcute(): void;
// }

// class AuditTrail {
//   record() {
//     console.log("audit");
//   }
// }

// class TransferMoney extends Task {
//   constructor(auditTrail: AuditTrail) {
//     super(auditTrail);
//   }

//   protected doExcute(): void {
//     console.log("transfer money");
//   }
// }

// class GenerateReport extends Task {
//   constructor(auditTrail: AuditTrail) {
//     super(auditTrail);
//   }

//   protected doExcute(): void {
//     console.log("generate report");
//   }
// }

// const transferMoney = new TransferMoney(new AuditTrail());
// const generateReport = new GenerateReport(new AuditTrail());

// transferMoney.excute();
// generateReport.excute();

/**
 * 通过多态实现
 */

interface Task {
  doExcute(): void;
}

class TransferMoney implements Task {
  doExcute(): void {
    console.log("transfer money");
  }
}

class GenerateReport implements Task {
  doExcute(): void {
    console.log("generate report");
  }
}

class AuditTrail {
  record() {
    console.log("audit");
  }
}

class TaskExcutor {
  private auditTrail: AuditTrail;

  constructor(auditTrail: AuditTrail) {
    this.auditTrail = auditTrail;
  }

  excute(task: Task) {
    this.auditTrail.record();
    task.doExcute();
  }
}

new TaskExcutor(new AuditTrail()).excute(new TransferMoney());
new TaskExcutor(new AuditTrail()).excute(new GenerateReport());
