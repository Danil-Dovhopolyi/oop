abstract class Shape {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract area(): number;
  toString(): string {
    return '';
  }
}
