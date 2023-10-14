import React from 'react';
import { Card, CardBody, Image, User } from '@nextui-org/react';
import '../../app/globals.css'

interface FeedArticleCardProps {
  imageArticle: string;
  profileImage: string;
  autor: string;
  username: string;
  title: string;
  summary: string;
  id: number;
  idWriter: number;
  views: number;
  date: string;
  saved: boolean;
  savedUsername: string;
  categories: Array<any>;
}

const FeedArticleCard: React.FC<FeedArticleCardProps> = ({
  imageArticle,
  profileImage,
  autor,
  username,
  title,
  summary,
  id,
  idWriter, 
  views,
  date, 
  saved, 
  savedUsername,
  categories
}) => {
  const redirectToArticle = () => {
    window.location.href = `articulo/${id}`;
  };

  return (
    <Card className = "article_card w-[80%] p-unit-lg shadow-lg bg-[#F0F2F4]" isPressable onPress={redirectToArticle} isHoverable>
      <CardBody>
          <div className='sm:block md:flex lg:flex items-center'>
          <div className='flex-1'>
            <p className='sm:block md:hidden lg:hidden text-center font-bold text-xl pb-2'>
              {title}
            </p>
            <div className='flex justify-center'>
              <Image src={imageArticle} alt="Card Image" width={280} isZoomed style={{height: 180}}/>
            </div> 
            <div className='flex items-center justify-center pt-4'>
              <a className="pe-6 tap-highlight-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:opacity-80 active:opacity-disabled transition-opacity" 
                href={`perfil/?search=${idWriter}`}>
                <User   
                  name={autor}
                  description={username}
                  avatarProps={{
                    src: profileImage
                  }}
                />
              </a>
              <p className='ps-3 text-sm'>{views} Views</p>
            </div>
            {saved &&
              <div className='hidden md:flex ld:flex justify-center py-4 text-sm'>
                <p className='text-center'>Guardado por: {savedUsername}</p>
              </div>
            }
          </div>
          <div className='px-4' style={{ flex: 2 }}>
            <div className='hidden md:flex lg:flex'>
              <p className='text-center font-bold text-3xl'>
                {title}
              </p>
            </div>
            <div className='hidden md:flex lg:flex py-unit-lg text-justify break-words'>
              <p className='line-clamp-[4]'>{summary}</p>
            </div>
            <div className='pt-4 flex flex-wrap justify-center md:justify-end lg:justify-end row gap-3 lg:text-sm text-xs'>
              {categories.map((item, index) => (
                <p key={index} className='bg-[#963ED9] text-white p-2 rounded-md'>
                  {item.category.cat_name}
                </p>
              ))}
            </div>
            {saved &&
              <div className='flex md:hidden ld:hidden justify-center py-4 text-sm'>
                <p className='text-center'>Guardado por: {savedUsername}</p>
              </div>
            }
            <p className='pt-4 flex justify-end text-sm'>
              Published: {date} 
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FeedArticleCard;
