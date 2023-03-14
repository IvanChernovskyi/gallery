import cn from 'classnames';
import s from './style.module.css';

const Button = ({ onClick, className, text }) => (
  <button className={cn(s.button, className)} type="button" onClick={onClick}>
    {text}
  </button>
);

export default Button;
