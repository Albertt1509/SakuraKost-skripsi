// Card.js
import React from "react";

const Card = ({ title, content, position }) => {
    const getPositionStyles = () => {
        switch (position) {
            case '1':
                return 'col-span-3 row-span-1';
            case '2':
                return 'col-span-2 row-span-2';
            case '3':
                return 'col-span-1 row-span-2';
            case '4':
                return 'col-span-1 row-span-1 self-end justify-self-end';
            case '5':
                return 'col-span-1 row-span-1 self-end justify-self-end';
            default:
                return '';
        }
    };

    return (
        <div className={`bg-white p-4 rounded-md shadow-md h-[200px] ${getPositionStyles()}`}>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p>{content}</p>
        </div>
    );
};

export default Card;
