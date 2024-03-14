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
import slide1 from './assets/images/other/slide1.jpg' //1176 443
import slide2 from './assets/images/other/slide2.jpg' //1176 443
import slide3 from './assets/images/other/slide3.jpg' //1176 443
import slide4 from './assets/images/other/slide4.jpg' //1176 443
import slide5 from './assets/images/other/slide5.jpg' //1176 443
import pro1 from './assets/images/other/pro1.jpg'
import pro2 from './assets/images/other/pro2.jpg'
import pro3 from './assets/images/other/pro3.jpg'
import OwlCarousel from "react-owl-carousel";
import Select from "react-select"
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
                <div className='top_icon'>
                  <img src={cartIcon} alt='icon' />
                  {/* <span>10</span> */}
                </div>
                <div className='top_icon'>
                  <img src={loveIcon} alt='icon' />
                  {/* <span>1</span> */}
                </div>
                <div className='top_icon'>
                  <img src={notificationIcon} alt='icon' />
                  <span>1</span>
                </div>
                <div className='top_icon'>
                  <img src={userIcon} alt='icon' />
                </div>
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
            {/* home page  */}
            {/* <div className='hero_main'>
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
                  [slide3, slide4, slide5, slide3, slide4].map((item) => {
                    return (
                      <>

                        <div class="item hero_carousel">
                          <img src={item} className="img-fluid" alt="" />
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
                {[1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                  <div className="product_cart">
                    <div>
                      <div className='product_img'>
                        <img
                          src={pro3}
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
              <div className='arrow'>
                <div className='left_arrow'>
                  <i class='fas fa-chevron-left'></i>
                </div>
                <div className='right_arrow'>
                  <i class='fas fa-chevron-right'></i>
                </div>
              </div>
            </div>
            <div className='home_products'>
              <h2 className='title'>Trending Products</h2>
              <div className='products'>
                {[1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                  <div className="product_cart">
                    <div>
                      <div className='product_img'>
                        <img
                          src={pro3}
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
              <div className='arrow'>
                <div className='left_arrow'>
                  <i class='fas fa-chevron-left'></i>
                </div>
                <div className='right_arrow'>
                  <i class='fas fa-chevron-right'></i>
                </div>
              </div>
            </div>
            <div className='home_products'>
              <h2 className='title'>Popular Products</h2>
              <div className='products'>
                {[1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                  <div className="product_cart">
                    <div>
                      <div className='product_img'>
                        <img
                          src={pro3}
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
              <div className='arrow'>
                <div className='left_arrow'>
                  <i class='fas fa-chevron-left'></i>
                </div>
                <div className='right_arrow'>
                  <i class='fas fa-chevron-right'></i>
                </div>
              </div>
            </div>
            <div className='home_products'>
              <h2 className='title'>Our Shops</h2>
              <div className='products shops'>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                  <div className="product_cart">
                    <div>
                      <div className='product_img'>
                        <img
                          src={pro3}
                          alt="product"
                        />
                      </div>
                      <div className='product_name'>
                        Bike Bazar BD ddd ddd
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='arrow shop_arrow'>
                <div className='left_arrow'>
                  <i class='fas fa-chevron-left'></i>
                </div>
                <div className='right_arrow'>
                  <i class='fas fa-chevron-right'></i>
                </div>
              </div>
            </div>
            <div className='home_products'>
              <h2 className='title'>Categories</h2>
              <div className='products shops'>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                  <div className="product_cart">
                    <div>
                      <div className='product_img'>
                        <img
                          src={pro3}
                          alt="product"
                        />
                      </div>
                      <div className='product_name'>
                        Bike Bazar BD ddd ddd
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='arrow shop_arrow'>
                <div className='left_arrow'>
                  <i class='fas fa-chevron-left'></i>
                </div>
                <div className='right_arrow'>
                  <i class='fas fa-chevron-right'></i>
                </div>
              </div>
            </div>
            <div className='home_all_products'>
              <div className='all_title'>
                <h2 className='title'>All Products</h2>
                <a className='view_all' href=''>View All</a>
              </div>
              <div className='products'>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17].map((item, index) => (
                  <div className="product_cart">
                    <div>
                      <div className='product_img'>
                        <img
                          src={pro3}
                          alt="product"
                        />
                      </div>
                      <div className='product_name'>
                        he llo bi ke dff fe r te s fg rd f d sf df ... ... ..
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

            </div> */}
            {/* details page */}
            {/* <div className='details_page'>
              <div className='main'>
                <div className='left'>
                  <div className='image'>
                    <img src={pro3} alt='product img' />
                  </div>
                  <div className='parent_img'>
                    <div className='images'>
                      {[1, 2, 3, 4].map((item) => (<img src={pro3} alt='product' />))}
                    </div>
                    <div className='arrow'>
                      <div className='left_arrow'><i class='fas fa-chevron-left'></i></div>
                      <div className='right_arrow'><i class='fas fa-chevron-right'></i></div>
                    </div>
                  </div>
                </div>
                <div className='right'>
                  <div className='title_section'>
                    <div className='txt'>Yamaha yZF R15 df er rtt rtt rtt frt rtg rrt</div>
                    <div className='share'>
                      <i class="fa fa-share-alt" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className='brand'>Brand: YAMAHA</div>
                  <div className='sold_by'>
                    <span>Sold By: YAMAHA Official</span>
                    <a>Visit Store</a>
                  </div>
                  <div className='del_price'>&#2547;4,50990</div>
                  <div className='product_price'>&#2547;4,50990</div>
                  <div className='txt_cq'>Color</div>
                  <div className='colors'>
                    {["#f00", "#0f0", "#00f", "#ff0"].map((item) => (<a href style={{ backgroundColor: item }}>Black</a>))}
                  </div>
                  <div className='txt_cq'>Quantity</div>
                  <div className='quantity_button'>
                    <div className='btn plus'><i class="fa fa-plus"></i></div>
                    <div className='btn number'>1</div>
                    <div className='btn minus'><i class="fa fa-minus"></i></div>
                  </div>
                  <div className='btn_buy'>
                    <a href className='btn cart'>Add to Cart</a>
                    <a href className='btn buy'>Buy Now</a>
                  </div>
                  <div className='have_question'>Have questions about this product</div>
                  <div className='call'>
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <span>+8801784528799</span>
                  </div>
                </div>
              </div>
              <div className='short_details'>
                <h2>Short Details</h2>
                <div className='txt'>
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                </div>
                <a className='view_more'>View More</a>
              </div>
              <div className='full_details'>
                <h2>Full Details</h2>
                <div className='txt'>
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum
                </div>
              </div>
              <div className='home_all_products'>
                <div className='all_title'>
                  <h2 className='title'>Related Products</h2>
                  <a className='view_all' href=''>View All</a>
                </div>
                <div className='products'>

                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                      <div>
                        <div className='product_img'>
                          <img
                            src={pro3}
                            alt="product"
                          />
                        </div>
                        <div className='product_name'>
                          he llo bi ke dff fe r te s fg rd f d sf df ... ... ..
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
            </div> */}
            {/* Product page */}
            <div className='product_page'>
              <div className='order_section'>
                <div className='showing'>Showing 250 Product</div>
                <div className='select'>
                  <div className='sort'>Short By</div>
                  <div className='price'>
                    <Select
                      options={[{ label: "hi", value: 1 }, { label: "hqw", value: 2 }]}
                      name="price"
                      value={{ label: "hi" }}
                    />
                  </div>
                </div>
              </div>
              <div className='filter_product'>
                <div className='filter_left'>
                  <div className='filter'>
                    <img src={categoryIcon} />
                    <span>Filter</span>
                  </div>
                  <div className='category'>
                    <div className='txt'>
                      Category
                    </div>
                    <ul>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                    </ul>
                  </div>
                  <div className='category'>
                    <div className='txt'>
                      Shops
                    </div>
                    <ul>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                      <li>
                        <input type='radio' />
                        <span>Smartphone</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='filter_right'>
                  <div className='products'>
                    <div className='home_all_products product_form_page'>
                      <div className='products'>

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item, index) => (
                          <div className="product_cart">
                            <div>
                              <div className='product_img'>
                                <img
                                  src={pro3}
                                  alt="product"
                                />
                              </div>
                              <div className='product_name'>
                                he llo bi ke dff fe r te s fg rd f d sf df ... ... ..
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
                      <div className='pagination'>
                        <div className='item active'>1</div>
                        <div className='item'>2</div>
                        <div className='item'>3</div>
                        <div className='item'>4</div>
                        <div className='item dots'>.......</div>
                        <div className='item'>25</div>
                        <div className='item next'>Next</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
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
