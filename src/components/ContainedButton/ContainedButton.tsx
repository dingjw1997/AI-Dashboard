// General Purpose Button for use

import React from 'react';

interface ContainedButtonProps {
  onClick: () => void;
  label: string;
}

const ContainedButton: React.FC<ContainedButtonProps> = ({ onClick, label }) => {
  return (
    <button
      style={{
        backgroundColor: '#007bff',
        color: '#ffffff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ContainedButton;
