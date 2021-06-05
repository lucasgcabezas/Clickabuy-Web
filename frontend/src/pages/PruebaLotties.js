import Lottie from 'react-lottie';
import animationData from '../lotties/clickabuy-animation.json';

const PruebaLotties = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return(
        // return (
          <div className="contenedorAnimation">
              {/* <h1>clickabuy</h1> */}
                <Lottie 
                options={defaultOptions}
                height={657}
                width={1360}
                speed={0.5}
                />
          </div>
        // );
    )
}
export default PruebaLotties