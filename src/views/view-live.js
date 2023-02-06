import React from 'react';
import '../assets/sass/live.scss';
import Video from 'react-responsive-video';
import $ from 'jquery';
import InfiniteScroll from 'react-infinite-scroll-component';
import ActionSheet from '../components/action-sheet';
import Modal from 'react-bootstrap/Modal';
import commonObj from '../assets/js/common';

export default class ViewLive extends React.Component {

    constructor(props) {
        super(props);

        this.choosePlanActionSheet = React.createRef();
        this.payToWatchActionSheet = React.createRef();

        this.state = {
            selectedPlan: '',
            subscribeModalShow: false,
            liveData: [
                {
                    streamVideo: process.env.PUBLIC_URL + '/assets/videos/test-video.mp4'
                },
                {
                    streamVideo: process.env.PUBLIC_URL + '/assets/videos/live-2.mp4'
                },
                {
                    streamVideo: process.env.PUBLIC_URL + '/assets/videos/pexels-polina-kovaleva-7089307.mp4'
                },
                {
                    streamVideo: process.env.PUBLIC_URL + '/assets/videos/pexels-polina-kovaleva-7089307.mp4'
                }
            ]
        }

    }

    payToWatch = () => {

        this.setState({ subscribeModalShow: false });

        this.payToWatchActionSheet.showActionSheet();

    }

    handleSubscriptionPlanChange = (event) => {

        this.setState({
            
            selectedPlan: event.target.value

        });

    }

    handleSubscribeModalShow = () => {

        this.setState({ subscribeModalShow: true })

    }

    handleSubscribeModalClose = () => {

        this.setState({ subscribeModalShow: false });

    }

    subscribe = () => {

        this.setState({ subscribeModalShow: false });

        this.choosePlanActionSheet.showActionSheet();

    }

    refresh = () => {

        alert(1)

        console.log('refreshing data')

    }

    fetchData = () => {

        // console.log('fetching next data')

        alert(1)

        this.setState((prevState) => {

            return {
                liveData: [ ...prevState.liveData, process.env.PUBLIC_URL + '/assets/videos/test-video.mp4' ]
            }
            
        })

    } 

    setWidthOfShowMoreBtn() {

        var truncatedDiv = $('.truncatable');

        var widthOfTruncatedDiv = truncatedDiv.innerWidth();

        $('.expand-content-btn-wrapper').css('width', widthOfTruncatedDiv + 30 + 'px');

       console.log(widthOfTruncatedDiv);

    }

    componentDidMount() {

        commonObj.isOverflown();
        commonObj.showLessDescription();
        commonObj.showMoreDescription();

    }

