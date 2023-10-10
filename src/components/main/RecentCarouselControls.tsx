import { MdArrowBackIosNew } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import { ImClock } from 'react-icons/im'



type Props = {
    canScrollPrev: boolean;
    canScrollNext: boolean;
    onPrev(): void;
    onNext(): void;
};

const RecentCarouselControls = (props: Props) => {
    return (
        <>
            <div className="flex mb-5 justify-between">
                <div className="flex items-center">
                    <div className="mr-3">
                        <ImClock size="1.3em" />

                    </div>
                    <p className="font-bold text-2xl">Últimas noticias</p>

                </div>


                <div className="flex justify-end items-center">
                    <button onClick={() => {
                        if (props.canScrollPrev) {
                            props.onPrev();
                        }
                    }}
                        disabled={!props.canScrollPrev}
                        className="mr-6 cursor-pointer select-none"
                        title="nav-back">
                        <MdArrowBackIosNew size="1.3em" />
                    </button>
                    <button onClick={() => {
                        if (props.canScrollNext) {
                            props.onNext();
                        }
                    }}
                        disabled={!props.canScrollNext}
                        className="mr-6 cursor-pointer select-none"
                        title="nav-forward">
                        <MdArrowForwardIos size="1.3em" />
                    </button>
                </div>

            </div>
        </>
    );
};

export default RecentCarouselControls;
