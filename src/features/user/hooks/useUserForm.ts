'use client';

import { useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UpsertUserPayload, User } from '../types';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Enter a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
  role: z.enum(['admin', 'user']),
});

export type UserFormValues = z.infer<typeof userSchema>;

export const useUserForm = (initialUser?: User) => {
  const defaultValues = useMemo<UserFormValues>(
    () => ({
      name: initialUser?.name ?? '',
      email: initialUser?.email ?? '',
      password: '',
      role: initialUser?.role ?? 'user',
    }),
    [initialUser]
  );

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const toPayload = (values: UserFormValues): UpsertUserPayload => {
    const payload: UpsertUserPayload = {
      id: initialUser?.id,
      name: values.name,
      email: values.email,
      role: values.role,
    };

    if (values.password) {
      payload.password = values.password;
    }

    return payload;
  };

  return { form, toPayload };
};
