import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    overrides: {
        MuiList: {
            root: {
                width: 'fit-content'
            }
        }
    }
});