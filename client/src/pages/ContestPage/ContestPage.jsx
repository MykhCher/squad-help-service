import { useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-18-image-lightbox';
// =====
import withRouter from '../../hocs/withRouter';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import Error from '../../components/Error/Error';
import 'react-18-image-lightbox/style.css';

function ContestPage(props) {

  useEffect(() => {
    getData();
    return () => props.changeEditContest(false);
  }, [])

  const getData = () => {
    const { id } = props.params;
    props.getData({ contestId: id });
  };

  const setOffersList = () => {
    const array = [];
    for (let i = 0; i < props.contestByIdStore.offers.length; i++) {
      array.push(
        <OfferBox
          data={props.contestByIdStore.offers[i]}
          key={props.contestByIdStore.offers[i].id}
          needButtons={needButtons}
          setOfferStatus={setOfferStatus}
          contestType={props.contestByIdStore.contestData.contestType}
          date={new Date()}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = props.contestByIdStore.contestData.User.id;
    const userId = props.userStore.data.id;
    const contestStatus = props.contestByIdStore.contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const setOfferStatus = (creatorId, offerId, command) => {
    props.clearSetOfferStatusError();
    const { id, orderId, priority } = props.contestByIdStore.contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    props.setOfferStatus(obj);
  };

  const findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = props.chatStore;
    const { id } = props.userStore.data;
    const participants = [id, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const goChat = () => {
    const { User } = props.contestByIdStore.contestData;
    props.goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };

  const { role } = props.userStore.data;
  const {
    contestByIdStore,
    changeShowImage,
    changeContestViewMode,
    clearSetOfferStatusError,
  } = props;
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;
  return (
    <div>
      {/* <Chat/> */}
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
          onCloseRequest={() =>
            changeShowImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain getData={props.getData} />
        </div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => changeContestViewMode(true)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => changeContestViewMode(false)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
              >
                Offer
              </span>
            </div>
            {isBrief ? (
              <Brief
                contestData={contestData}
                role={role}
                goChat={goChat}
              />
            ) : (
              <div className={styles.offersContainer}>
                {role === CONSTANTS.CREATOR &&
                  contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusError}
                  />
                )}
                <div className={styles.offers}>{setOffersList()}</div>
              </div>
            )}
          </div>
          <ContestSideBar
            contestData={contestData}
            totalEntries={offers.length}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContestPage));
