"use client";
import { useState } from 'react';
import { InventoryItem } from '@/types/inventory-types';

export const useInventoryCard = (car: InventoryItem) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    return {
        isExpanded,
        toggleExpand
    };
};