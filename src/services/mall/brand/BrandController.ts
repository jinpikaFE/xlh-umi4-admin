/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryBrandList(
  params: NBrand.QueryParams & Global.PageParams,
) {
  return request<Global.Result<NBrand.BrandEntity[]>>('/api/mall/brand', {
    method: 'get',
    params,
  });
}

export async function addBrand(data: NBrand.BrandEntity) {
  return request<Global.Result<NBrand.BrandEntity>>('/api/mall/brand', {
    method: 'post',
    data,
  });
}

export async function editBrand(data: NBrand.BrandEntity) {
  const { id, ...restData } = data;
  return request<Global.Result<NBrand.BrandEntity>>(`/api/mall/brand/${id}`, {
    method: 'patch',
    data: restData,
  });
}

export async function delBrand(data: Pick<NBrand.BrandEntity, 'id'>) {
  const { id } = data;
  return request<Global.Result<NBrand.BrandEntity>>(`/api/mall/brand/${id}`, {
    method: 'delete',
  });
}
