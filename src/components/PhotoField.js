import React, {Component} from "react";
import styled from "styled-components";
import Button from "./Button";

const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 50vw;
`;

const Photo = styled.img`
  border-radius: 50px;
  border: 1px solid ${({theme}) => theme.color.blue};
  background-size: contain;
  width: 55px;
  height: 55px;
`;

const StyledButton = styled(Button)`
  width: 30vw;
  height: 40px;
  font-size: .8em;
  opacity: 60%;
`;

const Input = styled.input`
  display: none;
`;

class PhotoField extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    state = {
      imageUrl: this.props.field.value ?
          `data:image/*;base64,${this.props.field.value}`
          : null,
    };

    handleInputLoad = (e) => {
        let reader = new FileReader();
        let file = e.currentTarget.files[0];
        if (file) {
            reader.onloadend = () => {
                this.setState({
                    imageUrl: reader.result,
                });
                let code = reader.result.replace(/^data:image\/*.*;base64,/, "");
                this.props.setFieldValue(this.props.field.name, code);
            };
            reader.readAsDataURL(file);
        }
    };

    render() {

        return (
            <>
                <PhotoWrapper>
                    <Input
                        type="file"
                        ref={this.inputRef}
                        onChange={event => this.handleInputLoad(event)}
                        accept="image/*"
                    />

                    <Photo
                        name={this.props.field.name}
                        src={this.state.imageUrl}
                    />


                    <StyledButton
                        isWhite
                        type="button"
                        onClick={() => this.inputRef.current.click()}
                    >
                        Choose file...
                    </StyledButton>
                </PhotoWrapper>
            </>
        )
    }
}

export default PhotoField;