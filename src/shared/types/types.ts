export type metaType = {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
};
export type offersType = {
  readonly id: number;
  readonly percentage: number;
  readonly amount: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly title: string;
  readonly image: string;
  readonly type: string;
};
export type responseType = {
  readonly statusCode: number;
  readonly status: boolean;
  readonly message: string;
  readonly data: any;
};
export type LocationType = {
  country: string;
  district: string;
  latitude: number;
  longitude: number;
  plus_code: string;
  postal_code: string;
  route: string;
  state: string;
  street_address: string;
  taluk: string;
};
export type reduxType = {
  User: any;
  Category: any;
  Cart: any;
  Notification: any;
  Language: any;
  Settings: any;
  Location: any;
};

export type CorporateRegisterType = {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  code: string;
  phone: string;
  password: string;

  store_name: string;
  business_address: string;
  business_location: string;
  business_type: string;
  trn_number: string;
  trade_lisc_no: string;
  upscs: string;
  manufacture: string;
  agreement: string;

  seller_name: string;
  seller_country: string;
  birth_country: string;
  dob: Date;
  id_type: string;
  id_proof: any;
  id_issue_country: string;
  id_expiry_date: Date;
  trn_upload: any;
  status: string;
};

export type IndividualSellerDetailsType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  business_location: string;
  business_type: string;
  visa_status: string;
  age: number;
  gender: string;
  language: string;
  interest: number;
  status: string;
};
export type currentLoctionType = {
  country: string;
  postal_code: string;
  state: string;
  district: string;
  taluk: string;
  plus_code: string;
  street_address: string;
  route: string;
  latitude: number;
  longitude: number;
  premise: string;
};

export type AwsImageUploadResponseType = {
  ETag: string;
  ServerSideEncryption: string;
  VersionId: string;
  Location: string;
  key: string;
  Key: string;
  Bucket: string;
};
