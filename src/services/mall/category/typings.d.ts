declare namespace NCategory {
  type CategoryEntity = {
    id?: string | number;
    name: string;
    type: string;
    parentId?: string;
    parentName?: string;
  };
}
