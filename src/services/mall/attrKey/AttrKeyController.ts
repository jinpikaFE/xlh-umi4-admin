/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryAttrKeyList(
  params: NAttrKey.QueryParams & Global.PageParams,
) {
  return request<Global.Result<NAttrKey.AttrKeyEntity[]>>(
    '/api/mall/attr-key',
    {
      method: 'get',
      params,
    },
  );
}

export async function addAttrKey(data: NAttrKey.AttrKeyEntity) {
  return request<Global.Result<NAttrKey.AttrKeyEntity>>('/api/mall/attr-key', {
    method: 'post',
    data,
  });
}

export async function editAttrKey(data: Partial<NAttrKey.AttrKeyEntity>) {
  const { id, ...restData } = data;
  return request<Global.Result<NAttrKey.AttrKeyEntity>>(
    `/api/mall/attr-key/${id}`,
    {
      method: 'patch',
      data: restData,
    },
  );
}

export async function delAttrKey(data: Pick<NAttrKey.AttrKeyEntity, 'id'>) {
  const { id } = data;
  return request<Global.Result<NAttrKey.AttrKeyEntity>>(
    `/api/mall/attr-key/${id}`,
    {
      method: 'delete',
    },
  );
}
