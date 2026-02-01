'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, Auth } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider'; // Use the main hook

export interface UserAuthHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * React hook to subscribe to Firebase user authentication state.
 * @returns {UserAuthHookResult} An object containing user state, loading status, and error.
 */
export function useUser(): UserAuthHookResult {
  const { user, isUserLoading, userError } = useFirebase(); // Delegate to useFirebase
  return { user, isUserLoading, userError };
}

    