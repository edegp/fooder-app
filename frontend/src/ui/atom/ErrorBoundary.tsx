import { Component, ReactNode } from 'react'

import { ErrorModal } from '../components/ErrorModal'

type FallbackProps = {
  error: Error
  resetErrorBoundary: (...args: Array<unknown>) => void
}
type ErrorBoundaryProps = { FallbackComponent?: React.ComponentType<FallbackProps> }
type ErrorBoundaryState = { error: Error | null }

/**
 * @see https://github.com/bvaughn/react-error-boundary/blob/master/src/index.tsx
 * https://ja.reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
 * https://github.com/facebook/react/issues/14981#issuecomment-743916884
 */
export class ErrorBoundary extends Component<
  React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
    // bind
    this.reset = this.reset.bind(this)
  }

  static getDerivedStateFromError(error: Error) {
    // 次のレンダーでフォールバック UI が表示されるように state を更新します
    return { error: error }
  }

  reset() {
    this.setState({ error: null })
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.onUnhandledRejection)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection)
  }

  onUnhandledRejection = (event: PromiseRejectionEvent) => {
    if (event.reason) {
      this.setState(ErrorBoundary.getDerivedStateFromError(event.reason))
    }
  }
  // 表示
  render() {
    if (this.state.error) {
      return <ErrorModal error={this.state.error.message} resetError={this.reset} />
    }
    return this.props.children
  }
}
