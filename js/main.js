Vue.use(window.vuelidate.default)
const { required, minLength } = window.validators

let app = new Vue({
    el: '#app',
    data() {
        return {
            step: 1,
            form: {
                roomRental: 9500000,
                electric: '',
                water: '',
                orther: '',
                note: ''
            },
            total: 0,
            checkOrther: false,
            submitStatus: null,
            persons: [{
                    id: 1,
                    name: 'Bảo',
                    money: 0,
                    model: '',
                    newMoney: 0
                },
                {
                    id: 2,
                    name: 'Chi',
                    money: 0,
                    model: '',
                    newMoney: 0
                },
                {
                    id: 3,
                    name: 'Hiếu',
                    money: 0,
                    model: '',
                    newMoney: 0
                },
                {
                    id: 4,
                    name: 'Linh',
                    money: 0,
                    model: '',
                    newMoney: 0
                },
                {
                    id: 5,
                    name: 'Nguyện',
                    money: 0,
                    model: '',
                    newMoney: 0
                },
                {
                    id: 6,
                    name: 'Sinh',
                    money: 0,
                    model: '',
                    newMoney: 0
                },
                {
                    id: 7,
                    name: 'Tú',
                    money: 0,
                    model: '',
                    newMoney: 0
                }
            ]
        }
    },
    watch: {
        total() {
            this.persons.forEach(e => {
                e.money = Math.round((this.totalMoney / 7) * 100) / 100;
            })
        },
    },
    validations() {
        if (!this.checkOrther) {
            return {
                form: {
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
        updateMoney(e, item) {
            item.newMoney = parseFloat(e.target.value) + parseFloat(item.money)
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
        },
    },
});