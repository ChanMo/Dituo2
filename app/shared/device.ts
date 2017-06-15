export class Device {
  constructor(
    public model: string,
    public type: string,
    public os: string,
    public os_version: string,
    public sdk_version: string,
    public language: string,
    public manufacturer: string,
    public uuid: string
  ){}
}
