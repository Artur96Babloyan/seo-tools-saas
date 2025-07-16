import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ConnectionStatusProps {
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
  onDismiss?: () => void;
}

export default function ConnectionStatus({ type, title, message, onDismiss }: ConnectionStatusProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />;
    }
  };

  const getContainerClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  const getTitleClasses = () => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
    }
  };

  const getMessageClasses = () => {
    switch (type) {
      case 'success':
        return 'text-green-700 dark:text-green-300';
      case 'error':
        return 'text-red-700 dark:text-red-300';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-300';
    }
  };

  return (
    <div className={`border rounded-lg p-6 ${getContainerClasses()}`}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${getTitleClasses()}`}>{title}</h3>
          <p className={getMessageClasses()}>{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`px-4 py-2 rounded-lg transition-colors ${type === 'success'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : type === 'error'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
              }`}
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
} 