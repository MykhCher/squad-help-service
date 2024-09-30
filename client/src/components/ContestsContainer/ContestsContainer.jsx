import {useCallback, useEffect, useRef} from 'react';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

function ContestsContainer(props)  {

  const latestProps = useRef(props);

  useEffect(() => {
    latestProps.current = props;
  });

  const scrollHandler = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      const currentProps = latestProps.current;
      if (currentProps.haveMore) {
        props.loadMore(currentProps.children.length);
      }
    }}, [props.haveMore, props.loadMore, props.children.length])
   
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []); 

  const { isFetching } = props;
  if (!isFetching && props.children.length === 0) {
    return <div className={styles.notFound}>Nothing not found</div>;
  }
  return (
    <div>
      {props.children}
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );

}

export default ContestsContainer;