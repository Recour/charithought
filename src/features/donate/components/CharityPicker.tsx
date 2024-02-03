import React from "react";
import {Charity} from "../../../constants/charities/Charities";
import {FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
    charities: Array<Charity>
    selectedCharity: Charity | null
    onChange: (event: any, value: Charity | null) => void
}

class CharityPicker extends React.Component<Props, any> {
    render() {
        const {charities, onChange} = this.props;

        return(
            <Autocomplete
                options={charities}
                getOptionLabel={option => option.name}
                onChange={onChange}
                renderInput={params => (
                    <TextField {...params} label={'Charity'} variant={'outlined'} style={{backgroundColor: 'white'}} required/>
                )}
            />
        )
    }
}

export default CharityPicker;