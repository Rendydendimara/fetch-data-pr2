export interface IAppHeaderForm {
  emkl: string;
  ratePajak: string;
  rateBonus: string;
}
export interface ISelectJobSheetID {
  value: string;
  label: string;
}

export interface IFormBuying {
  fixIsiJobsheetID: ISelectJobSheetID | null;
  nominalDipakai1IDR2USD: string;
  nominal: string;
  kurs: string;
  nominalDollar: string;
}
export interface IFormSelling {
  fixIsiJobsheetID: ISelectJobSheetID | null;
  nominalDipakai1IDR2USD: string;
  nominal: string;
  kurs: string;
  nominalDollar: string;
}

export interface IDataBuying extends IFormBuying {
  id: number;
}
export interface IDataSeling extends IFormSelling {
  id: number;
}

export interface IDataValue {
  label: string;
  value: string;
}

export interface IDataTabelBuying {
  label: string;
  data: any[]; //IDataValue[];
}
