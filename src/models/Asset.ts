export class Location {
  constructor(
    public country: string,
    public state: string,
    public city: string,
    public street: string,
    public postcode: string
  ) {}
}

export class Asset {
  constructor(
    public name: string,
    public number: number,
    public condition: string,
    public material: string,
    public lastInspectionDate: string,
    public lastUploadDate: string,
    public location: Location,
    public inspectionNotes: string,
    public photoURLs: string[] 
  ) {}
}

export interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
  postcode: string;
}

export interface AssetInfo {
  assetName: string;
  assetNumber: string;
  assetCondition: string;
  assetMaterialType: string;
}

export interface DateInfo {
  dateUploaded: string;
  dateLastInspected: string;
}

export interface Upload {
  id: string;
  address: Address;
  assetInfo: AssetInfo;
  dateInfo: DateInfo;
  inspectionNotes: {
    inspectionNotes: string;
  };
  photoURLs: string[];
}
