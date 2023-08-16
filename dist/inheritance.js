"use strict";
class Developer {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    getInfo() {
        console.log('name', this.name);
        console.log('salary', this.salary);
    }
}
const developer = new Developer('Max', 2000);
developer.getInfo();
//# sourceMappingURL=inheritance.js.map