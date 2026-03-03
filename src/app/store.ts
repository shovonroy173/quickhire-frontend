import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from '@/features/user/userSlice';
import { uiReducer } from '@/features/ui/uiSlice';
import { userApi } from '@/features/user/userApi';
import { jobApi } from '@/features/job/jobApi';
import { applicationApi } from '@/features/application/applicationApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    [userApi.reducerPath]: userApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      jobApi.middleware,
      applicationApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
