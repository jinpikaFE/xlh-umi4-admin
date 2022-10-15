declare namespace NAttrKey {
  type QueryParams = Global.QueryParams & Partial<AttrKeyEntity>;

  type AttrKeyEntity = {
    id: string | number;
    name: string;
    is_filter: boolean;
    is_sku: boolean;
    order: number;
    attr_val?: number[] | NAttrVal.AttrValEntity[] | any;
  };
}
