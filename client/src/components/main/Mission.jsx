import Typed from "react-typed";

const Mission = () => {
  return (
    <div className=" w-full lg:pt-[160px] pt-[40px] px-[30px] lg:h-screen flex-col justify-center items-center lg:px-[70px] xl:px-[108px]">
      <div className="w-full justify-center items-start">
        <div className=" lg:text-[50px] text-[24px] leading-[1] xl:text-[60px] font-bold w-full flex  justify-center items-center">
          <h1 className="text-[#395143] text-center  text-md lg:text-4xl xl:text-5xl font-bold font-merryweather lg:pb-[8%] xl:pb-[4%] ">
            Notre Mission
          </h1>
        </div>
        <div className="pt-[30px] w-full  text-md lg:text-xl xl:text-2xl font-light flex justify-start font-lora items-center">
          <Typed
            className="font-light lg:leading-[200%] w-full px-[7%] flex font-merryweather text-center"
            strings={[
              "Guidées par  la transparence et l'exactitude, nous aspirons à encourager la collaboration entre chercheurs et à faciliter la navigation à travers l'océan d'informations scientifiques. Notre vision est de contribuer à un monde où le savoir est accessible à tous, catalysant ainsi l'évolution constante du paysage scientifique mondial.",
            ]}
            typeSpeed={15}
          />
        </div>
      </div>
    </div>
  );
};
export default Mission;
