export const validateEmail = (email: string): string | undefined => {
    let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!email.length || !validRegex.test(email)) {
        return 'Please enter valid email address'
    }
}

export const validatePassword = (password: string): string | undefined => {
    if (password.length < 5) {
        return 'Min password length is 5 characters'
    }
};

export const validateName = (name: string): string | undefined => {
    if (!name.length) return 'Please enter a value';
};