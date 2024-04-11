import React from 'react';

const Box = ({
  value,
  isMine,
  isRevealed,
  isChecked,
  onLeftClick,
  onRightClick,
}) => {
  const handleLeftClick = () => {
    onLeftClick();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onRightClick(e);
  };

  return <div onContextMenu={handleRightClick} onClick={handleLeftClick} />;
};

export default Box;
