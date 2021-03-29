import React, {Component} from "react";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import { Link } from "react-router-dom"
import FormControlLabel from "@material-ui/core/FormControlLabel"

export default class RoomJoinPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode : "",
            error : ""
        };
        this.handleRoomCodeChange = this.handleRoomCodeChange.bind(this);
        this.handleJoinRoomButtonPressed = this.handleJoinRoomButtonPressed.bind(this);
    }

    handleRoomCodeChange(e){
        this.setState({
            roomCode : e.target.value
        });
    }

    handleJoinRoomButtonPressed(){
        console.log(this.state.roomCode);
        const requestOptions = {
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({
                room_code : this.state.roomCode
            }),
            
        };
        console.log(requestOptions);
        fetch('api/join-room', requestOptions)
            .then((response) => {
                if(response.ok){
                    this.props.history.push('/room/' + this.state.roomCode);
                } else {
                    this.setState({
                        error : "Room not Found"
                    });
                }
            })
    }

    render(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Join Room
                    </Typography>
                </Grid>            
                <Grid item xs={12} align="center">
                    <TextField
                        onChange={this.handleRoomCodeChange}
                        error = {this.state.error}
                        label = "Code"
                        placeholder = "Enter a Room Code"
                        value = {this.state.roomCode}
                        helperText = {this.state.error}
                        variant = "outlined"              
                    />                
                </Grid>
                <Grid item xs={12} align="center">
                    <Button 
                        color="primary" 
                        variant="contained"
                        onClick={this.handleJoinRoomButtonPressed}
                    >
                        Join
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        )
    }
}