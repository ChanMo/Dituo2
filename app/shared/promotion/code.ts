export class Code {
  constructor(
    public number: string,
    public created: string,
    public children_list: Array<any>,
    public children_count: number,
    public descendant_count: number,
  ) {}
}
