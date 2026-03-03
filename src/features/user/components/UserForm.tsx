'use client';

import { Controller } from 'react-hook-form';
import { User } from '../types';
import { UserFormValues, useUserForm } from '../hooks/useUserForm';

interface UserFormProps {
  title: string;
  initialUser?: User;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: UserFormValues) => Promise<void>;
  onReset?: () => void;
}

export default function UserForm({
  title,
  initialUser,
  submitLabel,
  loading,
  onSubmit,
  onReset,
}: UserFormProps) {
  const { form } = useUserForm(initialUser);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="rounded-xl border border-gray-200 bg-white p-5"
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="mt-4 space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <input
                {...field}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            )}
          />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            )}
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password {initialUser ? '(optional)' : ''}
          </label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            )}
          />
          {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            )}
          />
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            onReset?.();
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
