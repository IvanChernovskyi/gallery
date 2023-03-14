import s from './style.module.css';

const List = ({ children }) => <ul className={s.list}>{children}</ul>;

export default List;
