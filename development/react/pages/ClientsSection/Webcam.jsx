import React, {Component} from 'react'
import {
    Button
} from 'antd'
import '../styles/webcam.css'

class Webcam extends Component {
    constructor( props ) {
        super( props )

        this.state = {
            constraints: { audio: false, video: { width: 400, height: 300 } },
            stream: null,
        }

        this.stream = null

        this.handleStartClick = this.handleStartClick.bind(this)
        this.takePicture = this.takePicture.bind(this)
        this.clearPhoto = this.clearPhoto.bind(this)
        this.closeWebcam = this.closeWebcam.bind( this )
    }

    componentDidMount() {
        const { constraints, stream } = this.state
        const getUserMedia = (params) => (
            new Promise((successCallback, errorCallback) => {
              navigator.webkitGetUserMedia.call(navigator, params, successCallback, errorCallback)
            })
        )

        getUserMedia(constraints)
            .then((stream) => {
                this.setState( {
                    stream: stream,
                    constraints
                } )

                this.stream = stream
                const video = document.querySelector('video')
                const vendorURL = window.URL || window.webkitURL

                video.src = vendorURL.createObjectURL(stream)
                video.play()
           
            })
            .catch((err) => {
                console.log(err)
            })

        this.clearPhoto()
    }

    clearPhoto() {
        const canvas = document.querySelector('canvas')
        //const photo = document.getElementById('photo')
        const context = canvas.getContext('2d')
        const { width, height } = this.state.constraints.video
        context.fillStyle = '#FFF'
        context.fillRect(0, 0, width, height)

        const data = canvas.toDataURL('image/png')
        //photo.setAttribute('src', data)
    }

    handleStartClick(event) {
        event.preventDefault()
        this.takePicture()
    }

    takePicture() {
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('2d');
        const video = document.querySelector('video');

        const { width, height } = this.state.constraints.video;

        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        const data = canvas.toDataURL('image/png');
        this.stream.getTracks()[0].stop()
        this.state.stream.getTracks()[0].stop()
        this.props.take( data )
        
    }

    closeWebcam() {
        const { close } = this.props

        this.stream.getTracks()[0].stop()
        this.state.stream.getTracks()[0].stop()
        close()
    }

    render() {
        

        return (
            <div className="capture">
                <div className="camera">
                    <video id="video"></video>
                    
                   
                </div>

                <div className="options">
                    <Button 
                        type="primary" 
                        onClick={this.handleStartClick}
                        icon="picture"
                    >
                        Tomar Foto
                    </Button>

                    <Button 
                        icon="close"
                        onClick={ this.closeWebcam }
                    > 
                        Cancelar
                    </Button>
                </div>

                <canvas id="canvas" hidden></canvas>            
            </div>
        )
    }

}

module.exports = Webcam