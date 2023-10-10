import { MdArrowBackIosNew } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import { BsFire } from 'react-icons/bs'
type Props = {
    canScrollPrev: boolean;
    canScrollNext: boolean;
    onPrev(): void;
    onNext(): void;
};

const CarouselControls = (props: Props) => {
    return (
        <div className='flex mb-5 justify-between'>
            <div className="flex items-center">
                <div className="mr-3">
                    <BsFire size="2em" />

                </div>
                <p className="font-bold text-4xl">Trending news</p>

            </div>

            <div className="flex justify-end items-center">
                <button onClick={() => {
                    if (props.canScrollPrev) {
                        props.onPrev();
                    }
                }}
                    disabled={!props.canScrollPrev}
                    className="mr-6 cursor-pointer select-none"
                    title="nav-back"  >
                    <MdArrowBackIosNew size="2em" />
                </button>
                <button onClick={() => {
                    if (props.canScrollNext) {
                        props.onNext();
                    }
                }}
                    disabled={!props.canScrollNext}
                    className="mr-6 cursor-pointer select-none"
                    title="nav-forward" >
                    <MdArrowForwardIos size="2em" />
                </button>
            </div>
        </div>
    );
};

export default CarouselControls;
