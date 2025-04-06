import React from 'react';
import styles from './MedalCard.module.css';

interface MedalCardProps {
  medalType: 'gold' | 'silver' | 'bronze';
}

const MedalCard: React.FC<MedalCardProps> = ({ medalType }) => {
  const getBackgroundColor = (medalType: 'gold' | 'silver' | 'bronze') => {
    switch (medalType) {
      case 'gold':
        return 'gold';  
      case 'silver':
        return 'silver'; 
      case 'bronze':
        return '#cd7f32'; 
      default:
        return 'transparent';
    }
  };

  const backgroundColor = getBackgroundColor(medalType);

  return (
    <div className={styles.medalIcon}
      style={{
        backgroundColor: backgroundColor
      }}
    >
    </div>
  );
};

export default MedalCard;
