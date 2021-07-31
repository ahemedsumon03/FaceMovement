import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import JEEFACETRANSFERAPI from '../webgl/jeelizFaceTransfer.module'
class FaceMovement extends Component {

    constructor() {
        super();
        this.state = {
            FaceDetect:'...',
            MouthOpen:'...',
            MouthClose:'...',
            LefteyeClose:'...',
            LefteyeOpen:'...',
            RighteyeClose:'...',
            RighteyeOpen:'...'
        }
    }

    OpenWebglCamera=()=>{
        JEEFACETRANSFERAPI.init({
            canvasId:'canvasId',
            NNCPath:'models/',
            hysteresis:0.1,
            isMirror:true,
            callbackReady:(err)=>{
                if(err)
                {
                    console.log('Error');
                }
                else {
                   this.faceMovement();
                }
            }
        })
    }

    faceMovement=()=>{
        setInterval(()=>{
            let movement = JEEFACETRANSFERAPI.get_morphTargetInfluences();
            if(JEEFACETRANSFERAPI.is_detected())
            {
                this.setState({FaceDetect:'YES'})
                let rightEye = movement[8];
                let leftEye = movement[9];
                let mouth = movement[7];
                this.RightEyeStatus(rightEye);
                this.LeftEyeStatus(leftEye);
                this.MouthStatus(mouth);
            }
            else {
                this.setState({
                    FaceDetect:'...',
                    MouthOpen:'...',
                    MouthClose:'...',
                    LefteyeClose:'...',
                    LefteyeOpen:'...',
                    RighteyeClose:'...',
                    RighteyeOpen:'...'
                })
            }

        },1000)
    }

    RightEyeStatus=(rightEye)=>{
        if(rightEye>=0.7)
        {
            this.setState({RighteyeClose:'YES',RighteyeOpen:'...'})
        }
        else {
            this.setState({RighteyeClose:'...',RighteyeOpen:'YES'})
        }
    }

    LeftEyeStatus=(leftEye)=>{
        if(leftEye>=0.7)
        {
            this.setState({LefteyeClose:'YES',LefteyeOpen:'...'})
        }
        else {
            this.setState({LefteyeClose:'...',LefteyeOpen:'YES'})
        }
    }

    MouthStatus=(mouth)=>{
        if(mouth>=0.5)
        {
            this.setState({MouthOpen:'YES',MouthClose:'...'})
        }
        else {
            this.setState({MouthOpen:'...',MouthClose:'YES'})
        }
    }


    componentDidMount() {
        this.OpenWebglCamera();
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row className='mt-5'>
                        <Col md={6} lg={6}>
                            <canvas  id='canvasId' className='canvasclass'></canvas>
                        </Col>
                        <Col md={6} lg={6}>
                            <table className='table table-bordered'>
                                <tr>
                                    <td className='ftext p-2'>Face Detect</td>
                                    <td className='stext'>{this.state.FaceDetect}</td>
                                </tr>
                                <tr>
                                    <td className='ftext p-2'>Mouth Open</td>
                                    <td className='stext'>{this.state.MouthOpen}</td>
                                </tr>
                                <tr>
                                    <td className='ftext p-2'>Mouth Close</td>
                                    <td className='stext'>{this.state.MouthClose}</td>
                                </tr>
                                <tr>
                                    <td className='ftext p-2'>Left eye Close</td>
                                    <td className='stext'>{this.state.LefteyeClose}</td>
                                </tr>
                                <tr>
                                    <td className='ftext p-2'>Left eye Open</td>
                                    <td className='stext'>{this.state.LefteyeOpen}</td>
                                </tr>
                                <tr>
                                    <td className='ftext p-2'>Right eye Close</td>
                                    <td className='stext'>{this.state.RighteyeClose}</td>
                                </tr>
                                <tr>
                                    <td className='ftext p-2'>Right eye Open</td>
                                    <td className='stext'>{this.state.RighteyeOpen}</td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default FaceMovement;