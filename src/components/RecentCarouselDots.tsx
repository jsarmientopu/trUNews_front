type Props = {
    itemsLength: number;
    selectedIndex: number;
  };
  
  const RecentCarouselDots = ({ itemsLength, selectedIndex }: Props) => {
    const arr = new Array(itemsLength).fill(0);
  
    return (
      <div id="dots" className="flex gap-3 my-2 justify-center -translate-y-5">
        {arr.map((_, index) => {
          const selected = index === selectedIndex;
          return (
            <div
              className={`h-3 w-3 rounded-full transition-all duration-300 bg-indigo-400 ${
                !selected ? 'opacity-50' : ''
              }`}
              key={index}
            ></div>
          );
        })}
      </div>
    );
  };
  
  export default RecentCarouselDots;
  