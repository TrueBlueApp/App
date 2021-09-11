const styles = theme => ({
    signOutBtn: {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        width: '300px',
        borderRadius: '0px',
        backgroundColor: '#ad4e4e',
        height: '35px',
        boxShadow: '0px 0px 2px black',
        color: 'white',
        "&:hover": {
            background: '#c25a5a'
        }
    },
    settingsBtn: {
        position: 'absolute',
        bottom: '35px',
        left: '0px',
        width: '300px',
        borderRadius: '0px',
        backgroundColor: '#8d8d8d',
        height: '35px',
        boxShadow: '0px 0px 2px black',
        color: 'white',
        "&:hover": {
            background: '#8c9bd4'
        }
    },
});

export default styles;