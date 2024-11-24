import css from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = { onClick: () => void };

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => {
  return (
    <button className={css.loadMoreBtn} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;