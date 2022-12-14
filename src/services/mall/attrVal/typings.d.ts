declare namespace NAttrVal {
  type QueryParams = { arr_key_id?: string | number } & Global.QueryParams &
    Partial<Pick<AttrValEntity, 'name' | 'order'>>;
  type AttrValEntity = {
    id: string | number;
    name: string;
    order: string;
  };
}
