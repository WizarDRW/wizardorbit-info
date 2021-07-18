export default {
    required: (value) => !!value || "Required.",
    minPass: (v) => v.length >= 8 || "Min 8 characters",
    maxPass: (v) => v.length <= 16 || 'Max 16 characters',
    isEmail: (value) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(value)) return true
        return 'Must be a valid email';
    },
    isEqualEmail: (email, confirm) => {
        if (email == confirm) return true;
        return 'Not equal email!'
    },
    minUsername: (v) => v.length >= 5 || "Min 8 characters",
    maxUsername: (v) => v.length <= 12 || "Max 12 characters",
    isPasswordStrong: (v) => {
        if (v < 3) return `${v} points is too low for security!`
        return true;
    },
    isEqualPass: (pass, confirm) => {
        if (pass == confirm) return true;
        return 'Not equal passwords!'
    }
}