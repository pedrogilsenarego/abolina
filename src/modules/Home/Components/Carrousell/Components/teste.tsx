import { useContext, useEffect } from "react";
import { CarouselContext } from "pure-react-carousel";

interface Props {
  setIndexMini: (indexMini: number) => void
}

const Teste = ({ setIndexMini }: Props) => {
  const carouselContext = useContext(CarouselContext);

  useEffect(() => {
    function onChange() {

      setIndexMini(carouselContext.state.currentSlide);

    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselContext]);
  return <></>;
};
export default Teste;
