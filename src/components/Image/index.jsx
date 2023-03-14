import s from './style.module.css';

const Image = ({ src, alt }) => <img className={s.img} src={src} alt={alt} />;

export default Image;
