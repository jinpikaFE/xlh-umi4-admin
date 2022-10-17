declare namespace NBrand {
  type QueryParams = Global.QueryParams &
    Partial<Pick<BrandEntity, 'name' | 'logo'>>;

  type BrandEntity = {
    id: string | number;
    name: string;
    logo: string;
  };
}
