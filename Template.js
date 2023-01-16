/**
 * 通过继承实现
 */
// abstract class Task {
//   private auditTrail: AuditTrail;
var TransferMoney = /** @class */ (function () {
    function TransferMoney() {
    }
    TransferMoney.prototype.doExcute = function () {
        console.log("transfer money");
    };
    return TransferMoney;
}());
var GenerateReport = /** @class */ (function () {
    function GenerateReport() {
    }
    GenerateReport.prototype.doExcute = function () {
        console.log("generate report");
    };
    return GenerateReport;
}());
var AuditTrail = /** @class */ (function () {
    function AuditTrail() {
    }
    AuditTrail.prototype.record = function () {
        console.log("audit");
    };
    return AuditTrail;
}());
var TaskExcutor = /** @class */ (function () {
    function TaskExcutor(auditTrail) {
        this.auditTrail = auditTrail;
    }
    TaskExcutor.prototype.excute = function (task) {
        this.auditTrail.record();
        task.doExcute();
    };
    return TaskExcutor;
}());
new TaskExcutor(new AuditTrail()).excute(new TransferMoney());
new TaskExcutor(new AuditTrail()).excute(new GenerateReport());
