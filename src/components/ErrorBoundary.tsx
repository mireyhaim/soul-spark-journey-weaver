
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("React Error Boundary caught an error:", error);
    console.error("Component stack:", errorInfo.componentStack);
    
    this.setState({
      errorInfo
    });
    
    // Log additional context if available
    if (window.location) {
      console.error("Current route:", window.location.pathname);
    }
  }

  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise show default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert className="max-w-md w-full">
            <AlertTitle className="text-xl mb-2">Something went wrong</AlertTitle>
            <AlertDescription>
              <p className="mb-4 text-sm text-earth-700">
                The application encountered an error while loading this page. Please try refreshing or return to the home page.
              </p>
              {this.state.error && (
                <div className="bg-rose-50 p-3 rounded-md mb-4 text-xs font-mono text-rose-700 overflow-auto max-h-[200px]">
                  {this.state.error.toString()}
                </div>
              )}
              <div className="flex gap-2">
                <Button onClick={this.handleRefresh} className="flex-1 flex items-center justify-center gap-2">
                  <RefreshCw size={16} />
                  <span>Refresh Page</span>
                </Button>
                <Button asChild variant="outline" className="flex items-center justify-center gap-2">
                  <Link to="/">
                    <Home size={16} />
                    <span>Go Home</span>
                  </Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
