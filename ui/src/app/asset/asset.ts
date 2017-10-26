export class Asset {
	constructor(
        public model: string = "",
        public serial: string = "",
        public batchNo: string = "",
        public createDate: string = "",
        public productionDate: string = "",
        public description: string = "",
        public riskLevel: number = 0,
        public complienceStatus: string = "",
        public installedDate: string = "",
        public scheduledReplacementDate: string = "", 
        public recertificationInterval: number = 0,
        public lifeSpan: number = 0,
        public lastRecertificationDate: string = "",
        public lastRecertificationResult: string = "",
        public nextRecertificationDate: string = "",
        public relatedDeliveryOrder: number = 0,
        public status: string = "",
        public history: string = "",
   		public geolocation: string = ""
    ){}
}

export interface IAsset {
    createDate:Date;
    productionDate:Date;
    description:string;
    model:string;
    serial:string;
    batchNo:string;
  }