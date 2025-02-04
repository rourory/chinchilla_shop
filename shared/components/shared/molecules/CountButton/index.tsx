'use client'
import React from 'react';
import { CountIconButton, IconButtonProps } from '../../atoms/CartItem/CountIconButton';
import { cn } from '@/shared/lib/utils';

export interface CountButtonProps {
  quantity?: number;
  size?: IconButtonProps["size"];
  className?: string;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClickCountButton,
  quantity,
  size = 'sm',
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClickCountButton?.('minus')}
        disabled={quantity === 1}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{quantity}</b>

      <CountIconButton onClick={() => onClickCountButton?.('plus')} size={size} type="plus" />
    </div>
  );
};
