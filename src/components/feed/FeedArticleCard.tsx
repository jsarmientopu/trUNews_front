import React from 'react';
import { Card, Button, Image, User } from '@nextui-org/react';

interface FeedArticleCardProps {
  imageArticle: string;
  profileImage: string;
  autor: string;
  username: string;
  title: string;
  summary: string;
}

const FeedArticleCard: React.FC<FeedArticleCardProps> = ({
  imageArticle,
  profileImage,
  autor,
  username,
  title,
  summary
}) => {
  return (
    <Card className = "w-[75%] p-unit-lg shadow-lg">
      <div className='flex items-center'>
        <div className='sm-w-none' style={{ flex: 1 }}>
          <div className='flex justify-center'>
            <Image src={imageArticle} alt="Card Image" width={280} />
          </div> 
          <div className='flex items-center justify-center py-4'>
            <User   
              name={autor}
              description={username}
              avatarProps={{
                src: profileImage
              }}
            />
          </div>
        </div>
        <div className='px-4' style={{ flex: 2 }}>
          <div className='text-center font-bold text-3xl'>
            {title}
          </div>
          <div className='py-unit-lg text-justify break-words'>
            <p className='line-clamp-[4]'>{summary}</p>
          </div>
          <div className='flex justify-end'>
            <Button className='bg-[#963ED9] text-white py-2 px-3 rounded-xl'>Leer Artículo</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeedArticleCard;
