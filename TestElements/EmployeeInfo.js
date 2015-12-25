var TestElements;
(function (TestElements) {
    var EmployeeInfo = (function () {
        function EmployeeInfo(Name, Address) {
            this.Name = Name;
            this.Address = Address;
        }
        return EmployeeInfo;
    })();
    TestElements.EmployeeInfo = EmployeeInfo;
})(TestElements || (TestElements = {}));
//# sourceMappingURL=EmployeeInfo.js.map