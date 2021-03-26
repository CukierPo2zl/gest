
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import ReactPayPal from './ReactPayPal';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(2),
            width: theme.spacing(30),
            height: theme.spacing(16),
        },
        paper: {
            display: 'center',
            flexWrap: 'wrap',
            width: '40px',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        App: {
            textAlign: 'center',
        },

        Appheader: {
            backgroundColor: '#282c34',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'calc(10px + 2vmin)',
            color: 'white',
        },

        Checkoutbutton: {
            padding: '8px',
            fontSize: '20px',
            borderRadius: '5px',
            border: '2px solid #61dafb',
            color: '#61dafb',
            background: 'none',
        },

        Checkoutbuttonhover: {
            border: '2px solid #61dafb',
            color: '#282c34',
            background: '#61dafb',
        },

        Paymentdiv: {
            paddingTop: '20px',
            height: '300px',
            width: '300px',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '20px',
        },
        InsideHeader: {
            paddingTop: '200px',
            height: '3000px',
            width: '300px',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '20px',
        },
    },

}));



function Payment(props) {
    // function getModalStyle() {
    //     const top = 50;
    //     const left = 50;

    //     return {
    //         top: `${top}%`,
    //         left: `${left}%`,
    //         transform: `translate(-${top}%, -${left}%)`,
    //     };
    // }
    const classes = useStyles();
    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [checkout, setCheckout] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (

        <div className={classes.root}>
            <Modal open={open} scrollable={true} onClose={handleClose} className="paper" style={{ 'max-height': 'calc(100vh)', 'overflow-y': 'auto' }}>
                <Paper style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)', width: "450px"
                }}>
                    <div className="App">
                        <header className="App-header">
                            {(checkout === true)
                                ? <div className="payment-div">
                                    <ReactPayPal price={props.realprice} />
                                </div>

                                : <div>
                                    <center>
                                        <div style={{ margin: '20px', fontWeight: 'bold', fontSize: "30px" }}>Check your order</div>
                                        <Paper className="Payment" style={{ width: 200, height: 250, margin: '20px' }}>
                                            <center className="Header" style={{ fontSize: 19, marginTop: '30px' }}>
                                                {props.header}
                                            </center>
                                            <center className="Prize" style={{ fontSize: 23, marginTop: '30px', fontWeight: 'bold' }}>
                                                {props.price}
                                            </center>
                                            <ul className="Content" style={{ marginTop: '30px' }}>
                                                <li>One spreadsheet</li>
                                                <li>5 basic alghoritms</li>
                                                <li>10 calcs per day</li>
                                            </ul>
                                        </Paper>
                                        <button onClick={() => { setCheckout(true) }} className="checkout-button" style={{
                                            backgroundColor: "#4527a0",
                                            border: 'none',
                                            color: 'white',
                                            padding: '15px 32px',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            fontSize: 16,
                                            margin: '4px 2px',
                                            cursor: 'pointer'
                                        }}>Checkout</button>
                                    </center>

                                </div>
                            }
                        </header>
                    </div>
                </Paper>

            </Modal>

            <Paper className="Payment" style={{ width: 200, height: 350 }}>
                <center className="Header" style={{ fontSize: 19, padding: '20px', marginTop: '30px', borderBottom: '3px solid red' }}>
                    {props.header}
                </center>
                <center className="Prize" style={{ fontSize: 23, marginTop: '30px', fontWeight: 'bold' }}>
                    {props.price}
                </center>
                <ul className="Content" style={{ marginTop: '30px' }}>
                    <li>One spreadsheet</li>
                    <li>5 basic alghoritms</li>
                    <li>10 calcs per day</li>
                </ul>
                <center>
                    <button className="Btn" onClick={handleOpen} style={{
                        backgroundColor: "#4527a0",
                        border: 'none',
                        color: "white",
                        padding: '15px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontSize: 16,
                        margin: '4px 2px',
                        cursor: 'pointer'
                    }}>
                        {props.btn}
                    </button>
                </center>
            </Paper>


        </div>)
}

export const Payments = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>

            <Payment header="Free Trial" price="$0" realprice="0" btn="Start Trial" />
            <Payment header="Basic" price="$5.99/mo." realprice="5.99" btn="Get Started" />
            <Payment header="Premium" price="$9.99/mo." realprice="9.99" btn="Get Started" />

        </div>);


}