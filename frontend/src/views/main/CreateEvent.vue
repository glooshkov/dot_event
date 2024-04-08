<template>
  <form action="POST" @submit.prevent="userEventGlobal(comp)">
    <div class="parent2" style="background-color: #111827;">
      <h2 class="title1" style="margin-top: 4rem; margin-bottom: 2rem">НОВАЯ ЗАЯВКА</h2>
      <div class="container3">
        <div>
          <!-- Формат события -->
          <div style="margin-top: 1rem;">
            <label class="text-block" style="margin-bottom: 0.5rem;">Формат события</label>
            <SelectButton
                id="format_event"
                style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                v-model="createEventDetails.format_event"
                :options="optionsFormat"
                :style="styleBorder.format_event"
                :initialSelected="placeholder_format"
                @update="switchParamsGlobal($event, $event.target.id, comp);
                changeBorderStyleGlobal(comp,$event.target.id)"
            />
          </div>

          <!-- Краткое название события -->
          <div style="margin-top: 1rem;">
            <label class="text-block">Название события</label>
            <div>
              <input
                  id="short_name" class="inp"
                  type="text" autocomplete="" placeholder="Ваше название"
                  :style="styleBorder.short_name"
                  v-model="createEventDetails.short_name"
                  @input="capitalizeFirstLetterGlobal(comp,$event.target.id)"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>

          <!-- Дата события -->
          <div style="margin-top: 1rem;">
            <label class="text-block">Дата события</label>
            <div>
              <input
                  id="date_event" class="inp"
                  type="date" autocomplete="date_event" placeholder="Выберите дату"
                  :style="styleBorder.date_event"
                  v-model="createEventDetails.date_event"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>

          <!-- Время начала и конца -->
          <div style="margin-top: 1rem;">
            <div style="margin-top: 1rem;">
              <label class="text-block">Начало и конец события</label>
              <div class="block">
                <input
                    id="start_time" class="inp"
                    style="margin-right: 0.5rem;" type="time" autocomplete="start_time" placeholder="Пример: 8:30"
                    step="900"
                    :style="styleBorder.start_time"
                    v-model="createEventDetails.start_time"
                    @change="changeBorderStyleGlobal(comp,$event.target.id)"
                />
                <input
                    id="end_time" class="inp"
                    type="time" autocomplete="end_time" placeholder="Пример: 8:30"
                    :style="styleBorder.end_time"
                    v-model="createEventDetails.end_time"
                    @change="changeBorderStyleGlobal(comp,$event.target.id)"
                />
              </div>
            </div>
          </div>

          <!-- Заказчик(и) события -->
          <div style="margin-top: 1rem;">
            <label class="text-block">Заказчик события</label>
            <div>
              <input
                  id="client" class="inp"
                  type="text" autocomplete="client" placeholder="Напишите кратко"
                  :style="styleBorder.client"
                  v-model="createEventDetails.client"
                  @input="capitalizeFirstLetterGlobal(comp,$event.target.id)"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>

          <!-- Выбор локации -->
          <div>
            <div style="margin-top: 1rem;">
              <label class="text-block" style="margin-bottom: 0.5rem;">Событие будет проходить в Вашем городе?</label>
              <div style="display: flex; justify-content: center; align-items: center">
                <h3 class="text-block" style="text-align: right; margin-right: 1rem">Да</h3>
                <input type="checkbox" id="switch1" class="custom-checkbox" @click="this.getUserPlace = !this.getUserPlace"/>
                <label for="switch1" class="custom-label">Toggle</label>
                <h3 class="text-block" style="margin-left: 1rem">Нет</h3>
              </div>
            </div>
            <TransitionGroup name="child">
              <div v-if="!this.getUserPlace">
                <!-- Регион события -->
                <div style="margin-top: 1rem;">
                  <label class="text-block" style="margin-bottom: 0.5rem;">Регион</label>
                  <SelectButton
                      id="region_event"
                      style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                      v-model="createEventDetails.region_event"
                      :options="regionOptions"
                      :style="styleBorder.region_event"
                      :initialSelected="placeholder_region"
                      @update="switchParamsGlobal($event, $event.target.id, comp);
                      changeBorderStyleGlobal(comp,$event.target.id)"
                  /> <!-- :initialSelected="this.current_user.profile_region" -->
                </div>

                <!-- Город события -->
                <div style="margin-top: 1rem;">
                  <label class="text-block" style="margin-bottom: 0.5rem;">Город</label>
                  <SelectButton
                      id="city_event"
                      style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                      v-model="createEventDetails.city_event"
                      :options="cityOptions"
                      :style="styleBorder.city_event"
                      :initialSelected="placeholder_city"
                      @update="switchParamsGlobal($event, $event.target.id, comp);
                      changeBorderStyleGlobal(comp,$event.target.id)"
                  /> <!-- :initialSelected="this.current_user.profile_city" -->
                </div>
              </div>
            </TransitionGroup>
          </div>
          <!-- Место проведения события -->
          <div style="margin-top: 1rem;">
            <label class="text-block">Место проведения события</label>
            <div>
              <input
                  id="address" class="inp"
                  type="text" autocomplete="address" placeholder="Адрес/Место"
                  v-model="createEventDetails.address"
                  @input="capitalizeFirstLetterGlobal(comp,$event.target.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Контакты заказчика -->
    <div class="container_divider">
      <div class="divider"></div>
      <h3 class="title2">Контакты заказчика</h3>
      <div class="divider"></div>
    </div>

    <div class="parent2" style="background-color: #111827; margin-top: -1.5rem">
      <div class="container3">
        <div>
          <!-- Контактное лицо -->
          <div style="margin-top: 1rem;">
            <label class="text-block">ФИО</label>
            <div>
              <input
                  id="fio_client" class="inp"
                  style="text-transform:capitalize;" type="text" autocomplete="fio_client" placeholder="ФИО"
                  :style="styleBorder.fio_client"
                  v-model="createEventDetails.fio_client"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>

          <!-- Номер телефона -->
          <div style="margin-top: 1rem;">
            <label class="text-block">Номер телефона</label>
            <div>
              <input
                  id="num_phone" class="inp"
                  type="tel" autocomplete="num_phone" placeholder="+7 (___) ___-__-__"
                  :style="styleBorder.num_phone"
                  v-model="createEventDetails.num_phone"
                  v-maska data-maska="+7 (###) ###-##-##"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>

          <!-- Дополнительные контакты -->
          <div>
            <div class="parent-circle">
              <TransitionGroup name="slide-up" :duration="{ enter: 500, leave: 500 }">
                <button disabled class="button-circle" style="opacity: 0" key="id1"></button>
                <PlusIcon
                    v-if="!showConcat && blocksContact.length <= 2"
                    class="button-circle"
                    type="button" key="id2"
                    @click="this.showConcat = true"
                />
                <button disabled class="button-circle" style="opacity: 0" key="id3"></button>
              </TransitionGroup>

              <div class="contact-button-circle">
                <TransitionGroup name="slide-up" :duration="{ enter: 400, leave: 900 }">
                  <XMarkIcon v-if="showConcat" @click="this.showConcat = false" class="button-circle" type="button"/>
                  <div v-if="showConcat" v-for="(option, index) in optionsContact" :key="index">
                    <button
                        v-if="option.selected"
                        class="button-circle"
                        style="padding: 0.7rem 0.7rem; background-color: #6366f1;" type="button"
                        @click="addSelectedContactGlobal(index, option)"
                    >
                      <svg width="30" height="30" x="0" y="0" :viewBox="option.viewBox" >
                        <g>
                          <path :d="option.d" fill="#ffffff" opacity="1"/>
                        </g>
                      </svg>
                    </button>
                  </div>
                </TransitionGroup>
              </div>
            </div>

            <div style="margin-top: 0.5rem">
              <TransitionGroup name="child3">
                <div v-if="showConcatTg" class="block">
                  <div disabled class="button-contact">Telegram</div>
                  <input
                      id="contact_tg" class="inp"
                      placeholder="Username"
                      v-model="createEventDetails.contact_tg"
                      @blur="formatContactClearGlobal(comp,$event.target.id)"
                      @input="formatContactAddGlobal(comp,$event.target.id)"
                  />
                </div>

                <div v-if="showConcatVk" class="block">
                  <p disabled class="button-contact">VK</p>
                  <input
                      v-model="createEventDetails.contact_vk"
                      id="contact_tg" class="inp"
                      placeholder="Username"
                      @blur="formatContactClearGlobal(comp,$event.target.id)"
                      @input="formatContactAddGlobal(comp,$event.target.id)"
                  />
                </div>

                <div v-if="showConcatNum" class="block">
                  <p disabled class="button-contact">Доп. тел.</p>
                  <input
                      class="inp"
                      placeholder="+7 (___) ___-__-__"
                      v-model="createEventDetails.num_phone_add"
                      v-maska data-maska="+7 (###) ###-##-##"
                  />
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Заметки -->
    <div class="container_divider">
      <div class="divider"></div>
      <h3 class="title2">Заметки</h3>
      <div class="divider"></div>
    </div>

    <div class="parent2" style="background-color: #111827;">
      <div class="container3">
        <div>
          <div style="margin-top: 1rem;">
            <textarea
                id="notes" class="inp"
                autocomplete="notes" style="height: 200px; resize: none;" placeholder="Ваши заметки"
                v-model="createEventDetails.notes"
                @input="formatNotesGlobal(comp)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Расписание события -->
    <div class="container_divider">
      <div class="divider"></div>
      <h3 class="title2">Расписание события</h3>
      <div class="divider"></div>
    </div>

    <div class="parent2" style="background-color: #111827;">
      <div class="container3">
        <div>
          <TransitionGroup>
            <div class="block" v-for="(schedule, index) in this.createEventDetails.schedules" :key="index">
              <input type="time" style="padding: 0.4rem 0.75rem; margin-right: 0.5rem; width: 30%;" class="inp" v-model="schedule.timeSchedule" />
              <input
                  class="inp"
                  type="text" placeholder="Примечание"
                  v-model="schedule.noteSchedule"
                  @input="capitalizeFirstAdditionalGlobal(schedule, $event.target.id)"
              />
            </div>

            <div class="parent-circle" :key="'parent-circle'">
              <PlusIcon
                  v-show="this.createEventDetails.schedules.length < 15"
                  class="button-circle"
                  type="button"
                  @click="addScheduleGlobal(comp)"
              />
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>

    <!-- Источник заказа -->
    <div class="container_divider">
      <div class="divider"></div>
      <h3 class="title2">Источник заказа</h3>
      <div class="divider"></div>
    </div>

    <div class="parent2" style="background-color: #111827;">
      <div class="container3">
        <div>
          <div>
            <SelectButton
                style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                v-model="createEventDetails.source_event"
                :options="optionsSource"
                :style="styleBorder.source_event"
                :initialSelected="placeholder_source"
                @update="switchParamsGlobal($event, $event.target.id, comp);
                changeBorderStyleGlobal(comp,$event.target.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Расходы -->
    <div class="container_divider">
      <div class="divider"></div>
      <h3 class="title2">Расходы</h3>
      <div class="divider"></div>
    </div>

    <div class="parent2" style="background-color: #111827;">
      <div class="container3">
        <div>
          <TransitionGroup>
            <div class="block" v-for="(expense, index) in this.createEventDetails.expenses" :key="index">
              <input
                  class="inp"
                  style="margin-right: 0.5rem; width: 30%;" type="text" placeholder="Сумма" maxlength="7"
                  v-model="expense.sumExpense"
                  @input="formatExpenseInputGlobal($event, index, comp)"
              />
              <input
                  class="inp"
                  type="text" placeholder="Примечание"
                  v-model="expense.noteExpense"
                  @input="capitalizeFirstAdditionalGlobal(expense, $event.target.id)"
              />
            </div>
            <div class="parent-circle" :key="'parent-circle2'">
              <PlusIcon
                  v-show="this.createEventDetails.expenses.length < 15"
                  class="button-circle"
                  type="button"
                  @click="addExpenseGlobal(comp)"
              />
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>


    <!-- Оплата -->
    <div class="container_divider">
      <div class="divider"></div>
      <h3 class="title2">Оплата</h3>
      <div class="divider"></div>
    </div>

    <div class="parent2" style="background-color: #111827;">
      <div class="container3">
        <div>
          <div>
            <label class="text-block">Оплата</label>
            <div class="block-pay">
              <CheckIcon class="check-box-dis" :style="this.bgColor1"></CheckIcon>
              <input
                  id="payment" class="inp"
                  type="text" style="margin-top: 0; margin-left: 0.5rem" placeholder="Сумма" maxlength="13"
                  :style="styleBorder.payment"
                  v-model="createEventDetails.payment"
                  @input="formatInputGlobal($event, comp)"
                  @change="calculatedRemainderGlobal(comp);
                  changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>
          <div style="margin-top: 1rem;">
            <label class="text-block">Предоплата</label>
            <div class="block-pay">
              <CheckIcon class="check-box-dis" :style="this.bgColor2"></CheckIcon>
              <input
                  id="prepayment" class="inp"
                  style="margin-top: 0; margin-left: 0.5rem" type="text" placeholder="Сумма" maxlength="13"
                  :style="styleBorder.prepayment"
                  v-model="createEventDetails.prepayment"
                  @input="formatInputGlobal($event, comp)"
                  @change="calculatedRemainderGlobal(comp);
                  changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>
          <div style="margin-top: 1rem;">
            <label class="text-block">На мероприятии</label>
            <div class="block-pay" >
              <CheckIcon class="check-box-dis" :style="this.bgColor3"></CheckIcon>
              <input
                  id="at_the_event" class="inp"
                  style="margin-top: 0; margin-left: 0.5rem" type="text" placeholder="Сумма" maxlength="13"
                  v-model="createEventDetails.at_the_event"
                  @input="formatInputGlobal($event, comp)"
                  @change="calculatedRemainderGlobal(comp);
                  changeCheckPaymentGlobal(comp)"
              />
            </div>
          </div>
          <div style="margin-top: 1rem;">
            <label class="text-block">Остаток</label>
            <div class="block-pay">
              <CheckIcon class="check-box-dis" :style="this.bgColor4"></CheckIcon>
              <input
                  id="remainder" class="button-contact"
                  style="margin-top: 0; margin-left: 0.5rem; width: 100%; margin-right: 0; " type="text" placeholder="Сумма" maxlength="13"
                  disabled
                  v-model="createEventDetails.remainder"
                  @input="formatInputGlobal($event, comp)"
              />
            </div>
          </div>
          <div style="margin-top: 1rem;">
            <label class="text-block" style="margin-bottom: 0.5rem;">Добавить невозвратную предоплату?</label>
            <div style="display: flex; justify-content: center; align-items: center">
              <h3 class="text-block" style="text-align: right; margin-right: 1rem">Нет</h3>
              <input
                  id="switch" class="custom-checkbox"
                  type="checkbox"
                  @click="changeNonRefundablePrepaymentGlobal(comp)"
              />
              <label for="switch" class="custom-label">Toggle</label>
              <h3 class="text-block" style="margin-left: 1rem">Да</h3>
            </div>
          </div>
          <div style="margin-top: 1rem;" v-if="this.createEventDetails.add_non_refundable_prepayment === true">
            <label class="text-block">Невозвратная предоплата</label>
            <div class="block-pay" >
              <CheckIcon class="check-box-dis" style="background-color: #303177"></CheckIcon>
              <input
                  id="non_refundable_prepayment" class="inp"
                  style="margin-top: 0; margin-left: 0.5rem" type="text" placeholder="Сумма" maxlength="13"
                  v-model="createEventDetails.non_refundable_prepayment"
                  @input="formatInputGlobal($event, comp)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Статус -->

    <div class="container_divider">
      <div class="divider"></div>
      <h3 class="title2">Статус</h3>
      <div class="divider"></div>
    </div>

    <div class="parent2" style="background-color: #111827; padding-bottom: 10rem">
      <div class="container3">
        <div>
          <div>
            <SelectButton
                style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                v-model="createEventDetails.status_event"
                :options="optionsStatus"
                :style="styleBorder.status_event"
                :initialSelected="placeholder_status"
                @update="switchParamsGlobal($event, $event.target.id, comp);
                changeBorderStyleGlobal(comp,$event.target.id)"
                @click="changeStatusGlobal(comp)"
            />
          </div>
        </div>

        <div>
          <my-button type="submit" style="margin-top: 3rem" >СОХРАНИТЬ</my-button>
        </div>
      </div>
    </div>
  </form>

  <transition name="child2" :duration="{ enter: 300, leave: 300 }">
    <ModalWindow :open="this.showModalWindow" @close="this.showModalWindow = !this.showModalWindow">
      <template v-slot:modal-text>
        <h3 class="dialog-title">{{ textModal }}</h3>
      </template>
    </ModalWindow>
  </transition>
</template>

<script>
import MyButton from "@/views/UI/MyButton.vue";
import SelectButton from "@/views/UI/SelectButton.vue";
import { vMaska } from "maska";
import {PlusIcon, XMarkIcon, CheckIcon} from "@heroicons/vue/20/solid/index.js";
import {CREATE_EVENT} from "@/mutations.js";
import ModalWindow from "@/views/UI/ModalWindow.vue";
import Data from "@/views/UI/(Empty)Data.vue";
import { CURRENT_USER } from "@/queries";
import {
  addExpenseGlobal,
  addScheduleGlobal,
  addSelectedContactGlobal,
  calculatedDurationTimeGlobal,
  calculatedRemainderGlobal,
  calculateExpensesSumGlobal,
  capitalizeFirstAdditionalGlobal,
  capitalizeFirstLetterGlobal,
  changeBorderStyleGlobal,
  changeCheckPaymentGlobal,
  changeNonRefundablePrepaymentGlobal,
  changeStatusGlobal,
  createCityOptionsGlobal,
  createRegionOptionsGlobal,
  formatContactAddGlobal,
  formatContactClearGlobal,
  formatExpenseInputGlobal,
  formatInputGlobal,
  formatNotesGlobal,
  switchParamsGlobal,
  userEventGlobal,
  validateInputGlobal
} from "@/stores/methodGlobal.js";

export default {
  name: "CreateEventView",
  components: {ModalWindow, SelectButton, MyButton, PlusIcon, XMarkIcon, CheckIcon, Data},
  directives: { maska: vMaska },
  data() {
    return {
      userID: null,
      createEventDetails: {
        short_name: '',
        date_event: '',
        created_at: '',
        start_time: '',
        end_time: '',
        duration_time: '',
        client: '',
        address: '',
        fio_client: '',
        num_phone: '',
        contact_tg: '',
        contact_vk: '',
        num_phone_add: '',
        notes: '',
        schedules: [{ timeSchedule: '', noteSchedule: '' }],
        expenses: [{ sumExpense: '', noteExpense: '' }],
        payment: '',
        prepayment: '',
        at_the_event: '',
        remainder: '',
        non_refundable_prepayment: '',
        expenses_sum: '',
        source_event: '',
        status_event: '',
        format_event: '',
        type_event: '',
        region_event: '',
        city_event: '',
        is_payment_checked: false,
        is_prepayment_checked: false,
        is_at_the_event_checked: false,
        is_remainder_checked: false,
        add_non_refundable_prepayment: false,
      },
      comp: 'createEventDetails',
      styleBorder: Data.data().styleBorder,
      placeholder_format: Data.data().placeholder_format_base,
      placeholder_status: Data.data().placeholder_status_base,
      placeholder_source: Data.data().placeholder_source_base,
      validationInputBid: false,
      validationInputEvent: false,
      showModalWindow: false,
      getUserPlace: true,
      showConcat: false,
      showConcatTg: false,
      showConcatVk: false,
      showConcatNum: false,
      isValidBid: false,
      isValidEvent: false,
      isCanselEvent: false,
      optionsFormat: Data.data().optionsFormat,
      optionsContact: Data.data().optionsContact,
      optionsSource: Data.data().optionsSource,
      optionsStatus: Data.data().optionsStatus,
      blocksContact: [],
      bgColor1: Data.data().bgColor,
      bgColor2: Data.data().bgColor,
      bgColor3: Data.data().bgColor,
      bgColor4: Data.data().bgColor,
      placeholder_region: Data.data().placeholder_region_base,
      placeholder_city: Data.data().placeholder_city_base,
      placeholder_city_base: Data.data().placeholder_city_base,
      saveAsBid: Data.data().saveAsBid,
      saveAsEvent: Data.data().saveAsEvent,
      textModal: '',
      current_user: {}
    }
  },
  props: {
    isAuthenticated: Boolean,
  },
  async created() {
    if (!this.isAuthenticated) {
      return this.$router.push({ name: 'SignIn' });
    }

    this.createEventDetails.created_at = new Date().format()

    this.userID = JSON.parse(localStorage.getItem("user")).id;

    const user = await this.$apollo.query({
      query: CURRENT_USER,
      variables: {
        id: this.userID,
      },
    });

    this.current_user = user.data.user;
  },
  methods: {
    formatContactAddGlobal,
    formatContactClearGlobal,
    validateInputGlobal,
    userEventGlobal,
    async mutation(){
      await this.$apollo.mutate({
        mutation: CREATE_EVENT,
        variables: {
          id: this.current_user.id,
          short_name: this.createEventDetails.short_name,
          date_event: this.createEventDetails.date_event,
          created_at: this.createEventDetails.created_at,
          start_time: this.createEventDetails.start_time,
          end_time: this.createEventDetails.end_time,
          duration_time: this.createEventDetails.duration_time,
          client: this.createEventDetails.client,
          address: this.createEventDetails.address,
          fio_client: this.createEventDetails.fio_client,
          num_phone: this.createEventDetails.num_phone,
          contact_tg: this.createEventDetails.contact_tg,
          contact_vk: this.createEventDetails.contact_vk,
          num_phone_add: this.createEventDetails.num_phone_add,
          notes: this.createEventDetails.notes,
          payment: this.createEventDetails.payment,
          prepayment: this.createEventDetails.prepayment,
          at_the_event: this.createEventDetails.at_the_event,
          remainder: this.createEventDetails.remainder,
          non_refundable_prepayment: this.createEventDetails.non_refundable_prepayment,
          expenses_sum: this.createEventDetails.expenses_sum,
          source_event: JSON.stringify(this.createEventDetails.source_event),
          status_event: JSON.stringify(this.createEventDetails.status_event),
          format_event: JSON.stringify(this.createEventDetails.format_event),
          type_event: JSON.stringify(this.createEventDetails.type_event),

          is_payment_checked: this.createEventDetails.is_payment_checked,
          is_prepayment_checked: this.createEventDetails.is_prepayment_checked,
          is_at_the_event_checked: this.createEventDetails.is_at_the_event_checked,
          is_remainder_checked: this.createEventDetails.is_remainder_checked,
          add_non_refundable_prepayment: this.createEventDetails.add_non_refundable_prepayment,
          schedules: JSON.stringify(this.createEventDetails.schedules),
          expenses: JSON.stringify(this.createEventDetails.expenses),
          region_event: this.getUserPlace ? JSON.stringify(this.current_user.profile_region) : JSON.stringify(this.createEventDetails.region_event),
          city_event: this.getUserPlace ? JSON.stringify(this.current_user.profile_city) : JSON.stringify(this.createEventDetails.city_event),
        },
      })
    },
    changeNonRefundablePrepaymentGlobal,
    addScheduleGlobal,
    addExpenseGlobal,
    switchParamsGlobal,
    addSelectedContactGlobal,
    formatInputGlobal,
    formatExpenseInputGlobal,
    capitalizeFirstLetterGlobal,
    capitalizeFirstAdditionalGlobal,
    changeBorderStyleGlobal,
    formatNotesGlobal,
    changeCheckPaymentGlobal,
    changeStatusGlobal,
    calculatedRemainderGlobal,
  },
  computed: {
    calculatedDurationTime() {
      return calculatedDurationTimeGlobal.call(this, this.comp);
    },
    calculateExpensesSum() {
      return calculateExpensesSumGlobal.call(this, this.comp);
    },
    regions() {
      return Data.data().regions;
    },
    regionOptions() {
      return createRegionOptionsGlobal.call(this);
    },
    cityOptions() {
      return createCityOptionsGlobal.call(this,this.comp);
    },
  },
  mounted() {
    if (this.current_user.non_refundable_prepayment){
      this.createEventDetails.non_refundable_prepayment = this.current_user.non_refundable_prepayment;
    }
  }
};
</script>
