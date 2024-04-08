<template>
  <form action="POST" @submit.prevent="userEventGlobal(comp)">
    <div class="parent2" style="background-color: var(--event-color-bg-total);">
      <transition-group name="fader">
        <h2 class="text-block-edit" v-if="eventActive.type_event.value === 'Event'" style="margin-top: 2rem">СОБЫТИЕ</h2>
        <h2 class="text-block-edit" v-if="eventActive.type_event.value === 'Bid'" style="margin-top: 2rem">ЗАЯВКА</h2>
      </transition-group>
      <div class="block">
        <div v-if="!this.showEdit" class="icon-edit"></div>
        <h2 class="title1" style="margin-top: 3rem; margin-bottom: 1rem">{{ eventActive.short_name }}</h2>
        <PencilSquareIcon v-if="!this.showEdit" @click="toggleOptionsDropdown" class="icon-edit"></PencilSquareIcon>
      </div>
      <h3 class="footer-text" style="margin: 0">
        {{ eventActive.type_event.label === 'Событие'? 'Создано ' : 'Создана ' }} {{ formatDateGlobal(eventActive.created_at) }} {{ new Date(eventActive.created_at).getFullYear() }}
      </h3>
      <transition>
        <div class="edit-modal" v-show="isOptionsDropdownVisible" @click="this.isOptionsDropdownVisible = false">
          <div class="dropdown-edit">
            <div>
              <div class="option-edit" @click="clickButton('editButton')">Редактировать</div>
              <div class="option-edit" @click="clickButton('cancelButton')">Удалить</div>
              <div v-if="eventActive.type_event.value === 'Bid'" class="option-edit" @click="clickButton('makeEventButton')">
                Превратить в событие
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="container3">
        <div>
          <!-- Формат события -->
          <div style="margin-top: 1rem;">
            <label class="text-block" style="margin-bottom: 0.5rem;">Формат события</label>
            <input
                v-if="!this.showEdit"
                name="format_event" class="inp"
                type="text" autocomplete=""
                disabled
                v-model="eventActive.format_event.label"  placeholder="Выберете формат"
            />
            <SelectButton
                v-if="this.showEdit"
                id="format_event"
                style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                v-model="eventActive.format_event"
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
                  :disabled="!this.showEdit"
                  :style="styleBorder.short_name"
                  v-model="eventActive.short_name"
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
                  autocomplete="date_event" placeholder="Выберите дату" type="date"
                  :disabled="!this.showEdit"
                  :style="styleBorder.date_event"
                  v-model="eventActive.date_event"
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
                    style=" margin-right: 0.5rem;" type="time" autocomplete="start_time" placeholder="Пример: 8:30"
                    :disabled="!this.showEdit"
                    :style="styleBorder.start_time"
                    v-model="eventActive.start_time"
                    @change="changeBorderStyleGlobal(comp,$event.target.id)"
                />
                <input
                    id="end_time" class="inp"
                    type="time" autocomplete="end_time" placeholder="Пример: 8:30"
                    :disabled="!this.showEdit"
                    :style="styleBorder.end_time"
                    v-model="eventActive.end_time"
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
                  id="client"  class="inp"
                  type="text" autocomplete="client"  placeholder="Напишите кратко"
                  :disabled="!this.showEdit"
                  :style="styleBorder.client"
                  v-model="eventActive.client"
                  @input="capitalizeFirstLetterGlobal(comp,$event.target.id)"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>

          <!-- Выбор локации -->
          <!-- Место проведения события -->
          <div style="margin-top: 1rem;">
            <label class="text-block" style="margin-bottom: 0.5rem;">Регион</label>
            <SelectButton
                v-if="this.showEdit"
                id="region_event"
                style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                v-model="eventActive.region_event"
                :options="regionOptions"
                :style="styleBorder.region_event"
                :initialSelected="placeholder_region"
                @update="switchParamsGlobal($event, $event.target.id, comp);
                changeBorderStyleGlobal(comp,$event.target.id)"
            />
            <input
                v-if="!this.showEdit"
                name="region_event" class="inp"
                type="text" autocomplete="" disabled
                v-model="eventActive.region_event.label"
            />
          </div>
          <div style="margin-top: 1rem;" >
            <label class="text-block" style="margin-bottom: 0.5rem;">Город</label>
            <SelectButton
                v-if="this.showEdit"
                id="city_event"
                style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                v-model="eventActive.city_event"
                :options="cityOptions"
                :style="styleBorder.city_event"
                :initialSelected="placeholder_city"
                @update="switchParamsGlobal($event, $event.target.id, comp);
                changeBorderStyleGlobal(comp,$event.target.id)"
            />
            <input
                v-if="!this.showEdit"
                name="city_event" class="inp"
                type="text" autocomplete="" disabled
                v-model="eventActive.city_event.label"
            />
          </div>
          <div style="margin-top: 1rem;">
            <label class="text-block">Место проведения события</label>
            <div>
              <input
                  id="address"  class="inp"
                  type="text" autocomplete="address" placeholder="Адрес/Место"
                  :disabled="!this.showEdit"
                  :style="styleBorder.address"
                  v-model="eventActive.address"
                  @input="capitalizeFirstLetterGlobal(comp,$event.target.id)"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
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

    <div class="parent2" style="background-color: var(--event-color-bg-total); margin-top: -1.5rem">
      <div class="container3">
        <div>
          <!-- Контактное лицо -->
          <div style="margin-top: 1rem;">
            <label class="text-block">ФИО</label>
            <div>
              <input
                  id="fio_client" class="inp"
                  style="text-transform:capitalize;" type="text" autocomplete="fio_client" placeholder="ФИО"
                  :disabled="!this.showEdit"
                  :style="styleBorder.fio_client"
                  v-model="eventActive.fio_client"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>

          <!-- Номер телефона -->
          <div style="margin-top: 1rem;">
            <label class="text-block">Номер телефона</label>
            <div id="num_phone" @click="callPhoneNumber($event.target.id)">
              <input
                  id="num_phone" class="inp" :class="{ 'disabled': !showEdit }"
                  type="tel" autocomplete="num_phone" placeholder="+7 (___) ___-__-__"
                  :style="styleBorder.num_phone"
                  v-model="eventActive.num_phone"
                  v-maska data-maska="+7 (###) ###-##-##"
                  @change="changeBorderStyleGlobal(comp,$event.target.id)"
              />
            </div>
          </div>

          <div v-if="!this.showEdit" style="margin-top: 1rem;">
            <label class="text-block">Дополнительные контакты</label>
            <div v-for="(option, index) in optionsContact" :key="index">
              <div v-if="eventActive[option.parametr]" class="block" :id="[option.parametr]" @click="callPhoneNumber($event.target.id)">
                <p disabled class="button-contact">{{ option.type }}</p>
                <input v-model="eventActive[option.parametr]" class="inp" :class="{ 'disabled': !showEdit }" :placeholder="option.placeholder"/>
              </div>
            </div>
          </div>
          <!-- Дополнительные контакты -->
          <div v-if="this.showEdit">
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
                  <XMarkIcon v-if="showConcat" @click="this.showConcat = false" class="button-circle" type="button"></XMarkIcon>
                  <div v-if="showConcat" v-for="(option, index) in optionsContact" :key="index">
                    <button
                        v-if="option.selected"
                        class="button-circle"
                        style="padding: 0.7rem 0.7rem; background-color: var(--event-color-btn);" type="button"
                        @click="addSelectedContactGlobal(index, option)"
                    >
                      <svg width="30" height="30" x="0" y="0" :viewBox="option.viewBox">
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
              <TransitionGroup>
                <div v-if="showConcatTg" class="block">
                  <p disabled class="button-contact">Telegram</p>
                  <input
                      id="contact_tg" class="inp"
                      placeholder="Username"
                      v-model="eventActive.contact_tg"
                      @blur="formatContactClearGlobal(comp,$event.target.id)"
                      @input="formatContactAddGlobal(comp,$event.target.id)"
                  />
                </div>

                <div v-if="showConcatVk" class="block">
                  <p disabled class="button-contact">VK</p>
                  <input
                      v-model="eventActive.contact_vk"
                      id="contact_vk" class="inp"
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
                      v-maska data-maska="+7 (###) ###-##-##"
                      v-model="eventActive.num_phone_add"
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

    <div class="parent2" style="background-color: var(--event-color-bg-total);">
      <div class="container3">
        <div>
          <div style="margin-top: 1rem;">
            <textarea
                id="notes" class="inp"
                autocomplete="notes" style="height: 200px; resize: none;" placeholder="Ваши заметки"
                :disabled="!this.showEdit"
                v-model="eventActive.notes"
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

    <div class="parent2" style="background-color: var(--event-color-bg-total);">
      <div class="container3">
        <div>
          <TransitionGroup>
            <div class="block" v-for="(schedule, index) in this.eventActive.schedules" :key="index">
              <input type="time" :disabled="!this.showEdit" style="text-align: center; margin-right: 0.5rem; width: 30%;" class="inp" v-model="schedule.timeSchedule"/>
              <input
                  id="noteSchedule" class="inp"
                  type="text" placeholder="Примечание"
                  :disabled="!this.showEdit"
                  v-model="schedule.noteSchedule"
                  @input="capitalizeFirstAdditionalGlobal(schedule, $event.target.id)"
              />
            </div>

            <div class="parent-circle" v-if="this.showEdit">
              <PlusIcon
                  v-show="this.eventActive.schedules.length < 15"
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

    <div class="parent2" style="background-color: var(--event-color-bg-total);">
      <div class="container3">
        <div>
          <div>
            <SelectButton
                v-if="this.showEdit"
                id="source_event"
                style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                v-model="eventActive.source_event"
                :options="optionsSource"
                :style="styleBorder.source_event"
                :initialSelected="placeholder_source"
                @update="switchParamsGlobal($event, $event.target.id, comp);
                changeBorderStyleGlobal(comp,$event.target.id)"
            />
            <input
                v-if="!this.showEdit"
                name="source_event" class="inp"
                type="text" autocomplete="" disabled
                v-model="eventActive.source_event.label"
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

    <div class="parent2" style="background-color: var(--event-color-bg-total);">
      <div class="container3">
        <div>
          <TransitionGroup>
            <div class="block" v-for="(expense, index) in this.eventActive.expenses" :key="index">
              <input
                  class="inp"
                  style="text-align: center; margin-right: 0.5rem; width: 30%;" type="text" placeholder="Сумма" maxlength="7"
                  :disabled="!this.showEdit"
                  v-model="expense.sumExpense"
                  @input="formatExpenseInputGlobal($event, index, comp)"
              />
              <input
                  id="noteExpense" class="inp"
                  type="text" placeholder="Примечание"
                  :disabled="!this.showEdit"
                  v-model="expense.noteExpense"
                  @input="capitalizeFirstAdditionalGlobal(expense, $event.target.id)" />
            </div>
            <div class="parent-circle" v-if="this.showEdit">
              <PlusIcon
                  v-show="this.eventActive.expenses.length < 15"
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

    <div class="parent2" style="background-color: var(--event-color-bg-total);">
      <div class="container3">
        <div>
          <div>
            <label class="text-block">Оплата</label>
            <div class="block-pay">
              <CheckIcon class="check-box-dis" :style="this.bgColor1"></CheckIcon>
              <input
                  id="payment" class="inp"
                  type="text" style="margin-top: 0; margin-left: 0.5rem" placeholder="Сумма" maxlength="13"
                  :disabled="!this.showEdit"
                  :style="styleBorder.payment"
                  v-model="eventActive.payment"
                  @input="formatInputGlobal($event, comp)"
                  @change="calculatedRemainderGlobal(comp);
                  changeCheckPaymentGlobal(comp);
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
                  :disabled="!this.showEdit"
                  :style="styleBorder.prepayment"
                  v-model="eventActive.prepayment"
                  @input="formatInputGlobal($event, comp)"
                  @change="calculatedRemainderGlobal(comp);
                  changeCheckPaymentGlobal(comp);
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
                  :disabled="!this.showEdit"
                  v-model="eventActive.at_the_event"
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
                  style="margin-top: 0; margin-left: 0.5rem; width: 100%; margin-right: 0;"  type="text" maxlength="13"
                  disabled
                  v-model="eventActive.remainder"
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

    <div class="parent2" style="background-color: var(--event-color-bg-total); padding-bottom: 10rem">
      <div class="container3">
        <div>
          <div>
            <input
                v-if="!this.showEdit"
                id="status_event" class="inp"
                type="text" autocomplete=""
                disabled
                v-model="eventActive.status_event.label"
            />
            <SelectButton
                v-if="this.showEdit"
                name="status_event"
                style="border: 1px solid var(--event-color-border); border-radius: 0.375rem;"
                v-model="eventActive.status_event"
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
          <my-button v-show="this.showEdit" type="submit" style="margin-top: 3rem" >СОХРАНИТЬ</my-button>
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
  <transition name="child2" :duration="{ enter: 300, leave: 300 }">
    <ModalWindowQuestion :open="this.showModalWindowQuestion" @close="closeModalQuestion" @sayYes="answerClick">
      <template v-slot:modal-text-q>
        <h3 class="dialog-title-q">{{ textModal }}</h3>
      </template>
    </ModalWindowQuestion>
  </transition>
