class Developer {
  constructor(public name: string, public salary: number) {}

  getInfo() {
    console.log('name', this.name);
    console.log('salary', this.salary);
  }
}

const developer = new Developer('Max', 2000);
developer.getInfo();
