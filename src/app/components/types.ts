import { ReactNode } from 'react';

export interface NavItemProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export interface NavigationSectionProps {
  title: string;
  items: {
    href: string;
    label: string;
  }[];
}

export interface SocialLinkProps {
  platform: string;
  url: string;
  icon: ReactNode;
}