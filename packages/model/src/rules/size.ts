import { Named } from "../data/named";

export class Size implements Named {
  constructor(
    public id: string,
    public name: string,
  ) {}
}
