import React, { Suspense } from 'react'
import clsx from 'clsx'
import styles from './loader.module.scss'
export default function LazyLoad(
  ComponentPromise: Promise<{ default: React.ComponentType<object> }>
) {
  const LazyComponent = React.lazy(() => ComponentPromise)

  return (
    <Suspense fallback={<Loader />}>
      <LazyComponent />
    </Suspense>
  )
}

function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-400">
      <div
        className={clsx(
          'h-full bg-gradient-to-r from-green-500 to-blue-500',
          styles.animateLoader
        )}
      ></div>
    </div>
  )
}
