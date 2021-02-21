import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TagBox from '../../components/writePost/TagBox';
import { changePostField } from '../../modules/writePost';

const TagBoxContainer = () => {
    const dispatch = useDispatch();
    const tags = useSelector(state => state.writePost.tags);

    const onChangeTags = (nextTags) => {
        dispatch(
            changePostField({
                key: 'tags',
                value: nextTags,
            }),
        );
    };

    return <TagBox onChangeTags={onChangeTags} tags={tags} />
};

export default TagBoxContainer;
