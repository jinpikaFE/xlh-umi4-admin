declare namespace NAttrVal {
  type QueryParams = Global.QueryParams &
    Partial<Pick<AttrValEntity, 'name' | 'order'>>;
  type AttrValEntity = {
    id: string | number;
    name: string;
    order: string;
  };
}
