import { createContext, useContext, useReducer, useCallback, useEffect, useMemo } from 'react';
import type { User, UserRole, AuthState, AuthContextType } from '../types';

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

type ActionType = 
  | { type: 'INITIALIZE'; payload: { isAuthenticated: boolean; user: User | null } }
  | { type: 'LOGIN'; payload: { user: User } }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: { user: User } };

const handlers = {
  INITIALIZE: (state: AuthState, action: { payload: { isAuthenticated: boolean; user: User | null } }) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: AuthState, action: { payload: { user: User } }) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: AuthState) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: AuthState, action: { payload: { user: User } }) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

function reducer(state: AuthState, action: ActionType) {
  return handlers[action.type]?.(state, action as any) ?? state;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        // TODO: Validate token and get user data
        const user = {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'doctor' as UserRole,
        };

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (email: string, password: string) => {
    // TODO: Implement actual login
    const user = {
      id: '1',
      name: 'John Doe',
      email,
      role: 'doctor' as UserRole,
    };

    localStorage.setItem('accessToken', 'dummy_token');

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, role: UserRole) => {
    // TODO: Implement actual registration
    const user = {
      id: '1',
      name,
      email,
      role,
    };

    localStorage.setItem('accessToken', 'dummy_token');

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  }, []);

  const contextValue = useMemo(() => ({
    ...state,
    login,
    logout,
    register,
  }), [state, login, logout, register]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
