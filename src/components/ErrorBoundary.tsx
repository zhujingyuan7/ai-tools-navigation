'use client';

import { Component, ReactNode } from 'react';
import EmptyState from './EmptyState';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (fallback) {
        return <>{fallback}</>;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-surface p-8">
          <div className="glass-elevated rounded-2xl p-8 max-w-md mx-auto">
            <EmptyState
              type="error"
              title="出错了"
              description={this.state.error?.message || '应用遇到了意外错误，请刷新页面重试'}
              action={{
                text: '刷新页面',
                onClick: () => window.location.reload(),
              }}
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