</template>

<script>
import {CURRENT_USER, DETAILS_BY_EVENT} from "@/queries";
import {CheckIcon, PlusIcon, XMarkIcon, PencilSquareIcon} from "@heroicons/vue/20/solid/index.js";
import MyButton from "@/views/UI/MyButton.vue";
import ModalWindow from "@/views/UI/ModalWindow.vue";
import SelectButton from "@/views/UI/SelectButton.vue";
import {UPDATE_EVENT} from "@/mutations.js";
import Data from "@/views/UI/(Empty)Data.vue";
import {vMaska} from "maska";
import ModalWindowQuestion from "@/views/UI/ModalWindowQuestion .vue";
import {
  addExpenseGlobal,
  addScheduleGlobal,
  addSelectedContactGlobal,
  arraysAdjustmentsGlobal,
  calculatedDurationTimeGlobal,
  calculatedRemainderGlobal,
  calculateExpensesSumGlobal,
  capitalizeFirstAdditionalGlobal,
  capitalizeFirstLetterGlobal,
  changeBorderStyleGlobal,
  changeCheckPaymentGlobal,
  changeStatusGlobal,
  createCityOptionsGlobal,
  createRegionOptionsGlobal,
  formatContactAddGlobal,
  formatContactClearGlobal, formatDateGlobal,
  formatExpenseInputGlobal,
  formatInputGlobal,
  formatNotesGlobal,
  switchParamsGlobal,
  userEventGlobal
} from "@/stores/methodGlobal.js";
import BaseData from "@/views/UI/BaseData.vue";

