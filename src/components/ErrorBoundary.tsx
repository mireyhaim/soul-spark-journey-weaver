
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("React Error Boundary caught an error:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert className="max-w-md w-full">
            <AlertTitle className="text-xl mb-2">Something went wrong</AlertTitle>
            <AlertDescription>
              <p className="mb-4 text-sm text-earth-700">
                The application encountered an error. Please try refreshing the page.
              </p>
              {this.state.error && (
                <div className="bg-rose-50 p-3 rounded-md mb-4 text-xs font-mono text-rose-700 overflow-auto max-h-[200px]">
                  {this.state.error.toString()}
                </div>
              )}
              <Button onClick={this.handleRefresh} className="w-full flex items-center justify-center gap-2">
                <RefreshCw size={16} />
                <span>Refresh Page</span>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
