import React from 'react';
import { Card, Button, Image, User } from '@nextui-org/react';

interface FeedArticleCardProps {
  imageArticle: string;
  profileImage: string;
  autor: string;
  username: string;
  title: string;
  summary: string;
  id: number;
  idWriter: number;
}

const FeedArticleCard: React.FC<FeedArticleCardProps> = ({
  imageArticle,
  profileImage,
  autor,
  username,
  title,
  summary,
  id,
  idWriter
}) => {
  return (
    <Card className = "w-[80%] p-unit-lg shadow-lg">
      <div className='flex items-center'>
        <div className='sm-w-none' style={{ flex: 1 }}>
          <div className='flex justify-center'>
            <Image src={imageArticle} alt="Card Image" width={280} />
          </div> 
          <div className='flex items-center justify-center py-4'>
            <a className="tap-highlight-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:opacity-80 active:opacity-disabled transition-opacity" 
              href={`perfil/?search=${idWriter}`}>
              <User   
                name={autor}
                description={username}
                avatarProps={{
                  src: profileImage
                }}
              />
            </a>
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
            <Button className='bg-[#963ED9] text-white py-2 px-3 rounded-xl'>
              <a href={`articulo/${id}`}>Leer Artículo</a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeedArticleCard;
