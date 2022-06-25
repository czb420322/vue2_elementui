define(function (require) {

    var $ = require('sm');

    return {
        template: '<div class="eg-input-mult"><i class="iconfont btn" :class="{\'disabled\': maxDisabled}" type="button" @click="add">&#xe6c8;</i><input ref="input" type="number" :value="currentValue" @input="handleInput" @blur="handleBlur"><i class="iconfont btn" :class="{\'disabled\': minDisabled}" type="button" @click="sub">&#xe6e2;</i></div>',
        data() {
            return {
                currentValue: 0
            };
        },
        props: {
            step: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: Infinity
            },
            min: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            },
        },
        watch: {
            value: {
                immediate: true,
                handler(newVal) {
                    if (newVal > this.max) newVal = this.max;
                    if (newVal < this.min) newVal = this.min;
                    this.setCurrentValue(newVal);
                }
            }
        },
        computed: {
            minDisabled() {
                return this.currentValue <= this.min;
            },
            maxDisabled() {
                return this.currentValue >= this.max;
            }
        },
        methods: {
            handleInput(event) {
                if (event.target.value === '') {
                    return;
                }
                var newVal = Number(event.target.value);
                if (isNaN(newVal)) return;
                if (newVal > this.max) newVal = this.max;
                if (newVal < this.min) newVal = this.min;
                if (newVal !== event.target.value) {
                    this.$refs.input.value = newVal;
                }
                this.setCurrentValue(newVal);
            },
            handleBlur() {
                this.$refs.input.value = this.currentValue;
            },
            add() {
                var newVal = this.currentValue + this.step;
                if (newVal > this.max) newVal = this.max;
                this.setCurrentValue(newVal);
            },
            sub() {
                var newVal = this.currentValue - this.step;
                if (newVal < this.min) newVal = this.min;
                this.setCurrentValue(newVal);
            },
            setCurrentValue(newVal) {
                if (this.currentValue === newVal) return;
                this.currentValue = newVal;
                this.$emit('input', newVal);
            }
        }
    };

});