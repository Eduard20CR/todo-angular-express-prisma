import { HttpInterceptorFn } from '@angular/common/http';

export const widthCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    withCredentials: true,
  });
  return next(newRequest);
};
