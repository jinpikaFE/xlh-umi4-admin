// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'pro',
      REACT_APP_BASE_URL: 'http://xlh_nest.jinxinapp.cn',
      REACT_APP_MINIO_ENDPOINT: 'minio.aimed.cn',
      REACT_APP_MINIO_ACCESSKEY: 'TtXXdBZqdc',
      REACT_APP_MINIO_SECRETKEY: 'wPcRc1GOqEcIK8t7MCU0XvVK0t3MXZEeWaqUsOAB',
    },
  },
});
