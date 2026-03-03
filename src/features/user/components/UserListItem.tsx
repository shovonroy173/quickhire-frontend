'use client';

import React from 'react';
import { User } from '../types';

interface UserListItemProps {
  user: User;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function UserListItemComponent({ user, isActive, onSelect, onDelete }: UserListItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(user.id)}
        className="min-w-0 flex-1 text-left"
      >
        <p className="truncate font-medium text-gray-900">{user.name}</p>
        <p className="truncate text-sm text-gray-600">{user.email}</p>
      </button>
      <button
        type="button"
        onClick={() => onDelete(user.id)}
        className="ml-4 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}

const UserListItem = React.memo(UserListItemComponent);
export default UserListItem;
