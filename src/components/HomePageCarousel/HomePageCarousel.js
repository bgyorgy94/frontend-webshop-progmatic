

        import Carousel from 'react-bootstrap/Carousel';

        
        export default function HomePageCarousel() {
            const carouselPictures = [
                "https://firebasestorage.googleapis.com/v0/b/csapat-10.appspot.com/o/images%2Fkitten-5249587_960_720.jpg?alt=media&token=95ce15ed-dfb4-4148-a762-a7b826eebbd4"
                ,
                "https://firebasestorage.googleapis.com/v0/b/csapat-10.appspot.com/o/images%2Fpexels-edwin-rucci-2078747.jpg?alt=media&token=3c93fc22-bc46-434c-a25c-d00656ff0322"
                ,
                "https://firebasestorage.googleapis.com/v0/b/csapat-10.appspot.com/o/images%2Fpexels-karolina-grabowska-7291997.jpg?alt=media&token=8ea1a326-b666-4afa-a5c1-03dba72005b9"
            ]
          return (
            <Carousel >
              <Carousel.Item interval={4200} >
                <img
                  className="d-block w-100"
                  src={carouselPictures[0]}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3> <a className="link-opacity-25-hover" href="#"> Termék 1 </a>  </h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2600}>
                <img
                  className="d-block w-100"
                  src={carouselPictures[1]}
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3> <a className="link-opacity-25-hover" href="#"> Termék 2 </a></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item >
                <img
                  className="d-block w-100"
                  src={carouselPictures[2]}
                  alt="Third slide"
                />
                <Carousel.Caption >
                  <h3><a className="link-opacity-25-hover" href="#"> Termék 3 </a> </h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          );
        }
        
 