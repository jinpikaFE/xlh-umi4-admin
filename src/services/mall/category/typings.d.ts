declare namespace NCategory {
  type CategoryEntity = {
    id: string | number;
    name: string;
    is_show: boolean;
    icon?: string | any[] | any;
    banner?: string[] | any;
    key_words?: string;
    desc?: string;
    order?: number;
    p?: {
      id: string;
      name: string;
    };
    attr_key?: NAttrKey.AttrKeyEntity[];
    product?: any[];
  };
}
