import s from './style.module.css';

const Container = ({ children }) => (
  <div className={s.container}>{children}</div>
);

export default Container;
