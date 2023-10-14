import React from 'react';
import { Card, CardBody, Image, User } from '@nextui-org/react';
import '../../app/globals.css'

interface ArticleCardProps {
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
  categories: Array<any>;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
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
  categories
}) => {
  const redirectToArticle = () => {
    window.location.href = `articulo/${id}`;
  };

  return (
    <Card className = "article_card w-[80%] p-unit-lg shadow-lg bg-[#F0F2F4]" isPressable onPress={redirectToArticle} isHoverable>
      <CardBody>
          <div className='sm:block md:flex items-center'>
          <div className='flex-1'>
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
          </div>
          <div className='px-4' style={{ flex: 2 }}>
            <p className='text-center font-bold text-3xl'>
              {title}
            </p>
            <div className='py-unit-lg text-justify break-words'>
              <p className='line-clamp-[4]'>{summary}</p>
            </div>
            <div className='pt-4 flex justify-end row gap-3 text-sm font-semibold text-zinc-600'>
              {categories.map((item, index) => (
                <p key={index}>{item.category.cat_name}</p>
              ))}
            </div>
            <p className='pt-4 flex justify-end text-sm'>
              Published: {date} 
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ArticleCard;
