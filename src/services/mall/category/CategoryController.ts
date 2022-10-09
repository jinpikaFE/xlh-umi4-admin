/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryCategoryList(params?: Global.pageParams) {
  return request<Global.Result<NCategory.CategoryEntity[]>>(
    '/api/mall/category',
    {
      method: 'get',
      params,
    },
  );
}

export async function addCategory(data: NCategory.CategoryEntity) {
  return request<Global.Result<NCategory.CategoryEntity>>(
    '/api/mall/category',
    {
      method: 'post',
      data,
    },
  );
}

export async function editCategory(data: Partial<NCategory.CategoryEntity>) {
  const { id, ...restData } = data;
  return request<Global.Result<NCategory.CategoryEntity>>(
    `/api/mall/category/${id}`,
    {
      method: 'patch',
      data: restData,
    },
  );
}

export async function delCategory(data: Pick<NCategory.CategoryEntity, 'id'>) {
  const { id } = data;
  return request<Global.Result<NCategory.CategoryEntity>>(
    `/api/mall/category/${id}`,
    {
      method: 'delete',
    },
  );
}
