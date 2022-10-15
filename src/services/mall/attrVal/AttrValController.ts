/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryAttrValList(
  params: NAttrVal.QueryParams & Global.PageParams,
) {
  return request<Global.Result<NAttrVal.AttrValEntity[]>>(
    '/api/mall/attr-val',
    {
      method: 'get',
      params,
    },
  );
}

export async function addAttrVal(data: NAttrVal.AttrValEntity) {
  return request<Global.Result<NAttrVal.AttrValEntity>>('/api/mall/attr-val', {
    method: 'post',
    data,
  });
}

export async function editAttrVal(data: NAttrVal.AttrValEntity) {
  const { id, ...restData } = data;
  return request<Global.Result<NAttrVal.AttrValEntity>>(
    `/api/mall/attr-val/${id}`,
    {
      method: 'patch',
      data: restData,
    },
  );
}

export async function delAttrVal(data: Pick<NAttrVal.AttrValEntity, 'id'>) {
  const { id } = data;
  return request<Global.Result<NAttrVal.AttrValEntity>>(
    `/api/mall/attr-val/${id}`,
    {
      method: 'delete',
    },
  );
}
