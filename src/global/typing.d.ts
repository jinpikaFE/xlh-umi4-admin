declare namespace Global {
  type PageParams = {
    pageSize?: number;
    current?: number;
    search?: string;
  };

  type QueryParams = {
    startTime?: string;
    endTime?: string;
  };

  type Result<T = any> = {
    code?: number;
    message?: string;
    data: T;
    total?: number;
  };
}
