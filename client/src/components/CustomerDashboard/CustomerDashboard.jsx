import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
// =====
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import styles from './CustomerDashboard.module.sass';


function CustomerDashboard(props) {
  const loadMore = startFrom => {
    props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: props.customerFilter,
    });
  };

  useEffect(() => {
    getContests();
  }, [props.customerFilter]);

  useEffect(() => {
    return () => {
      props.clearContestsList();
    };
  }, []);

  const getContests = () => {
    props.getContests({
      limit: 8,
      contestStatus: props.customerFilter,
    });
  };


  const goToExtended = contest_id => {
    props.navigate(`/contest/${contest_id}`);
  };

  const setContestList = () => {
    const array = [];
    const { contests } = props;
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={goToExtended}
        />
      );
    }
    return array;
  };

  const tryToGetContest = () => {
    props.clearContestsList();
    getContests();
  };

  const { error, haveMore } = props;
  const { customerFilter } = props;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div
          onClick={() =>
            props.newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
          })}
        >
          Active Contests
        </div>
        <div
          onClick={() =>
            props.newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
          })}
        >
          Completed contests
        </div>
        <div
          onClick={() =>
            props.newFilter(CONSTANTS.CONTEST_STATUS_PENDING)
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
          })}
        >
          Inactive contests
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest()} />
        ) : (
          <ContestsContainer
            isFetching={props.isFetching}
            loadMore={loadMore}
            navigate={props.navigate}
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => state.contestsList;

const mapDispatchToProps = dispatch => ({
  getContests: data =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: filter => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
