import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';

export type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className='shadow-md transition-shadow duration-300 hover:shadow-lg'>
      <CardHeader className='flex items-center space-x-4'>
        <div className='text-primary'>{icon}</div>
        <h2 className='text-lg font-semibold'>{title}</h2>
      </CardHeader>
      <CardContent>
        <p className='text-gray-600'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
