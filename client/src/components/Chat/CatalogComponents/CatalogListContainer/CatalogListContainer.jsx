import { useEffect } from 'react';
import { connect } from 'react-redux';
// =====
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

function CatalogListContainer(props) {

  useEffect(() => {
    props.getCatalogList();
  }, [])

  const removeChatFromCatalog = (event, chatId) => {
    const { id } = props.chatStore.currentCatalog;
    props.removeChatFromCatalog({ chatId, catalogId: id });
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { messagesPreview, currentCatalog } = props.chatStore;
    const { conversations } = currentCatalog;
    const dialogsInCatalog = [];
    for (let i = 0; i < messagesPreview.length; i++) {
      for (let j = 0; j < conversations.length; j++) {
        if (conversations[j].id === messagesPreview[i].conversationId) {
          dialogsInCatalog.push(messagesPreview[i]);
        }
      }
    }
    return dialogsInCatalog;
  };

  const { catalogList, isShowChatsInCatalog } = props.chatStore;
  const { id: userId } = props.userStore.data;

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={userId}
          preview={getDialogsPreview()}
          removeChat={removeChatFromCatalog}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalog: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
