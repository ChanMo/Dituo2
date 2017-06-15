export class Task {
  constructor(
    public id: number,
    public member: string,
    public product: number,
    public description: string,
    public point: number,
    public screenshot: string,
    public status: number,
    public image: string,
    public created: string,
  ) {}

  getStatusName() {
    //console.log(this.status);
    var name: string = 'none';
    switch (this.status) {
      case 1: {
        name = '新任务';
        break;
      }
      case 2: {
        name = '已通过';
        break;
      }
      case 3: {
        name = '未通过';
        break;
      }
      case 4: {
        name = '任务结束';
        break;
      }
      default: {
        name = '未知';
        break;
      }
    }
    return name;
  }
}
