const getToken = function() {
  if (typeof window === `object` && window) {
    return window.localStorage.getItem(`token`);
  } else {
    return ``;
  }
};

export default function({ $axios, redirect, req }, inject) {
  const ajax = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  });

  ajax.interceptors.request.use((req) => {
    req.headers.common['token'] = getToken();
    return req;
  });
  ajax.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        if (response.data.status !== `success`) {
          return Promise.reject(response.data);
        } else {
          return response.data;
        }
      } else {
        return {
          status: `error`,
          code: response.status,
          error: response.message || response.error
        };
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  if (process.env.NODE_ENV === `development`) {
    ajax.setBaseURL('http://192.168.0.105:3001');
  } else {
    ajax.setBaseURL('http://shop.xvivx.online');
  }

  // Inject to context as $request
  inject('ajax', ajax);
}
