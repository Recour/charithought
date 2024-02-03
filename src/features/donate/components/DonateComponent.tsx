import React from "react";
import {TextField, Box, Grid, Typography } from "@material-ui/core";
import {DONATION_CURRENCY, DONATION_MINIMUM_PRICE, PAYPAL_CLIENT_ID} from "../../../constants/Constants";
import NumberFormat from 'react-number-format';
import {addThought} from "../../../redux/thoughts/ThoughtsActionCreators";
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {withRouter, RouteComponentProps} from 'react-router'
import CharityPicker from "./CharityPicker";
import {CHARITIES, Charity} from "../../../constants/charities/Charities";

const reactPaypalButton = require('react-paypal-button-v2');

interface Props extends RouteComponentProps {
    id: number
    addThought: (thought:any) => {}
}

interface State {
    message: string,
    price: number
    charity: Charity | null
}

const amountPicker = (props:any) => {
    const { inputRef, onChange, ...other } = props;
    return(
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix={DONATION_CURRENCY}
        />
    );
};

class DonateComponent extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);

        this.state = {
            message: '',
            price: DONATION_MINIMUM_PRICE,
            charity: CHARITIES[0]
        };

        this.onPurchaseComplete = this.onPurchaseComplete.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeCharity = this.handleChangeCharity.bind(this);
    }

    render() {
        const { PayPalButton } = reactPaypalButton;
        const helperText = "99% of your donation (after transaction costs) will go to your chosen charity, the remaining 1% will be used to keep the web app running.";
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Box my={1}>
                        <CharityPicker charities={CHARITIES} onChange={this.handleChangeCharity} selectedCharity={this.state.charity}/>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box my={1}>
                        <TextField style={{backgroundColor: 'white'}} onChange={this.handleChangeMessage} label={"Message"} variant={"outlined"} required multiline={true}
                                   fullWidth={true} rows={4} rowsMax={10}  value={this.state.message} inputProps={{ maxLength: 1000 }}
                        />

                        <Typography variant={'caption'} color={'textSecondary'}>
                            {helperText}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box my={1}>
                        <TextField
                            variant={'outlined'}
                            label="Amount"
                            value={Number(this.state.price).toFixed(2)}
                            onChange={this.handleChangePrice}
                            required
                            InputProps={{
                                inputComponent: amountPicker,
                            }}
                            style={{backgroundColor: 'white'}}
                        />
                    </Box>
                </Grid>

                {
                    this.state.message.trim().length > 0 ?
                        <Grid item xs={12}>
                            <Box my={2}>
                                <PayPalButton
                                    style={{shape: 'pill', size: 'responsive'}}
                                    amount={Number(this.state.price).toFixed(2)}
                                    shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={(details:any, data:any) => {
                                        this.onPurchaseComplete(data.orderID);

                                        /* OPTIONAL: Call your server to save the transaction
                                        return fetch("/paypal-transaction-complete", {
                                            method: "post",
                                            body: JSON.stringify({
                                                //orderID: data.orderID
                                            })
                                        });
                                        */
                                    }}
                                    options={{
                                        clientId: PAYPAL_CLIENT_ID
                                    }}
                                />
                            </Box>
                        </Grid>
                    :
                        null
                }
            </Grid>
        )
    }

    onPurchaseComplete(orderID:string) {
        const {addThought} = this.props;
        const {history} = this.props;

        const trimmedMessage = this.state.message.trim();

        if(trimmedMessage.length !== 0 && this.state.charity !== null) {
            addThought({
                id: this.props.id,
                message: trimmedMessage,
                price: Number(this.state.price),
                charity: this.state.charity.name,
                orderID: orderID
            });
        }

        this.setState({message: ''});
        this.setState({price: DONATION_MINIMUM_PRICE});

        history.push('/feed');
    }

    handleChangeMessage(e:any) {
        this.setState({message: e.target.value});
    }

    handleChangePrice(e:any) {
        if(Number(e.target.value) > DONATION_MINIMUM_PRICE) {
            this.setState({price: e.target.value});
        }
    }

    handleChangeCharity(event:any, value:Charity|null) {
        this.setState({charity: value});
    }
}

const mapStateToProps = (state:any) => {
    if(state.firestore.data.lastThought) {
        const thought = state.firestore.data.lastThought[Object.keys(state.firestore.data.lastThought)[0]];
        const newId = thought.id + 1;

        return {
            id: newId
        }
    }
};

const mapDispatchToProps = (dispatch:any) => {
    return({
        addThought: (thought:any) => dispatch(addThought(thought))
    })
};

const AddThoughtComponentWithRouter = withRouter(DonateComponent);

export default (compose(
    firestoreConnect(() => [
        { collection: 'thoughts', orderBy: ['id', 'desc'], limit: 1, storeAs: 'lastThought' },
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(AddThoughtComponentWithRouter)) as React.ComponentType;