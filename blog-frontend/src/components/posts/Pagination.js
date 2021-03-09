import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({ nickname, tag, page }) => {
    const query = qs.stringify({ tag, page });
    return nickname ? `/@${nickname}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, nickname, tag }) => {
    return (
        <PaginationBlock>
            <Button
                disabled={page === 1}
                to={page === 1 ? undefined : buildLink({ nickname, tag, page: page - 1 })}
            > 
            {`<<`}
            </Button>
            <PageNumber>{page}</PageNumber>
            <Button
                disabled={page === lastPage}
                to={page === lastPage ? undefined : buildLink({ nickname, tag, page: page + 1 })}
            >
            {`>>`}
            </Button>
        </PaginationBlock>
    )
}

export default Pagination;