    render() {

        return (

            <>

                <InfiniteScroll
                    dataLength={this.state.liveData.length} //This is important field to render the next data
                    next={this.fetchData}
                    hasMore={true}
                    loader={<h4 style={{ minHeight: '500px', width: '100%', display: 'grid', alignItems: 'center', backgroundColor: 'white', color: 'white' }}>Loading...</h4>}
                    onScroll={(e) => {
                        
                        console.log(e)

                    }}
                    hasChildren={ true }
                    // inverse={ true }
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={this.refresh}
                    // pullDownToRefresh={true}
                    // pullDownToRefreshContent={
                    //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    // }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                    
                    >
                        
                        {

                            this.state.liveData.map((data, index) =>  {

                                return(

                                    <div className='view-live-container' key={ index }>

                                        <div className='grid-3'>
            
                                            <div className='hidden-lg-up'></div>
            
                                            <div className='video-player-container d-grid'>
        
                                                <div className='position-relative overlay started-live-overlay flex-column justify-content-between'>
        
                                                    <div className='py-4'>
        
                                                        <div className='d-flex ps-3 pe-3 justify-content-between align-items-start'>
        
                                                            <div className='d-flex live-metrics viewer justify-content-between'>
        
                                                                <div className='d-flex align-items-center'>
                                                                    <img src={ process.env.PUBLIC_URL + "/assets/img/pexels-godisable.png" } alt="human" style={{ width: '52px', height: '52px', borderRadius: '10px' }}/>
                                                                    <div className='ms-3'>
        
                                                                        <div className="d-flex align-items-center">
                                                                            <h4 className='fw-400 f-12 text-truncated'>Open Mic Live</h4>
                                                                            <button className='btn subscribe-btn' onClick={ this.handleSubscribeModalShow }>Subscribe</button>
                                                                        </div>
                                                                        <div className='d-flex '>
        
                                                                            <p className='fw-600 f-12 text-truncated'>1.5k Likes</p>
        
                                                                            <span className='ms-3 d-flex align-items-center'>
        
                                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M6 6C7.38071 6 8.5 4.88071 8.5 3.5C8.5 2.11929 7.38071 1 6 1C4.61929 1 3.5 2.11929 3.5 3.5C3.5 4.88071 4.61929 6 6 6Z" fill="white" fillOpacity="0.8"/>
                                                                                    <path d="M5.99813 7.25C3.49312 7.25 1.45312 8.93 1.45312 11C1.45312 11.14 1.56312 11.25 1.70312 11.25H10.2931C10.4331 11.25 10.5431 11.14 10.5431 11C10.5431 8.93 8.50313 7.25 5.99813 7.25Z" fill="white" fillOpacity="0.8"/>
                                                                                </svg>
        
                                                                                <span className='ms-1 f-12'>40</span>
        
                                                                            </span>
        
                                                                        </div>
                                                                    </div>
                                                                </div>
        
                                                            </div>
        
                                                            <button className='btn' onClick={ commonObj.navigateBack }>
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white"/>
                                                                </svg>
        
                                                            </button>
        
                                                        </div>
        
                                                    </div>
        
                                                    <div>
        
                                                        <div className='live-interactions'>
        
                                                            <div className='position-relative has-show-more'>
        
                                                                <div className='truncatable description scrollbar-hidden clamped'>
        
                                                                    <h4 className='text-white f-12 fw-700'>Unity Music Concert Day 2</h4>
                                                                    <p className='text-white f-10 fw-100'>
                                                                    This is the second day live stream of the Unity Concert. Performing live is the super talented Mara.
                                                                    </p>
        
                                                                </div>
        
                                                                <button className='see-more-btn'>See More</button>
                                                                <button className='show-less-btn'>Show less</button>
                                                            
                                                            </div>
        
                                                            <div className='my-3 comments scrollbar-hidden position-relative'>
                                                            
                                                                <div className='d-flex align-items-center'>
                                                                    <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris.png" } alt="human"/>
                                                                    <div className='mt-2'>
                                                                        <h4 className='f-12 fw-600 white-muted-low'>Grace Catering</h4>
                                                                        <p className='f-10 fw-500 white-muted-high'>Wow, great recipe</p>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-1.png" } alt="human"/>
                                                                    <div>
                                                                        <h4 className='f-12 fw-600 white-muted-low'>Raja Mo</h4>
                                                                        <p className='f-10 fw-500 white-muted-high'>My girlfriend will love this</p>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-2.png" } alt="human"/>
                                                                    <div>
                                                                        <h4 className='f-12 fw-600 white-muted-low'>Ohemaa's Kitchen <span>Caster</span></h4>
                                                                        <p className='f-10 fw-500 white-muted-high'>Thanks for Joining Guyss!... Please Like!!</p>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-3.png" } alt="human"/>
                                                                    <div>
                                                                        <h4 className='f-12 fw-600 white-muted-low'>Kris Mosh</h4>
                                                                        <p className='f-10 fw-500 white-muted-high'>I'm learning a lot today.</p>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-3.png" } alt="human"/>
                                                                    <div>
                                                                        <h4 className='f-12 fw-600 white-muted-low'>Kris Mosh</h4>
                                                                        <p className='f-10 fw-500 white-muted-high'>I'm learning a lot today.</p>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-3.png" } alt="human"/>
                                                                    <div>
                                                                        <h4 className='f-12 fw-600 white-muted-low'>Kris Mosh</h4>
                                                                        <p className='f-10 fw-500 white-muted-high'>I'm learning a lot today.</p>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
        
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <input type="text" placeholder='Add comment' className='faded-white-bg-1 pl-15'/>
                                                                <div className='share-btn-wrapper'>
                                                                    <button className='btn'>
        
                                                                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M26.5217 33.2941C26.1666 33.2146 25.8114 33.1527 25.4649 33.0524C22.3775 32.1583 20.6701 29.4328 21.3363 26.4305C20.6005 26.0449 19.8555 25.6535 19.1097 25.2634C16.2811 23.7842 13.4535 22.3026 10.6268 20.8186C10.359 20.6773 10.2006 20.6883 9.95774 20.8727C8.14808 22.2344 6.10262 22.5835 3.9208 21.8293C1.73898 21.0752 0.42648 19.5845 0.0713658 17.4601C-0.0519408 16.733 -0.0151804 15.9907 0.179477 15.2769C0.374135 14.563 0.722747 13.8922 1.20474 13.3039C1.68674 12.7157 2.29235 12.2219 2.98584 11.8517C3.67933 11.4816 4.44666 11.2425 5.24253 11.1487C7.02663 10.9312 8.636 11.3715 10.0096 12.4597C10.1807 12.5952 10.3008 12.6486 10.5266 12.5301C14.0678 10.6688 17.614 8.81334 21.1651 6.96377C21.2156 6.93772 21.2639 6.90711 21.332 6.86804C21.1381 5.99405 21.119 5.11746 21.3455 4.24022C21.9698 1.85011 24.4336 -0.133622 27.6261 0.00704977C30.3072 0.124927 32.7347 2.09758 33.1907 4.60101C33.7511 7.67559 31.5451 10.5444 28.1943 11.0367C26.2021 11.3291 24.4606 10.7906 22.9961 9.51735C22.8541 9.39035 22.7482 9.3363 22.5472 9.44245C19.016 11.2955 15.4817 13.1448 11.9442 14.9905C11.9244 15.0016 11.9066 15.0166 11.8583 15.0504C12.1943 16.0943 12.1921 17.2053 11.8519 18.2481C11.9471 18.3028 12.043 18.3621 12.1431 18.4142C15.5858 20.2151 19.0278 22.0169 22.4691 23.8196C22.7056 23.9446 22.8363 23.9212 23.0373 23.7545C24.8384 22.2462 26.9286 21.7772 29.2326 22.5171C31.521 23.2556 32.8548 24.8075 33.2326 26.9997C33.7347 29.9303 31.3697 32.8095 28.173 33.2263C28.094 33.2424 28.0166 33.2641 27.9414 33.2915L26.5217 33.2941Z" fill="white"/>
                                                                        </svg>
        
                                                                    </button>
                                                                </div>
                                                            </div>
        
                                                        </div>
        
                                                        {/* <div className='d-flex live-controls-wrapper align-items-center flex-column justify-content-center'>
                                                            <p className='text-yellow mb-1'>0:00</p>
                                                            <div className='go-live-btn-wrapper d-flex align-items-center justify-content-center mb-1'>
                                                            
                                                                <button className='btn go-live-btn' onClick={ () => this.setState({ showActionSheet: true }) }></button>
                                                            
                                                            </div>
                                                            <p className='text-white f-12'>End Live</p>
                                                        </div> */}
        
                                                    </div>
        
                                                    <button className='follow-caster-btn'>
                                                        <img src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-3.png" } alt="human" style={{ 'height': '50px', 'width': '50px', 'borderRadius': '50%' }} />
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12" r="10" fill="white"/>
                                                            <g clipPath="url(#clip0_4594_25519)">
                                                            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#FF0000"/>
                                                            </g>
                                                            <defs>
                                                            <clipPath id="clip0_4594_25519">
                                                            <rect width="24" height="24" fill="white"/>
                                                            </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </button>
        
                                                </div>
        
                                                <div className="video-player d-flex justify-content-center">
                                                    <Video 
        
                                                        controls={ false }
                                                        id="video-player"
                                                        mp4={ data.streamVideo } 
                                                        objectFit={'contain'}
                                
                                                    />
                                                </div>
        
                                            </div>
        
                                            <div className='hidden-lg-up'></div>
            
                                        </div>
            
                                    </div>

                                )

                            })

                        }

                </InfiniteScroll>

                <ActionSheet 
                    title=""
                    ref={el => this.payToWatchActionSheet = el}
                    className="pay-to-watch-action-sheet"
                >
                    
                    <div className=''>
                        <h1 className='text-center'>$ 10</h1>
                        <button className='btn btn-violet mb-4 mt-2 text-gold' id="payToWatchBtn">Pay</button>
                        <p className='text-center mt-2'>You can rewatch videos you pay for in your profile</p>

                    </div>

                </ActionSheet>

                <ActionSheet 
                    title="Select a plan"
                    ref={el => this.choosePlanActionSheet = el}
                    className="select-subscription-plan-action-sheet"
                >
                    
                    <div className='mt-2'>
                        
                        <div className='plan-list'>

                            <div className='d-flex justify-content-between align-items-center mb-4'>

                               <table className='w-100'>
                                    <tbody>

                                        <tr>
                                            <td>1 Month Plan</td>
                                            <td>-</td>
                                            <td>$ 1</td>
                                            <td>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="1" checked={ this.state.selectedPlan === '1' } onChange={ this.handleSubscriptionPlanChange } />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3 Month Plan</td>
                                            <td>-</td>
                                            <td>$ 3</td>
                                            <td>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="2" checked={ this.state.selectedPlan == '2' } onChange={ this.handleSubscriptionPlanChange } />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>6 Month Plan</td>
                                            <td>-</td>
                                            <td>$ 6</td>
                                            <td>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="3" checked={ this.state.selectedPlan == '3' } onChange={ this.handleSubscriptionPlanChange } />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1 <span className="ms-1">Year Plan</span></td>
                                            <td>-</td>
                                            <td>$ 12</td>
                                            <td>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="4" checked={ this.state.selectedPlan == '4' } onChange={ this.handleSubscriptionPlanChange } />
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                               </table>

                            </div>

                        </div>

                        
                        <button className='btn btn-violet mb-4 mt-2 text-gold' id="chooseSubscriptionPlanBtn">Confirm</button>

                    </div>

                </ActionSheet>

                <Modal
                    show={this.state.subscribeModalShow} 
                    onHide={this.handleSubscribeModalClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className='subscribe-modal'
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex flex-column align-items-center'>
                        <h4 className='fw-600 f-18'>To continue watching...</h4>
                        <button className='btn btn-violet mb-2 mt-5 text-gold' id="chooseSubscriptionPlanBtn" onClick={ this.subscribe }>Subscribe</button>
                        <button className='btn btn-violet mb-4 mt-4 text-gold fw-600' id="chooseSubscriptionPlanBtn" onClick={ this.payToWatch } >Pay to Watch</button>

                    </Modal.Body>
                </Modal>

            </>

        );

    }

}