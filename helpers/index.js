module.exports = {
    channelSwitcher : (elem) =>{
        if(elem == 1) return 'Instagram Page';
        else if(elem == 2) return 'Twitch Channel';
        else return '<script>document.location.reload(true)</script>';
    },
    selected: (s) => {
        return parseInt(s) == 1 ? 'Instagram' : 'Twitch';
    },
    toLower(string)
    {
        return string.toLowerCase();
    }
}