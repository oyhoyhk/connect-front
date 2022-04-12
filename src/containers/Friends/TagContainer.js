import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TagList from '../../components/Friends/TagList';
import {
  addTag,
  addTagInFront,
  loadTags,
  removeTag,
  removeTagInFront,
} from '../../modules/friends';

const TagContainer = () => {
  const dispatch = useDispatch();
  const { uid, tags } = useSelector(({ friends, user }) => ({
    tags: friends.tagList.split('_').filter((el) => el !== ''),
    uid: user.user.uid,
  }));
  useEffect(() => {
    if (uid) {
      dispatch(loadTags(uid));
    }
  }, [dispatch, uid]);
  const onSubmit = (e) => {
    e.preventDefault();

    const match = /[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]/g;
    const tag = e.target.tag.value.replace(match, '');
    e.target.tag.value = '';
    if (tags.includes(tag) || tag === '') {
      e.target.tag.value = '';
      return;
    }
    dispatch(addTag({ tags: tags.join('_') + '_' + tag, uid }));
    dispatch(addTagInFront(tag));
  };
  const onRemove = (e) => {
    const tag = e.target.textContent.slice(1);
    dispatch(
      removeTag({ tags: tags.filter((el) => el !== tag).join('_'), uid }),
    );
    dispatch(removeTagInFront(tag));
  };
  return <TagList onSubmit={onSubmit} onRemove={onRemove} tags={tags} />;
};

export default TagContainer;
