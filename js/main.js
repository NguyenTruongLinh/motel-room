Vue.use(window.vuelidate.default)
const { required, minLength } = window.validators

let app = new Vue({
    el: '#app',
    data() {
        return {
            step: 1,
            form: {
                roomRental: '',
                electric: '',
                water: '',
                orther: '',
                note: ''
            },
            total: 0,
            checkOrther: false,
            submitStatus: null
        }
    },
    watch: {},
    validations() {
        if (!this.checkOrther) {
            return {
                form: {
                    roomRental: {
                        required,
                    },
                    electric: {
                        required,
                    },
                    water: {
                        required,
                    },
                }
            }
        } else {
            return {
                form: {
                    roomRental: {
                        required,
                    },
                    electric: {
                        required,
                    },
                    water: {
                        required,
                    },
                    orther: {
                        required,
                    },
                    note: {
                        required,
                    },
                }
            }
        }
    },
    computed: {
        totalMoney() {
            let sum = 0;
            if (!this.checkOrther) {
                sum = this.form.roomRental + this.form.electric + this.form.water;
            } else {
                sum = this.form.roomRental + this.form.electric + this.form.water + this.form.orther;
            }

            this.total = sum;

            return sum;
        },
    },
    methods: {
        resetForm() {
            let self = this;

            Object.keys(this.form).forEach((key, index) => {
                self.form[key] = '';
            });

            this.$v.$reset();
        },
        next() {
            this.step++;
        },
        prev() {
            this.step--;
        },
        submit() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                // do your submit logic here
                this.submitStatus = 'OK';
                this.step++;
            }
        },
    },
    filters: {
        toCurrency(value) {
            if (typeof value !== "number") {
                return value;
            }
            var formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
            return formatter.format(value);
        }
    },
});