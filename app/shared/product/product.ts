export class Product {
  constructor(
    public id: number,
    public name: string,
    public desc: string,
    public point: number,
    public cover: string,
    public content: string,
    public task: string,
    public link: string,
    public images: Array<any>
  ) {}
}
