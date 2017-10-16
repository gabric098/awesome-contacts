export enum AlertType {
  Notice,
  Warning,
  Error
}

export interface Alert {
  message: string;
  type: AlertType;
}
