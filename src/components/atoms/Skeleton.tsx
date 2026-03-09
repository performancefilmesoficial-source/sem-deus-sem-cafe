import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = '20px',
    borderRadius = '8px',
    className = '',
    style,
}) => {
    return (
        <div
            className={`skeleton-base ${className}`}
            style={{ width, height, borderRadius, ...style }}
        ></div>
    );
};
