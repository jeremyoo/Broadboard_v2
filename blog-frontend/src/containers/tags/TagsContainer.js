import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TagsList from '../../components/tags/TagsList';
import { listTagsPosts, changeTags, unloadTagsPosts } from '../../modules/tags';
import { unloadProfile } from '../../modules/profile';

const TagsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { posts, page, lastpage, tag, error, loading } = useSelector(
        ({ tags, loading }) => ({
            posts: tags.posts,
            page: tags.page,
            lastpage: tags.lastpage,
            tag: tags.tag,
            error: tags.error,
            loading: loading['tags/LIST_TAGSPOSTS'],
        }),
    );

    useEffect(() => {
        dispatch(unloadProfile());
        const tagsUri = history.location.pathname.split('/')[1];
        const tagUri = history.location.pathname.split('/')[2];
        ((tagUri !== "") && (tagsUri === "tags")) ? onChangeTags(tagUri) : onChangeTags('');
        if (tag && (tag.length !== 0) && posts && page !== 1) dispatch(listTagsPosts({tag, page}));
        if (tag && (tag.length !== 0)) dispatch(listTagsPosts({tag}));
    }, [dispatch, tag, page]);

    const onChangeTags = (tag) => dispatch(changeTags(tag));
   
    return (
        <TagsList
            posts={posts}
            tag={tag}
            loading={loading}
            error={error}
            changeTags={changeTags}
        />
    );
};

export default withRouter(TagsContainer);