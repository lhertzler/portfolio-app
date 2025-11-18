'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
  duration?: number;
};

type ToastContextType = {
  toasts: Toast[];
  toast: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((newToast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    const toastWithId = { ...newToast, id };
    setToasts((prev) => [...prev, toastWithId]);

    const duration = newToast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-20 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const variantStyles = {
    default: 'bg-background border-border',
    success: 'bg-green-500/10 border-green-500/50 text-green-500',
    error: 'bg-red-500/10 border-red-500/50 text-red-500',
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out',
        'animate-[slideInRight_0.3s_ease-out]',
        variantStyles[toast.variant ?? 'default']
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {toast.title && <div className="font-semibold text-sm">{toast.title}</div>}
          {toast.description && (
            <div className="text-sm text-muted-foreground mt-1">{toast.description}</div>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}

