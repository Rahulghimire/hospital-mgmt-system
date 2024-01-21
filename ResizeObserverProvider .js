import React from 'react';
import debounce from 'lodash/debounce';

const ResizeObserverProvider = ({ children }) => {
  const observedElementRef = React.useRef(null);

  React.useEffect(() => {
    const observerCallback = debounce((entries) => {
      try {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        // Handle resize events here
        console.log('Element resized:', entries[0].target);
      } catch (error) {
        console.error('Error handling ResizeObserver notifications:', error);
      }
    }, 500);

    let observer;
    let observedElement = observedElementRef.current; // Store the current value

    if (observedElement) {
      observer = new ResizeObserver(observerCallback);
      observer.observe(observedElement);
    }

    return () => {
      if (observer && observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, [observedElementRef]); // Add observedElementRef as a dependency

  return <div ref={observedElementRef}>{children}</div>;
};

export default ResizeObserverProvider;
