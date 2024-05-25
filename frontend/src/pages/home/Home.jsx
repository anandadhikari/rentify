import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import CatCard from "../../components/catCard/CatCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Home() {

  const { data } = useQuery({
    queryKey: ["myEstates"],
    queryFn: () =>
      newRequest.get(`/estates`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="home container">
      <Featured />
      <TrustedBy />

      <section className="slider">
        <h1>Exchange Spaces & Expertise! From Dreamy Dwellings to Dynamic Collaborations </h1>
        <Swiper
          slidesPerView={5}
          spaceBetween={200}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data != null ? data.map((estate) => (
            <SwiperSlide key={estate.userId}>
              <CatCard key={estate.userId} card={estate} />
            </SwiperSlide>
          )) : <></>}
        </Swiper>
      </section>

      <section className="newsletter container">
        <div className="subs">
          <h1>
            Don&apos;t miss our newsletters,
            <br /> subscribe?
          </h1>
          <div className="subsmail">
            <input
              className="subs__mail"
              type="text"
              placeholder="enter email..."
            />
            <button className="btn subs__btn">subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
