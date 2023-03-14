import s from './style.module.css';

const ListItem = ({ children }) => <li className={s.listItem}>{children}</li>;

export default ListItem;
