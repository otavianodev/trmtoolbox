'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

interface User {
  id: string
  email: string
  name?: string
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (data: { name?: string; email?: string }) => Promise<void>
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Storage keys
const USERS_KEY = 'trm_toolbox_users'
const CURRENT_USER_KEY = 'trm_toolbox_current_user'

// Default admin user
const DEFAULT_ADMIN = {
  id: 'admin-1',
  email: 'admin@example.com',
  name: 'Admin',
  passwordHash: 'admin123',
  isAdmin: true,
  createdAt: new Date().toISOString()
}

const initializeUsers = () => {
  if (typeof window === 'undefined') return
  
  try {
    const stored = localStorage.getItem(USERS_KEY)
    if (!stored) {
      // Initialize with default admin
      localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN]))
    } else {
      // Check if admin exists in stored users
      const users = JSON.parse(stored)
      const adminExists = users.some((u: any) => u.isAdmin)
      if (!adminExists) {
        // Add admin if not present
        users.unshift(DEFAULT_ADMIN)
        localStorage.setItem(USERS_KEY, JSON.stringify(users))
      }
    }
  } catch (error) {
    console.error('Error initializing users:', error)
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN]))
  }
}

const getStoredUsers = () => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(USERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error getting users:', error)
    return []
  }
}

const saveUsers = (users: any[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch (error) {
    console.error('Error saving users:', error)
  }
}

const getCurrentUser = () => {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

const saveCurrentUser = (user: User | null) => {
  if (typeof window === 'undefined') return
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  } catch (error) {
    console.error('Error saving current user:', error)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    try {
      initializeUsers()
      const storedUser = getCurrentUser()
      setUser(storedUser)
    } catch (error) {
      console.error('Error in auth initialization:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const users = getStoredUsers()
      const foundUser = users.find(u => u.email === email && u.passwordHash === password)
      
      if (!foundUser) {
        throw new Error('Invalid credentials')
      }

      const { passwordHash, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      saveCurrentUser(userWithoutPassword)
      router.push('/dashboard')
      
      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo de volta!',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: 'E-mail ou senha incorretos.',
      })
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const users = getStoredUsers()
      if (users.some(u => u.email === email)) {
        throw new Error('User already exists')
      }

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        passwordHash: password,
        createdAt: new Date().toISOString()
      }

      users.push(newUser)
      saveUsers(users)

      const { passwordHash, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      saveCurrentUser(userWithoutPassword)
      router.push('/dashboard')
      
      toast({
        title: 'Conta criada com sucesso',
        description: 'Bem-vindo ao TRM Toolbox!',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar conta',
        description: 'Este e-mail já está em uso.',
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      saveCurrentUser(null)
      router.push('/')
      
      toast({
        title: 'Logout realizado',
        description: 'Até logo!',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer logout',
        description: 'Tente novamente.',
      })
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const users = getStoredUsers()
      const user = users.find(u => u.email === email)
      if (!user) {
        throw new Error('User not found')
      }

      toast({
        title: 'E-mail enviado',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao enviar e-mail',
        description: 'Usuário não encontrado.',
      })
      throw error
    }
  }

  const updateProfile = async (data: { name?: string; email?: string }) => {
    try {
      if (!user) throw new Error('No user logged in')

      const users = getStoredUsers()
      const userIndex = users.findIndex(u => u.id === user.id)
      
      if (userIndex === -1) throw new Error('User not found')

      // Update user in storage
      users[userIndex] = { ...users[userIndex], ...data }
      saveUsers(users)

      // Update current user
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      saveCurrentUser(updatedUser)

      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar perfil',
        description: 'Não foi possível atualizar suas informações.',
      })
      throw error
    }
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!user) throw new Error('No user logged in')

      const users = getStoredUsers()
      const userIndex = users.findIndex(u => u.id === user.id)
      
      if (userIndex === -1) throw new Error('User not found')
      if (users[userIndex].passwordHash !== currentPassword) {
        throw new Error('Invalid current password')
      }

      // Update password in storage
      users[userIndex].passwordHash = newPassword
      saveUsers(users)

      toast({
        title: 'Senha atualizada',
        description: 'Sua senha foi alterada com sucesso.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar senha',
        description: 'Senha atual incorreta ou erro ao atualizar.',
      })
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}