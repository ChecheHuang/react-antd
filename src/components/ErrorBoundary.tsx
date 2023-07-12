import { Component, ReactNode, ErrorInfo, ComponentType } from 'react'

interface ErrorBoundaryProps {
  Fallback?: ComponentType<{ error: Error }>
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    const { error } = this.state
    const { children, Fallback } = this.props
    if (error && !Fallback) return <ErrorScreen error={error} />
    if (error && Fallback) return <Fallback error={error} />
    return children
  }
}

interface ErrorScreenProps {
  error: Error
}

function ErrorScreen({ error }: ErrorScreenProps) {
  return (
    <div>
      <h3>{error.message}</h3>
    </div>
  )
}