export default {
  name: "AboutEventView",
  components: { SelectButton, CheckIcon, ModalWindow, ModalWindowQuestion, MyButton, PlusIcon, XMarkIcon, PencilSquareIcon, Data},
  directives: { maska: vMaska },
  data() {
    return {
      userID: null,
      showEdit: false,
      eventActive: {
        id_event: '',
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
      comp: 'eventActive',
      isOptionsDropdownVisible: false,
      eventByDB: '',
      allEvents: [],
      styleBorder: Data.data().styleBorder,
      placeholder_format_base: Data.data().placeholder_format_base,
      placeholder_status_base: Data.data().placeholder_status_base,
      placeholder_source_base: Data.data().placeholder_source_base,
      placeholder_format: {},
      placeholder_status: {},
      placeholder_source: {},
      foundEvent: {},
      validationInputBid: false,
      validationInputEvent: false,
      isValidBid: false,
      isValidEvent: false,
      showModalWindow: false,
      showModalWindowQuestion: false,
      editButton: false,
      cancelButton: false,
      isCanselEvent: false,
      makeEventButton: false,
      getUserPlace: false,
      showConcat: false,
      showConcatTg: false,
      showConcatVk: false,
      showConcatNum: false,
      optionsFormat: Data.data().optionsFormat,
      optionsContact: Data.data().optionsContact,
      optionsSource: Data.data().optionsSource,
      optionsStatus: Data.data().optionsStatus,
      blocksContact: [],
      bgColor1: Data.data().bgColor,
      bgColor2: Data.data().bgColor,
      bgColor3: Data.data().bgColor,
      bgColor4: Data.data().bgColor,
      placeholder_region: {},
      placeholder_city: {},
      placeholder_region_base: Data.data().placeholder_region_base,
      placeholder_city_base: Data.data().placeholder_city_base,
      saveAsBid: Data.data().saveAsBid,
      saveAsEvent: Data.data().saveAsEvent,
      textModal: '',
      current_user: {}
    };
  },
  methods: {
    formatDateGlobal,
    toggleOptionsDropdown() {
      this.isOptionsDropdownVisible = true;
    },
    cancelEvent() {
      this.eventActive.status_event = { value: 'Canceled', label: 'Отменено'};
      this.eventActive.type_event = { value: 'Bid', label: 'Заявка'};
      this.eventActive.payment = this.eventActive.add_non_refundable_prepayment ? this.eventActive.non_refundable_prepayment : '';
      this.eventActive.duration_time = this.eventActive.add_non_refundable_prepayment ? '1' : '';
      this.eventActive = { ...this.eventActive, remainder: '', prepayment: '', at_the_event: '' }
      this.showEdit = true;
      this.isCanselEvent = true
      this.userEventGlobal(this.comp);
      this.$router.push({ name: 'LogEvent' });
    },
    convertToEvent() {
      this.eventActive.is_prepayment_checked = true;
      this.eventActive.status_event = { value: 'In progress', label: 'В работе' };
      this.changeStatusGlobal(this.comp);
    },
    arraysAdjustmentsGlobal,
    findEventById() {
      if (this.eventByDB){
        this.eventActive = { ...this.eventByDB };
        this.placeholder_format = this.eventByDB.format_event;
        this.placeholder_status = this.eventByDB.status_event;
        this.placeholder_source = this.eventByDB.source_event;
        this.placeholder_region = this.eventByDB.region_event;
        this.placeholder_city = this.eventByDB.city_event;
      } else {
        this.eventActive = {};
        console.error(`Событие с таким ID не найдено.`);
      }
    },
    userEventGlobal,
    async mutation(){
      await this.$apollo.mutate({
        mutation: UPDATE_EVENT,
        variables: {
          id: this.current_user.id,
          id_event: this.eventActive.id_event,
          short_name: this.eventActive.short_name,
          date_event: this.eventActive.date_event,
          start_time: this.eventActive.start_time,
          end_time: this.eventActive.end_time,
          duration_time: this.eventActive.duration_time,
          client: this.eventActive.client,
          address: this.eventActive.address,
          fio_client: this.eventActive.fio_client,
          num_phone: this.eventActive.num_phone,
          contact_tg: this.eventActive.contact_tg,
          contact_vk: this.eventActive.contact_vk,
          num_phone_add: this.eventActive.num_phone_add,
          notes: this.eventActive.notes,
          payment: this.eventActive.payment,
          prepayment: this.eventActive.prepayment,
          at_the_event: this.eventActive.at_the_event,
          remainder: this.eventActive.remainder,
          expenses_sum: this.eventActive.expenses_sum,
          source_event: JSON.stringify(this.eventActive.source_event),
          status_event: JSON.stringify(this.eventActive.status_event),
          format_event: JSON.stringify(this.eventActive.format_event),
          type_event: JSON.stringify(this.eventActive.type_event),

          is_payment_checked: this.eventActive.is_payment_checked,
          is_prepayment_checked: this.eventActive.is_prepayment_checked,
          is_at_the_event_checked: this.eventActive.is_at_the_event_checked,
          is_remainder_checked: this.eventActive.is_remainder_checked,
          add_non_refundable_prepayment: this.eventActive.add_non_refundable_prepayment,
          schedules: JSON.stringify(this.eventActive.schedules),
          expenses: JSON.stringify(this.eventActive.expenses),
          region_event: JSON.stringify(this.eventActive.region_event),
          city_event: JSON.stringify(this.eventActive.city_event),
        },
      })
    },
    formatContactAddGlobal,
    formatContactClearGlobal,
    addScheduleGlobal,
    addExpenseGlobal,
    switchParamsGlobal,
    addSelectedContactGlobal,
    addContact() {
      const addContactType = (type) => {
        const showKey = `showConcat${type.key}`;
        this[showKey] = !this[showKey];

        for (let i = 0; i < 3; i++) {
          if (this.optionsContact[i].type === type.value) {
            this.optionsContact[i].selected = false;
          }
        }

        this.blocksContact.push({
          type: type.value,
        });
      };

      const contactTypes = [
        { key: 'Tg', value: 'Telegram', active: 'contact_tg' },
        { key: 'Vk', value: 'VK', active: 'contact_vk' },
        { key: 'Num', value: 'Доп. Тел.', active: 'num_phone_add' }
      ];

      contactTypes.forEach((type) => {
        if (this.eventActive[type.active]) {
          addContactType(type);
        }
      });
    },
    formatInputGlobal,
    formatExpenseInputGlobal,
    capitalizeFirstLetterGlobal,
    capitalizeFirstAdditionalGlobal,
    changeBorderStyleGlobal,
    formatNotesGlobal,
    changeCheckPaymentGlobal,
    changeStatusGlobal,
    clickButton(name){
      this[name] = true
      this.modalQuestion();
    },
    closeModalQuestion(){
      this.showModalWindowQuestion = !this.showModalWindowQuestion;
      this.editButton = false;
      this.cancelButton = false;
      this.makeEventButton = false;
      this.isOptionsDropdownVisible = false;
    },
    modalQuestion() {
      const messages = {
        editButton: 'Перейти в режим редактирования?',
        cancelButton: 'Подтвердите удаление события',
        makeEventButton: 'Подтвердите перевод в событие'
      };

      this.textModal = messages[Object.keys(messages).find(key => this[key])];
      this.showModalWindowQuestion = true;
    },
    answerClick() {
      const actions = {
        // используем динамические ключи
        [this.editButton]: () => { this.showEdit = !this.showEdit },
        [this.cancelButton]: () => this.cancelEvent(),
        [this.makeEventButton]: () => this.convertToEvent(),
      };

      const action = actions[true];
      if (action) action();
    },
    calculatedRemainderGlobal,
    callPhoneNumber(cont) {
      const actions = {
        'num_phone': () => {window.location.href = 'tel:' + this.eventActive.num_phone},
        'contact_tg': () => {window.location.href = `https://t.me/${this.eventActive.contact_tg.substring(1)}`},
        'contact_vk': () => {window.location.href = `https://vk.com/${this.eventActive.contact_vk.substring(1)}`},
        'num_phone_add': () => {window.location.href = 'tel:' + this.eventActive.num_phone_add},
      };

      const action = actions[cont];
      if (action && !this.showEdit) action();
    }
  },
  props: {
    isAuthenticated: Boolean,
  },
  async created() {
    if (!this.isAuthenticated) {
      return this.$router.push({ name: 'SignIn' });
    }

    const details = await this.$apollo.query({
      query: DETAILS_BY_EVENT,
      variables: {
        id_event: this.$route.params.id_event,
      },
    });
    this.eventByDB = details.data.event_details;

    this.userID = JSON.parse(localStorage.getItem("user")).id;

    const user = await this.$apollo.query({
      query: CURRENT_USER,
      variables: {
        id: this.userID,
      },
    });
    this.current_user = user.data.user;
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
    this.findEventById();
    this.addContact();
    this.changeStatusGlobal(this.comp);
  }
};
</script>


