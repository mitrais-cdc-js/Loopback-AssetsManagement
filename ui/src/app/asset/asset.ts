import * as moment from 'moment';

export class Asset {

  public static readonly DATE_FORMAT = 'DD/MM/YYYY';

  constructor(
          public model: string = '',
          public serial: string = '',
          public batchNo: string = '',
          public createDate: string = '',
          public productionDate: string = '',
          public description: string = '',
          public riskLevel: number = 0,
          public complienceStatus: string = '',
          public installedDate: string = '',
          public scheduledReplacementDate: string = '',
          public recertificationInterval: number = 0,
          public lifeSpan: number = 0,
          public lastRecertificationDate: string = '',
          public lastRecertificationResult: string = '',
          public nextRecertificationDate: string = '',
          public relatedDeliveryOrder: number = 0,
          public status: string = '',
          public history: string = '',
          public geolocation: string = '',
          public categoryId: string = ''
      ) {}

  public static compareDate(direction: any, a: any, b: any) {

    console.log('yes im called');

    const dateA  = moment(a, Asset.DATE_FORMAT);
    const dateB  = moment(b, Asset.DATE_FORMAT);

    if ( moment(dateA).isBefore(dateB) )  {
      return -1 * direction;
    }
    if (moment(dateA).isAfter(dateB) ) {
      return direction;
    }
    return 0;
  }
}

export interface IAsset {
    createDate: Date;
    productionDate: Date;
    description: string;
    model: string;
    serial: string;
    batchNo: string;
  }
