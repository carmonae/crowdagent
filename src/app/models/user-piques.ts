export interface UserPiqueI {
  amountLeft: number;
  reloadDate: Date | undefined;
}

export class UserPique implements UserPiqueI {
  public amountLeft: number;
  public reloadDate: Date | undefined;

  constructor(
    amountLeft: number = 0,
    reloadDate: Date | undefined = undefined
  ) {
    this.amountLeft = amountLeft;
    this.reloadDate = reloadDate;
  }
}
