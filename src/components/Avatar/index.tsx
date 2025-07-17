import { css } from '@/utils';
import { useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

type Props = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
};

export function Avatar({ src, alt = 'Imagen de perfil', size = 48, className = '' }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={css(styles.avatar, className)}
      style={{
        width: size,
        height: size,
      }}>
      {!imgError ? (
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={styles.img}
          onError={() => setImgError(true)}
          loading='lazy'
        />
      ) : (
        <Icon name='user' size={size * 0.75} />
      )}
    </div>
  );
}
