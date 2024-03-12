import 'font-awesome/css/font-awesome.css'
// Owl Carousel....
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import './assets/css/style.css'
import searchIcon from './assets/images/icons/searchIcon.svg'
import userIcon from './assets/images/icons/user.png'
import cartIcon from './assets/images/icons/cart.png'
import loveIcon from './assets/images/icons/love.png'
import dmIcon from './assets/images/icons/dm.png'
import homeIcon from './assets/images/icons/home.png'
import categoryIcon from './assets/images/icons/category.png'
import campaignIcon from './assets/images/icons/campaign.png'
import notificationIcon from './assets/images/icons/notification.png'
import sellConIconBlack from './assets/images/other/SellkonBlack.png'
import sellConWhite from './assets/images/other/SellKonWhite.png'
import appStore from './assets/images/other/appstore.png'
import playStore from './assets/images/other/playstore.png'
import TS from './assets/images/other/TS.jpg' //1176 443
import pro1 from './assets/images/other/pro1.jpg'
import pro2 from './assets/images/other/pro2.jpg'
import OwlCarousel from "react-owl-carousel";
function App() {
  let option = {
    responsive: {
      0: {
        items: 3,
      },

      500: {
        items: 4,
      },
    },
  };
  return (
    <>
      <div className='full_content'>
        <div className='header'>
          <div className='w-1176'>
            <div className='header_top'>
              <div className='header_top_img'>
                <img src={sellConIconBlack} alt='cell kon icon' />
              </div>
              <div className='header_top_search'>
                <div className='input'>
                  <input
                    type='text'
                    placeholder='Search In Cellkon'
                    name="search"
                  />
                </div>
                <div className='search'>
                  <i class="fas fa-search"></i>
                  <label className='ml-8'>Search</label>
                </div>
              </div>
              <div className='header_top_icon'>
                <img className='top_icon' src={cartIcon} />
                <img className='top_icon' src={loveIcon} />
                <img className='top_icon' src={notificationIcon} />
                <img className='top_icon' src={userIcon} />
              </div>
            </div>
            <div className='header_bottom'>
              <div className='menu_icon'>
                <img className='top_icon' src={categoryIcon} />
                <label className='ml-8 cp'>Categories</label>
              </div>
              <div className='menu_icon'>
                <img className='top_icon' src={homeIcon} />
                <label className='ml-8 cp'>Home</label>
              </div>
              <div className='menu_icon'>
                <img className='top_icon' src={campaignIcon} />
                <label className='ml-8 cp'>Campaigns</label>
              </div>
              <div className='menu_icon'>
                <img className='top_icon' src={campaignIcon} />
                <label className='ml-8 cp'>Campaigns</label>
              </div>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='w-1176'>
            <div className='hero_main'>
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                items={1}
                autoplay={true}
                nav
                autoplayHoverPause={true}
              >
                {
                  [1, 2, 3, 4, 2, 3, 4, 3, 3, 4, 3].map((item) => {
                    return (
                      <>

                        <div class="item hero_carousel">
                          <img src={TS} className="img-fluid" alt="" />
                        </div>

                      </>

                    )
                  })
                }

              </OwlCarousel>
            </div>
            <div className='home_products'>
              <h2 className='title'>Sellkon Mall</h2>
              <div className='products'>
                <OwlCarousel
                  className="owl-theme "
                  loop
                  margin={7}
                  // itemElement={{ width: "192px" }}
                  items={6}
                  autoWidth={false}
                  autoplay={false}
                  nav={true}
                  navText={["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"]}
                  dots={false}
                // {...option}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                      <div>
                        <div className='product_img'>
                          <img
                            src={pro2}
                            alt="product"
                          />
                        </div>
                        <div className='product_name'>
                          hello bike dff fer tes fgr dfdsf df ... ... ..
                        </div>
                      </div>
                      <div>
                        <div className='del_price'>
                          &#2547;9,9990
                        </div>
                        <div className='product_price'>
                          &#2547;8,990
                        </div>
                      </div>
                    </div>
                  ))}

                </OwlCarousel>
              </div>

            </div>
            <div className='home_products'>
              <h2 className='title'>Trending Products</h2>
              <div className='products'>
                <OwlCarousel
                  className="owl-theme "
                  loop
                  margin={7}
                  // itemElement={{ width: "192px" }}
                  items={6}
                  autoWidth={false}
                  autoplay={false}
                  nav={true}
                  navText={["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"]}
                  dots={false}
                // {...option}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                      <div>
                        <div className='product_img'>
                          <img
                            src={pro2}
                            alt="product"
                          />
                        </div>
                        <div className='product_name'>
                          hello bike dff fer tes fgr dfdsf df ... ... ..
                        </div>
                      </div>
                      <div>
                        <div className='del_price'>
                          &#2547;9,9990
                        </div>
                        <div className='product_price'>
                          &#2547;8,990
                        </div>
                      </div>
                    </div>
                  ))}

                </OwlCarousel>
              </div>

            </div>
            <div className='home_products'>
              <h2 className='title'>Popular products</h2>
              <div className='products'>
                <OwlCarousel
                  className="owl-theme "
                  loop
                  margin={7}
                  // itemElement={{ width: "192px" }}
                  items={6}
                  autoWidth={false}
                  autoplay={false}
                  nav={true}
                  navText={["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"]}
                  dots={false}
                // {...option}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                      <div>
                        <div className='product_img'>
                          <img
                            src={pro2}
                            alt="product"
                          />
                        </div>
                        <div className='product_name'>
                          hello bike dff fer tes fgr dfdsf df ... ... ..
                        </div>
                      </div>
                      <div>
                        <div className='del_price'>
                          &#2547;9,9990
                        </div>
                        <div className='product_price'>
                          &#2547;8,990
                        </div>
                      </div>
                    </div>
                  ))}

                </OwlCarousel>
              </div>

            </div>
            <div className='home_products'>
              <h2 className='title'>Our Shops</h2>
              <div className='products shops'>
                <OwlCarousel
                  className="owl-theme "
                  loop
                  margin={10}
                  // itemElement={{ width: "192px" }}
                  items={8}
                  autoWidth={false}
                  autoplay={false}
                  nav={true}
                  navText={["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"]}
                  dots={false}
                // {...option}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                      <div>
                        <div className='product_img'>
                          <img
                            src={pro2}
                            alt="product"
                          />
                        </div>
                        <div className='product_name'>
                          Bike Bazar BD
                        </div>
                      </div>
                    </div>
                  ))}

                </OwlCarousel>
              </div>

            </div>
            <div className='home_products'>
              <h2 className='title'>Categories</h2>
              <div className='products shops'>
                <OwlCarousel
                  className="owl-theme "
                  loop
                  margin={10}
                  // itemElement={{ width: "192px" }}
                  items={8}
                  autoWidth={false}
                  autoplay={false}
                  nav={true}
                  navText={["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"]}
                  dots={false}
                // {...option}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                      <div>
                        <div className='product_img'>
                          <img
                            src={pro2}
                            alt="product"
                          />
                        </div>
                        <div className='product_name'>
                          Bike Bazar BD
                        </div>
                      </div>
                    </div>
                  ))}

                </OwlCarousel>
              </div>

            </div>
            <div className='home_all_products'>
              <div className='all_title'>
                <h2 className='title'>All Products</h2>
                <a className='view_all' href=''>View All</a>
              </div>
              <div className='products'>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                  <div className="product_cart">
                    <div>
                      <div className='product_img'>
                        <img
                          src={pro2}
                          alt="product"
                        />
                      </div>
                      <div className='product_name'>
                        hello bike dff fer tes fgr dfdsf df ... ... ..
                      </div>
                    </div>
                    <div>
                      <div className='del_price'>
                        &#2547;9,9990
                      </div>
                      <div className='product_price'>
                        &#2547;8,990
                      </div>
                    </div>
                  </div>
                ))}

              </div>

            </div>
            <div className='home_shops'></div>
            <div className='home_all_products'></div>
          </div>
        </div>
        <div className='footer'>
          <div className='w-1176'>
            <div className='footer_in'>
              <div className='footer_left'>
                <div className='footer_img'>
                  <img src={sellConWhite} alt='cellkon' />
                </div>
                <div className='text'>
                  Sellkon: Your one-stop e-commerce destination
                  for all your needs. Browse a wide range of
                  products, from electronics to fashion, and enjoy
                  seamless shopping with secure transactions and fast delivery.
                </div>
              </div>
              <div className='footer_middle'>
                <h2 className='footer_contact_us'>Contact Us</h2>
                <div className='footer_address'>
                  House #101, Northern Road
                  House #101, Northern Road
                </div>
                <div className='footer_email'>
                  Email: support@sellkon.com
                </div>
                <div className='footer_contact'>
                  Contact no: +8801784528799
                </div>
              </div>
              <div className='footer_right'>
                <h2 className='foter_download'>Download</h2>
                <div className='footer_store'>
                  <img src={appStore} className='app_store' />
                  <img src={playStore} className='play_store' />
                </div>
                <h2 className='join_us'>Join Us</h2>
                <div className='footer_social'>
                  <span className='facebook social'><i className='fa fa-facebook'></i></span>
                  <span className='linkedin social'><i className='fa fa-linkedin'></i></span>
                  <span className='youtube social'><i className='fa fa-youtube'></i></span>
                  <span className='instagram social'><i className='fa fa-instagram'></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
