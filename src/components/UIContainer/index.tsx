import React from 'react';
import styles from './styles.module.scss';

interface IUIContainerProps {
    text?: string;
}

const UIContainer: React.FC<IUIContainerProps> = ({children, text}) => {
    return (
        <div className={styles.uiContainer}>
            <div className={styles.text}>{text}</div>
          {children}
        </div>
    );
  };
  
export default UIContainer;
  