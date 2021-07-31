import React, {Component} from 'react';
import FaceMovement from "../components/FaceMovement";
import MenuBar from "../components/MenuBar";

class FaceMovementPage extends Component {
    render() {
        return (
            <div>
                <MenuBar/>
                <FaceMovement/>
            </div>
        );
    }
}

export default FaceMovementPage;