import { getCookie } from '@/utils/cookie';

const getToken = function(cookies) {
  if (typeof window === `object` && window) {
    return getCookie(`token`) || ``;
  } else {
    return getCookie(`token`, cookies) || ``;
  }
};

export default function({ $axios, store }, inject) {
  const axios = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  });

  axios.interceptors.request.use((req) => {
    req.headers.common['token'] = getToken(
      process.server && req.headers.common.cookie
    );
    
    return req;
  });

  function ajax(options) {
    const quiet = options.quiet || false;
    const status = options.status || `error`;

    delete options.quiet;
    delete options.status;

    return axios(options).then((response) => {
      const data = response.data;

      if (response.status === 200) {
        if (data.status !== `success`) {
          // 在非安静模式并且当前没有显示弹出信息时弹出信息提示
          if (!quiet && !store.state.toast.show) {
            store.commit(`set-toast`, {
              show: true,
              message: data.error || `服务异常`,
              status: status
            });
          }

          return Promise.reject(data);
        } else {
          return data;
        }
      } else {
        return {
          status: `error`,
          code: response.status,
          error: response.message || response.error
        };
      }
    });
  }

  ajax.get = function(url, params, quiet) {
    return ajax({
      url: url,
      params,
      quiet
    });
  };

  ajax.post = function(url, data, quiet) {
    return ajax({
      url: url,
      data,
      method: `post`,
      quiet
    });
  };

  inject('ajax', ajax);
}
