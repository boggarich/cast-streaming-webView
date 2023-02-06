import React from "react"

export default class Comments extends React.Component {

    constructor(props) {

        super(props);

    }

    render() {

        return (

            <div className='my-3 comments scrollbar-hidden'>

                {

                    this.props.comments.map( (comment) => {

                        return(

                                <div className='d-flex align-items-center'>
                                    <img className="profile-img" src={ comment.userPic } alt="human"/>
                                    <div className='mt-2'>
                                        <h4 className='f-12 fw-600 white-muted-low'>{ comment.username }</h4>
                                        <p className='f-10 fw-500 white-muted-high'>{ comment.comment }</p>
                                    </div>
                                </div>

                        )

                    })

                }

            </div>
            

        );

    }

}