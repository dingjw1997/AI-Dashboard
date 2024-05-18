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
        public inspectionNotes: string
    ) {}
  }