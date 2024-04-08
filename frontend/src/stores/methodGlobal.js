
    export function returnValue(comp,field){
        console.log(this[comp][field])
    }

    export function calculatedRemainderGlobal(comp) {
      // Преобразуем значения в числа и вычисляем остаток
      const payment = parseFloat(this[comp].payment.replace(/\s/g, '') || 0);
      const prepayment = parseFloat(this[comp].prepayment.replace(/\s/g, '') || 0);
      const at_the_event = parseFloat(this[comp].at_the_event.replace(/\s/g, '') || 0);

      if (payment < prepayment + at_the_event) {
        this.textModal = 'Остаток не может быть меньше нуля';
        this.showModalWindow = true;
        this[comp].prepayment = "";
        this[comp].at_the_event = "";
        return this[comp].remainder = payment ? payment.toLocaleString() : '';
      }

      let remainderSum = (payment - prepayment - at_the_event).toLocaleString();
      this[comp].remainder = !this[comp].payment ? '' : remainderSum;
      return this[comp].remainder;
    }

    export function changeStatusGlobal(comp) {
      const statusSettings = {
        'Waiting': {
            is_payment_checked: false,
            is_prepayment_checked: false,
            is_at_the_event_checked: false,
            is_remainder_checked: false,
            type_event: this.saveAsBid
        },
        'In progress': {
            is_payment_checked: false,
            is_prepayment_checked: true,
            is_at_the_event_checked: false,
            is_remainder_checked: false,
            type_event: this.saveAsEvent
        },
        'Done': {
            is_payment_checked: false,
            is_prepayment_checked: true,
            is_at_the_event_checked: !!this[comp].at_the_event,
            is_remainder_checked: false,
            type_event: this.saveAsEvent
        },
        'Closed': {
            is_payment_checked: true,
            is_prepayment_checked: true,
            is_at_the_event_checked: !!this[comp].at_the_event,
            is_remainder_checked: true,
            type_event: this.saveAsEvent
        }
      };
      const status = this[comp].status_event.value;
      if (status in statusSettings) {
          Object.assign(this[comp], statusSettings[status]);
      }
      if(this.bgColor1){
          this.changeCheckPaymentGlobal(comp);
      }
    }

    export function changeCheckPaymentGlobal(comp) {
      const checkedItem = ['is_payment_checked', 'is_prepayment_checked', 'is_at_the_event_checked', 'is_remainder_checked'];

      checkedItem.forEach(item => {
        let isChecked;
        if (item === 'is_at_the_event_checked') {
          isChecked = this[comp][item] && this[comp].at_the_event
        } else if (item === 'is_prepayment_checked'){
            isChecked = this[comp][item] && this[comp].prepayment
        } else {
          isChecked = this[comp][item]
        }
        this['bgColor' + (checkedItem.indexOf(item) + 1)] = isChecked ?
                'background-color: var(--event-color-active);' : 'background-color: var(--event-color-disabled);';
      });
    }

    export function formatNotesGlobal(comp) {
      let notes = this[comp].notes;
      // Замена первой буквы в тексте
      notes = notes.replace(/^[а-яa-z]/, (match) => match.toUpperCase());
      // Замена первой буквы после ". "
      notes = notes.replace(/\. [а-яa-z]/g, (match) => `. ${match.charAt(2).toUpperCase()}`);
      // Замена первой буквы в начале новой строки
      notes = notes.replace(/\n[а-яa-z]/g, (match) => `\n${match.charAt(1).toUpperCase()}`);
      this[comp].notes = notes;
    }

    export function capitalizeFirstAdditionalGlobal(item, field) {
      if (item[field].length > 0) {
        item[field] = item[field][0].toUpperCase() + item[field].slice(1);
      }
    }

    export function capitalizeFirstLetterGlobal(comp, field) {
      if (this[comp][field].length > 0) {
        this[comp][field] = this[comp][field][0].toUpperCase() + this[comp][field].slice(1);
      }
    }

    export function formatExpenseInputGlobal(event, index, comp) {
      // берет значение поля => оставил только цифы => макс длину 7 цифр => добавляет пробел слева после каждых 3 символов
      this[comp].expenses[index].sumExpense = event.target.value.replace(/[^0-9]/g, '').replace(/^0/g, '')
          .substring(0, 7).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    export function formatInputGlobal(event, comp) {
      // берет значение поля => оставил только цифы => макс длину 10 цифр => добавляет пробел слева после каждых 3 символов
      let val = event.target.value.replace(/[^0-9]/g, '').replace(/^0/g, '').substring(0, 10).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

      const idToProperty = {
        'prepayment': 'prepayment',
        'payment': 'payment',
        'at_the_event': 'at_the_event',
        'remainder': 'remainder',
        'non_refundable_prepayment': 'non_refundable_prepayment'
      };

      if (idToProperty.hasOwnProperty(event.target.id)) {
        this[comp][event.target.id] = val;
      }
    }

    export function addSelectedContactGlobal(index, option) {
      this.showConcat = !this.showConcat;
      const flags = {
        'Telegram': 'showConcatTg',
        'VK': 'showConcatVk',
        'Доп. Тел.': 'showConcatNum'
      };

      if (flags[option.type]) {
        this[flags[option.type]] = !this[flags[option.type]];
      }

      this.blocksContact.push({
        type: option.type,
      });
      this.optionsContact[index].selected = false;
    }

    export function switchParamsGlobal(selected, name, comp) {
      const updateMap = {
        format_event: { format_event: selected },
        status_event: { status_event: selected },
        source_event: { source_event: selected },
        region_event: { region_event: selected, city_event: this.placeholder_city_base },
        city_event: { city_event: selected },
        selectedYear: { selectedYear: selected },
        params: { params: selected },
      };
      if (name === 'region_event') {
          this[comp].city_event = this.placeholder_city_base;
      }
      this[comp] = { ...this[comp], ...updateMap[name] };
    }

    export function formatContactAddGlobal(comp,field) {
      if (!this[comp][field].startsWith('@')) {
        this[comp][field] = '@' + this[comp][field];
      }
    }

    export function formatContactClearGlobal(comp,field) {
      if (this[comp][field] === '@') {
        this[comp][field] = '';
      }
    }

    export function addScheduleGlobal(comp) {
      if (this[comp].schedules.length < 15) {
        this[comp].schedules.push({ timeSchedule: '', noteSchedule: '' });
      }
    }

    export function addExpenseGlobal(comp) {
      if (this[comp].expenses.length < 15) {
        this[comp].expenses.push({ sumExpense: '', noteExpense: '' });
      }
    }

    export function validateInputGlobal(comp) {
        const d = this[comp]; // d - объект события из компонента
        const isValidPlace = ((d.region_event.value !== 'Empty' && d.region_event) || this.getUserPlace) &&
            ((d.city_event.value !== 'Empty' && d.city_event) || this.getUserPlace);

        const isBid = d.status_event.value === 'Waiting' || !d.status_event || d.status_event.value === 'Empty';

        const isValidBid = d.short_name &&
            d.date_event &&
            d.start_time &&
            d.end_time &&
            d.client &&
            d.fio_client &&
            d.num_phone &&
            d.status_event && d.status_event.value !== 'Empty' &&
            d.format_event && d.format_event.value !== 'Empty' &&
            isValidPlace;
        const isValidEvent = (this.isCanselEvent ? true : (d.payment && d.prepayment)) &&
            d.source_event && d.source_event.value !== 'Empty' &&
            isValidPlace;

        if (isBid && isValidBid) {
            this.isValidBid = true;
        } else if (isValidEvent) {
            this.isValidEvent = true;
        } else {
            if (isBid) {
                this.validationInputBid = true;
            } else {
                this.validationInputEvent = true;
            }
            this.textModal = 'Заполните обязательные поля';
            this.showModalWindow = true;
            Object.keys(this.styleBorder).forEach(key => {this.changeBorderStyleGlobal(comp,key)})
        }
    }

    export function arraysAdjustmentsGlobal(comp) {
        if (this[comp].schedules[0].timeSchedule === '' && this[comp].schedules[0].noteSchedule === '') {
          this.schedules = [];
        }
        if (this[comp].expenses[0].sumExpense === '' && this[comp].expenses[0].noteExpense === '') {
          this.expenses = [];
        }
    }

    export function changeBorderStyleGlobal(comp,field) {
        const red = 'border: 1px solid var(--event-color-red); border-radius: 0.375rem;';
        const gray = 'border: 1px solid var(--event-color-border); border-radius: 0.375rem;';
        if (['payment', 'prepayment', 'source_event'].includes(field)) {
            if (this[comp][field] && this.validationInputEvent) {
                return this.styleBorder[field] = gray
            } else if (!this[comp][field] && this.validationInputEvent) {
                return this.styleBorder[field] = red
            }
        } else {
            if (((this[comp][field] && this[comp][field].value !== 'Empty') && this.validationInputBid) || (this[comp][field] && this.validationInputEvent)) {
                return this.styleBorder[field] = gray
            } else if (((!this[comp][field] || this[comp][field].value === 'Empty') && this.validationInputBid) || (!this[comp][field] && this.validationInputEvent)) {
                return this.styleBorder[field] = red
            }
        }
    }

    export function changeNonRefundablePrepaymentGlobal(comp) {
        this[comp].add_non_refundable_prepayment = !this[comp].add_non_refundable_prepayment;
        if (this[comp].add_non_refundable_prepayment && !this[comp].non_refundable_prepayment) {
            this[comp].non_refundable_prepayment = this.current_user.non_refundable_prepayment || '';
        }
    }

    export function calculatedDurationTimeGlobal(comp) {
      if (this[comp].start_time && this[comp].end_time) {
        const start = new Date(`2000-01-01 ${this[comp].start_time}`);
        const end = new Date(`2000-01-01 ${this[comp].end_time}`);
        const durationHours = (end - start) / (1000 * 60 * 60);

        return this[comp].duration_time = durationHours.toFixed(1);
      } else {
        return '';
      }
    }

    export function calculateExpensesSumGlobal(comp) {
      let totalSum = 0;

      for (const expense of this[comp].expenses) {
        if (expense.sumExpense) {
          const parsedSum = parseFloat(expense.sumExpense.replace(/\s/g, ''));
          if (!isNaN(parsedSum)) {
            totalSum += parsedSum;
          }
        }
      }

      return this[comp].expenses_sum = totalSum;
    }

    export function createRegionOptionsGlobal() {
        return this.regions.map(region => ({ value: region.value, label: region.label, cities: region.cities }));
    }

    export function createCityOptionsGlobal(comp) {
        if (this[comp].region_event) {
            return this[comp].region_event.cities.map(city => ({value: city.city, label: city.name}));
        } else {
            return [{value: 'error', label: 'Нет доступных городов'}];
        }
    }

    export function userEventGlobal(comp) {
      this.validateInputGlobal(comp);
      if (this.isValidEvent || this.isValidBid) {
        this.arraysAdjustmentsGlobal(comp);
        this.mutation()
      }
    }

    export function formatDurationGlobal(start_time, end_time) {
        const start = new Date(`2000-01-01 ${start_time}`);
        const end = new Date(`2000-01-01 ${end_time}`);
        const hour = Math.floor((end - start) / (1000 * 60 * 60));
        const min = Math.floor(((end - start) % (1000 * 60 * 60)) / (1000 * 60));

        let formatHours;
        let formatMinutes;

        if (hour === 0) {
        formatHours = '';
        } else if (hour === 1 || hour === 21) {
        formatHours = `${hour} час`;
        } else if (hour === 2 || hour === 3 || hour === 4 || hour === 22 || hour === 23 || hour === 24) {
        formatHours = `${hour} часа`;
        } else {
        formatHours = `${hour} часов`;
        }

        if (min === 0) {
        formatMinutes = '';
        } else if (min === 1 || (min % 10 === 1 && min !== 11)) {
        formatMinutes = `${min} минута`;
        } else if ((min === 2 || min === 3 || min === 4) ||
        (min % 10 === 2 || min % 10 === 3 || min % 10 === 4) &&
        !(min === 12 || min === 13 || min === 14)) {
        formatMinutes = `${min} минуты`;
        } else {
        formatMinutes = `${min} минут`;
        }

        return formatHours + (formatHours && formatMinutes ? ' ' : '') + formatMinutes;
    }

    export function getButtonColorGlobal(format) {
        const formatOptions = {
            "Sport's event": 'var(--event-color-red)',
            'Corporate': 'var(--event-color-orange)',
            'Wedding': 'var(--event-color-yellow)',
            'Birthday': 'var(--event-color-green)',
            'Conference': 'var(--event-color-blue)',
            'Regional event': 'var(--event-color-darkpurp)',
            "Children's holiday": 'var(--event-color-darkblue)',
            'Other': 'var(--event-color-purp)',
        }

        return formatOptions[format]
    }

    export function getRemainingDaysGlobal(date) {
      // Получить количество оставшихся дней от текущей даты до заданной даты
      const currentDate = new Date();
      const eventDate = new Date(date);
      const timeDiff = eventDate.getTime() - currentDate.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

      let message;
      if (daysRemaining === 1 || daysRemaining % 10 === 1 && (daysRemaining !== 11 &&  daysRemaining % 100 !== 11)) {
        message = ` ${daysRemaining} день`;
      } else if (
        (daysRemaining === 2 || daysRemaining === 3 || daysRemaining === 4) ||
        (daysRemaining % 10 === 2 || daysRemaining % 10 === 3 || daysRemaining % 10 === 4) &&
        !(daysRemaining % 100 === 12 || daysRemaining % 100 === 13 || daysRemaining % 100 === 14)
      ) {
        message = ` ${daysRemaining} дня`;
      } else {
        message = ` ${daysRemaining} дней`;
      }

      return message;
    }

    export function formatDateGlobal(date) {
      const options = { month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('ru-RU', options);
    }

    export function formatCreateDateGlobal(date) {
      // to "YYYY-MM-DD"
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    }
