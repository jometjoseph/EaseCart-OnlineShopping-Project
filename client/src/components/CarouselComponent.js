import Carousel from "react-bootstrap/Carousel";
import slider1 from "../images/slider1";

function CarouselComponent() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <div className="" style={{ height: "300px" }}>
          <img
            className="d-block w-100"
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(56).webp"
            alt="Latest trends"
          />
        </div>

        <Carousel.Caption>
          <h2>Latest Trend</h2>
          <p>Get the latest trends at a lower price</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="" style={{ height: "300px" }}>
          <img
            className="d-block w-100"
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(38).webp"
            alt="Discounts"
          />
        </div>

        <Carousel.Caption>
          <h2>Upto 50% off</h2>
          <p>Get upto 50% off on all fashion products</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="" style={{ height: "300px" }}>
          <img
            className="d-block w-100"
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(36).webp"
            alt="Buy1get1"
          />
        </div>

        <Carousel.Caption>
          <h2>Buy 1 Get 1</h2>
          <p>Exclusive buy 1 get 1 offer for women's clothing</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
